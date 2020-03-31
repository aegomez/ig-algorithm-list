/// ----- University Career Fair ----- ///

/*
 * Complete the 'maxEvents' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY arrival
 *  2. INTEGER_ARRAY duration
 */

export function maxEvents(arrival: number[], duration: number[]): number {
    // Sort the events according to end time ascending order
    const events = arrival
        .map((start, index) => [start, start + duration[index]])
        .sort((a, b) => a[1] - b[1]);

    let max = 0; // max possible events
    let currentEnd = -1; // end time after the last event

    for (let i = 0, len = events.length; i < len; i++) {
        let [start, end] = events[i];

        // This event can happen if it starts after currentEnd
        if (start >= currentEnd) {
            max++;
            currentEnd = end;
        }
    }

    return max;
}
