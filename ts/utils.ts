export function format_time(raw: Uint8Array): string {
    let strs = []
    for (let i = 0; i < 2; i++) {
        strs[i] = pad(raw[i], 2)
    }
    return strs.join(':')
}

export function bytes_to_num(bytes: Uint8Array): number {
    let output = 0

    for (let i = bytes.length - 1; i >= 0; i--) {
        output <<= 8
        output |= bytes[i]
    }

    return output
}

export function num_to_bytes(value: number, byte_cnt: number): number[] {
    let array = []

    for (let i = 0; i < byte_cnt; i++) {
        const offset = 8 * i
        const byte = (value >> offset) & 0xFF
        array[i] = byte
    }

    return array
}

function pad(val: number, size: number): string {
    let s = String(val)
    while (s.length < size) {
        s = "0" + s
    }
    return s
}
