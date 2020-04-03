/// ----- Smallest Set Covering Intervals ----- ///

/*
 * Complete the 'interval' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY first
 *  2. INTEGER_ARRAY last
 */

export function interval(first: number[], last: number[]): number {
    // Write your code here
    let size = first.length;
    if (size === 1) {
        return 2;
    }

    // Build the list of interval pairs [start, end][]
    const pairs: [number, number][] = [];

    for (let i = 0; i < size; i++) {
        pairs.push([first[i], last[i]]);
    }

    // Sort in end time ascending order, then in start time descending order
    pairs.sort((a, b) => (a[1] === b[1] ? b[0] - a[0] : a[1] - b[1]));

    // Store largest and second largest values in previous interval
    let largest = -1;
    let second = -1;
    let answer = 0;

    // Compare each interval with the previous one
    for (let j = 0; j < size; j++) {
        let [start, end] = pairs[j];

        if (start <= second) {
            // Two or more values are repeated, no changes
            continue;
        } else if (start <= largest) {
            // One value is repeated, increase set size
            // and update largest values
            answer += 1;
            second = largest;
            largest = end;
        } else {
            // No value is repeated
            answer += 2;
            second = end - 1;
            largest = end;
        }
    }
    return answer;
}
