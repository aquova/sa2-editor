import { le_to_be } from "./utils.js"

const TOTAL_RINGS_ADDR = 0x2870
const EMBLEM_ADDR = 0x284E

export function populate_global(save_data: Uint8Array) {
    let emblem_elem = document.getElementById("emblem_count") as HTMLParagraphElement
    const num_emblems = save_data[EMBLEM_ADDR]
    emblem_elem.innerHTML = "Number of Emblems: " + num_emblems.toString()

    let ring_elem = document.getElementById("ring_count") as HTMLParagraphElement
    const num_rings = le_to_be(save_data[TOTAL_RINGS_ADDR], save_data[TOTAL_RINGS_ADDR + 1])
    ring_elem.innerHTML = "Total Rings: " + num_rings.toString()
}
