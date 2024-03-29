import { format_time, bytes_to_num } from "./utils.js"

// A brief description on how level data is stored in the save file:
// Each level is given a block of data, which has overall data - rank and # of attempts - then is broken up into its 5 missions.
// Each mission has stats for the top three runs - best time, score, and rings.
// The relative offsets of all of these sub-sections of data are the same, so that is what is stored here for simplicity.
// Note that something like a mission's third best time then has:
// An absolute offset to the start of the level, a relative offset to that mission, a relative offset to that run, then a relative offset to that value.
const RANK_OFFSET = 0
const ATTEMPT_OFFSET = 6

const MISSION_OFFSET = 16
const RUN_LEN = 12
const MISSION_LEN = 3 * RUN_LEN

const RINGS_OFFSET = 0
const SCORE_OFFSET = 4
const TIME_OFFSET = 8

const NUM_MISSIONS = 5

// HTML id, save file offset, is racing level
type LevelEntry = [string, number, boolean]

// Note the hyphens in the level names
const SONIC_OFFSETS: LevelEntry[] = [
    ["City-Escape", 0x326C, false],
    ["Metal-Harbor", 0x3020, false],
    ["Green-Forest", 0x2AC4, false],
    ["Pyramid-Cave", 0x3DE8, false],
    ["Crazy-Gadget", 0x3950, false],
    ["Final-Rush", 0x3F70, false]
]

const TAILS_OFFSETS: LevelEntry[] = [
    ["Prison-Lane", 0x2F5C, false],
    ["Mission-Street", 0x357C, false],
    ["Route-101", 0x5668, true],
    ["Hidden-Base", 0x3A14, false],
    ["Eternal-Engine", 0x3AD8, false]
]

const KNUX_OFFSETS: LevelEntry[] = [
    ["Wild-Canyon", 0x34B8, false],
    ["Pumpkin-Hill", 0x2C4C, false],
    ["Aquatic-Mine", 0x2DD4, false],
    ["Death-Chamber", 0x3B9C, false],
    ["Meteor-Herd", 0x40F8, false]
]

const EGGMAN_OFFSETS: LevelEntry[] = [
    ["Iron-Gate", 0x30E4, false],
    ["Sand-Ocean", 0x388C, false],
    ["Lost-Colony", 0x3D24, false],
    ["Weapons-Bed", 0x31A8, false],
    ["Cosmic-Wall", 0x4964, false]
]

const ROUGE_OFFSETS: LevelEntry[] = [
    ["Dry-Lagoon", 0x3640, false],
    ["Egg-Quarters", 0x3C60, false],
    ["Security-Hall", 0x2E98, false],
    ["Route-280", 0x572C, true],
    ["Mad-Space", 0x4A28, false]
]

const SHADOW_OFFSETS: LevelEntry[] = [
    ["Radical-Highway", 0x3330, false],
    ["White-Jungle", 0x2B88, false],
    ["Sky-Rail", 0x2D10, false],
    ["Final-Chase", 0x4718, false]
]

export function populate_levels(save_data: Uint8Array) {
    populate_character(save_data, SONIC_OFFSETS)
    populate_character(save_data, TAILS_OFFSETS)
    populate_character(save_data, KNUX_OFFSETS)
    populate_character(save_data, SHADOW_OFFSETS)
    populate_character(save_data, EGGMAN_OFFSETS)
    populate_character(save_data, ROUGE_OFFSETS)
}

function populate_character(save_data: Uint8Array, char_offsets: LevelEntry[]) {
    for (let level of char_offsets) {
        for (let i = 0; i < NUM_MISSIONS; i++) {
            let row = document.getElementById(level[0] + "-" + (i + 1).toString()) as HTMLTableElement
            populate_mission(save_data, row, level[1], i, level[2])
        }
    }
}

function populate_mission(save_data: Uint8Array, mission_row: HTMLTableElement, addr: number, mission_num: number, is_racing: boolean) {
    populate_rank(save_data, mission_row, addr, mission_num)
    populate_attempts(save_data, mission_row, addr, mission_num)
    // mission_num is 0-indexed
    const racing_mission = is_racing || (mission_num == 1 || mission_num == 2)
    populate_points(save_data, mission_row, addr, mission_num, racing_mission)
    populate_times(save_data, mission_row, addr, mission_num)
    populate_rings(save_data, mission_row, addr, mission_num)
}

function populate_rank(save_data: Uint8Array, mission_row: HTMLTableElement, level_addr: number, mission_num: number) {
    let rank_elem = mission_row.getElementsByClassName("ranks")[0] as HTMLTableCellElement
    const raw_rank = save_data[level_addr + RANK_OFFSET + mission_num]
    const rank = format_rank(raw_rank)
    rank_elem.innerHTML = rank
}

function populate_attempts(save_data: Uint8Array, mission_row: HTMLTableElement, level_addr: number, mission_num: number) {
    let attempt_elem = mission_row.getElementsByClassName("attempts")[0] as HTMLTableCellElement
    const addr = level_addr + ATTEMPT_OFFSET + 2 * mission_num
    const attempts = bytes_to_num(save_data.slice(addr, addr + 2))
    attempt_elem.innerHTML = attempts.toString()
}

function populate_points(save_data: Uint8Array, mission_row: HTMLTableElement, level_addr: number, mission_num: number, is_racing: boolean) {
    let point_elems = mission_row.getElementsByClassName("points") as HTMLCollectionOf<HTMLTableCellElement>
    for (let i = 0; i < point_elems.length; i++) {
        const addr = level_addr + MISSION_OFFSET + mission_num * MISSION_LEN + i * RUN_LEN + SCORE_OFFSET
        let pts = ""
        if (is_racing) {
            pts = "N/A"
        } else {
            pts = bytes_to_num(save_data.slice(addr, addr + 2)).toString()
        }
        point_elems[i].innerHTML = pts
    }
}

function populate_times(save_data: Uint8Array, mission_row: HTMLTableElement, level_addr: number, mission_num: number) {
    let time_elems = mission_row.getElementsByClassName("times") as HTMLCollectionOf<HTMLTableCellElement>
    for (let i = 0; i < time_elems.length; i++) {
        const addr = level_addr + MISSION_OFFSET + mission_num * MISSION_LEN + i * RUN_LEN + TIME_OFFSET
        const raw_times = save_data.slice(addr, addr + 3)
        const time = format_time(raw_times)
        time_elems[i].innerHTML = time
    }
}

function populate_rings(save_data: Uint8Array, mission_row: HTMLTableElement, level_addr: number, mission_num: number) {
    let ring_elems = mission_row.getElementsByClassName("rings") as HTMLCollectionOf<HTMLTableCellElement>
    for (let i = 0; i < ring_elems.length; i++) {
        const addr = level_addr + MISSION_OFFSET + mission_num * MISSION_LEN + i * RUN_LEN + RINGS_OFFSET
        const rings = bytes_to_num(save_data.slice(addr, addr + 2))
        ring_elems[i].innerHTML = rings.toString()
    }
}

function format_rank(raw: number): string {
    const RANKS = ["Incomplete", "E", "D", "C", "B", "A"]
    return RANKS[raw]
}
