export function format_time(raw: Uint8Array): string {
    let strs = []
    for (let i = 0; i < 2; i++) {
        strs[i] = pad(raw[i], 2)
    }
    return strs.join(':')
}

export function le_to_be(low: number, high: number): number {
    return (high << 8) | low
}

function pad(val: number, size: number): string {
    let s = String(val)
    while (s.length < size) {
        s = "0" + s
    }
    return s
}
