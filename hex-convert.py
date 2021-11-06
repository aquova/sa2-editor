#!/usr/bin/python3

# Hex Convert
# A small utility to convert to/from hex and decimal

import sys

def main():
    if len(sys.argv) == 1:
        print("Usage: python3 hex-convert.py VALUE")
        return

    value = sys.argv[1]
    hex_input = value.startswith("0x")

    output = ""
    if hex_input:
        value = value[2:]
        output = int(value, 16)
    else:
        value = int(value)
        output = hex(value)

    print(output)

if __name__ == "__main__":
    main()
