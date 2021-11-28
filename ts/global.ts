import { bytes_to_num, num_to_bytes } from "./utils.js"

const TOTAL_RINGS_ADDR = 0x2870
const TOTAL_RINGS_BYTES = 4
const EMBLEM_ADDR = 0x284E

export function populate_global(save_data: Uint8Array) {
    let emblem_elem = document.getElementById("emblem_count") as HTMLParagraphElement
    const num_emblems = save_data[EMBLEM_ADDR]
    emblem_elem.innerHTML = "Number of Emblems: " + num_emblems.toString()

    let ring_elem = document.getElementById("ring_count") as HTMLInputElement
    const num_rings = bytes_to_num(save_data.slice(TOTAL_RINGS_ADDR, TOTAL_RINGS_ADDR + TOTAL_RINGS_BYTES))
    ring_elem.value = num_rings.toString()
}

export function replace_global(save_data: Uint8Array) {
    const ring_elem = document.getElementById("ring_count") as HTMLInputElement
    const num_rings = Number(ring_elem.value)
    const ring_bytes = num_to_bytes(num_rings, TOTAL_RINGS_BYTES)
    for (let i = 0; i < ring_bytes.length; i++) {
        save_data[TOTAL_RINGS_ADDR + i] = ring_bytes[i]
    }
}
