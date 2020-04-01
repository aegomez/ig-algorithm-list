/// ----- Turnstile ----- ///

/*
 * Complete the 'getTimes' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY time
 *  2. INTEGER_ARRAY direction
 */

function getTimes(time: number[], direction: number[]): number[] {
    // Write your code here
    const answer = Array.from(time, () => -1);
    const queue: [number, number][][] = [[], []];

    // Create queues for both directions
    for (let k = 0, len = time.length; k < len; k++) {
        queue[direction[k]].push([k, time[k]]);
    }

    // Current direction: 0 or 1, -1 is unknown
    let dir = -1;
    let i = 0; // current index
    let t = 0; // current arrival time
    let tg = 0; // global time

    // Iterate until both queues are empty
    while (queue[0].length || queue[1].length) {
        // Direction can be unknown (-1) before first
        // turn or after time skips
        if (dir < 0) {
            // Get queue with next lowest arrival time
            // (tg++ is not used because time gaps can be large)
            dir =
                !queue[0][0] ||
                (queue[1][0] && queue[1][0][1] <= queue[0][0][1])
                    ? 1
                    : 0;
            [i, t] = queue[dir][0];
            answer[i] = t;
            tg = t;
        }

        // Identify queues for current direction and reverse direction
        let rev = 1 - dir;
        let dirQueue = queue[dir];
        let revQueue = queue[rev];

        // Empty same direction queue first, then reverse queue,
        // update global time each turn
        if (dirQueue.length && dirQueue[0][1] <= tg) {
            i = dirQueue.shift()![0];
            answer[i] = tg++;
        } else if (revQueue.length && revQueue[0][1] <= tg) {
            i = revQueue.shift()![0];
            answer[i] = tg++;
            dir = rev;
        } else {
            // queue is empty at current time:
            // mark direction as unknown
            dir = -1;
        }
    }

    return answer;
}

// Testing

console.log(getTimes([0, 0, 1, 5], [0, 1, 1, 0]));
// expected: [2, 0, 1, 5]

console.log(getTimes([0, 1, 1, 3, 3], [0, 1, 0, 0, 1]));
// expected: [0, 2, 1, 4, 3]

console.log(getTimes([1], [0]));
// expected: [1]
