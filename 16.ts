/// ----- Segment ----- ///

/*
 * Complete the 'segment' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER x
 *  2. INTEGER_ARRAY arr
 */

function segment(x: number, arr: number[]): number {
    // Write your code here

    // Find the local min of the first sub-array
    let min = Infinity;

    for (let i = 0; i < x; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }
    }

    let max = min;

    // Sliding window of size x, starting at second sub-array
    for (let j = 1, a = arr.length - x; j <= a; j++) {
        let newElement = arr[j + x - 1];
        let localMin = Infinity;

        // Get local min

        // Try direct comparison
        if (newElement <= min) {
            localMin = newElement;
        } else {
            // linear search
            for (let k = j; k < j + x; k++) {
                if (arr[k] < localMin) {
                    localMin = arr[k];
                }
            }
        }

        // Update min
        if (localMin !== min) {
            min = localMin;
            // Compare to get current global max
            if (min > max) {
                max = min;
            }
        }
    }

    return max;
}
