/// ----- IP Address Validation ----- ///

/*
 * Complete the 'validateAddresses' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts STRING_ARRAY addresses as parameter.
 */

function validateAddresses(addresses: string[]): string[] {
    // Write your code here
    const result = Array.from(addresses, () => "Neither");

    for (let i of addresses.keys()) {
        const address = addresses[i];
        const slice = address.slice(0, 5);

        if (slice.includes(".")) {
            // this could be IPv4
            const blocks = address.split(".");

            // check number of blocks
            if (blocks.length !== 4) continue;

            let count = 0;
            for (let block of blocks) {
                // check block length
                if (block.length > 3) break;
                // try to parse as number
                let num = +(block + "e0");
                // check if number is in range, also
                // look for illegal leading zeroes
                if (
                    isNaN(num) ||
                    num < 0 ||
                    num > 256 ||
                    (num > 7 && num.toString() !== block)
                ) {
                    break;
                }
                // count block as valid
                count++;
            }
            // if the four blocks are valid
            if (count === 4) {
                result[i] = "IPv4";
            }
        } else if (slice.includes(":")) {
            // this could be IPv6

            // check number of double colons
            let doubles = address.split("::").length - 1;
            if (doubles > 1) {
                continue;
            }
            const blocks = address.split(":");

            // check number of blocks
            if (
                blocks.length > 8 ||
                blocks.length < (doubles ? 3 : 8)
            ) {
                continue;
            }

            let count = 0;
            for (let block of blocks) {
                // check block length
                if (block.length > 4) break;
                // try to parse as number
                let num = +("0x0" + block);
                // check if num is a positive number
                if (isNaN(num) || num < 0) break;
                count++;
            }
            if (count === blocks.length) {
                result[i] = "IPv6";
            }
        }
        // else: its neither, don't do anything
    }

    return result;
}
