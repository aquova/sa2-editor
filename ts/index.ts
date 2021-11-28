import { populate_global, replace_global } from "./global.js"
import { populate_levels } from "./level.js"
import { num_to_bytes } from "./utils.js"

let filename = null
let sav = null

const input_btn = document.getElementById("fileinput") as HTMLButtonElement
input_btn.addEventListener("change", load_file, false)

let save_btn = document.getElementById("savebutton") as HTMLButtonElement
save_btn.addEventListener("click", save_file, false)

const CHECKSUM_ADDR = 0x2840
const VALIDATION_START = 0x2844

function load_file(evt) {
    const target = evt.target as HTMLInputElement
    const file = target.files[0]
    if (!file) {
        alert("Unable to open file")
        return
    }

    let fr = new FileReader()
    fr.onload = function(e) {
        filename = file.name
        let buffer = fr.result as ArrayBuffer
        sav = new Uint8Array(buffer)
        save_btn.disabled = false
        calc_checksum(sav)
        populate(sav)
    }
    fr.readAsArrayBuffer(file)
}

function save_file(evt) {
    replace()
    let a = document.createElement("a")
    a.download = filename + "_edited"
    let blob = new Blob([sav], {
        type: 'text/plain'
    })
    a.href = URL.createObjectURL(blob)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}

function populate(save: Uint8Array) {
    populate_global(save)
    populate_levels(save)
}

function replace() {
    replace_global(sav)

    // Update the checksum
    const checksum = calc_checksum(sav)
    for (let i = 0; i < checksum.length; i++) {
        sav[CHECKSUM_ADDR + i] = checksum[i]
    }
}

function calc_checksum(save: Uint8Array): number[] {
    let checksum = 0
    for (let idx = VALIDATION_START; idx < save.length; idx++) {
        checksum += save[idx]
    }

    return num_to_bytes(checksum, 4)
}
