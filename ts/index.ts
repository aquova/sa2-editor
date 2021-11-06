import { populate_global } from "./global.js"
import { populate_levels } from "./level.js"

let filename = null

const input_btn = document.getElementById("fileinput") as HTMLButtonElement
input_btn.addEventListener("change", load_file, false)

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
        const sav = new Uint8Array(buffer)
        populate(sav)
    }
    fr.readAsArrayBuffer(file)
}

function populate(save: Uint8Array) {
    populate_global(save)
    populate_levels(save)
}

function toggle_disabled(enabled: boolean) {
    const disabled = document.getElementsByClassName("disabled") as HTMLCollectionOf<HTMLInputElement>
    for (let i = 0; i < disabled.length; i++) {
        const btn = disabled[i]
        btn.disabled = enabled
    }
}
