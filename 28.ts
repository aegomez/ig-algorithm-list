/// ----- Reaching Points ----- ///

/*
 * Complete the 'canReach' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. INTEGER x1
 *  2. INTEGER y1
 *  3. INTEGER x2
 *  4. INTEGER y2
 */

export function canReach(
    x1: number,
    y1: number,
    x2: number,
    y2: number
): string {
    // Write your code here

    // Follow the path backwards, starting from
    // target position. Each position can only
    // have one possible parent/previous position.
    let x3 = x2;
    let y3 = y2;

    while (true) {
        // Position has been reached
        if (x3 === x1 && y3 === y1) {
            return "Yes";
        }
        // Postion is unreachable
        if (x3 < x1 || y3 < y1) {
            return "No";
        }
        // Go back to previous position
        if (x3 > y3) {
            x3 = x3 - y3;
        } else {
            y3 = y3 - x3;
        }
    }
}

// Testing

console.log(canReach(1, 4, 5, 9) === "Yes");
console.log(canReach(2, 2, 2, 1000) === "Yes");
console.log(canReach(8, 9, 8, 9) === "Yes");
console.log(canReach(1, 2, 2, 1) === "No");
console.log(canReach(1, 1, 1000, 1000) === "No");
console.log(canReach(1, 1, 10, 12) === "No");
console.log(canReach(2, 2, 1000, 998) === "Yes");
console.log(canReach(1, 4, 45, 62) === "No");
