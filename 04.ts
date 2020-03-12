// ----- Equal Circle Segments ----- //

/*
 * Complete the 'largestSegment' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY radius
 *  2. INTEGER segments
 */

function largestSegment(radius: number[], segments: number): string {
    // Write your code here

    // Get array of areas and sort it
    const areas = radius.map(r => r * r * 1e5).sort((a, b) => b - a);

    // current max possible value
    let largest = 0;

    /*
     * Starting from the average area size, find
     * if that size is a possible solution.
     * If it is a solution, try with a bigger size,
     * else, try with a smaller size.
     * Repeat until the optimal solution is found.
     */

    // current lower and upper bounds for searching
    let low = 0;
    let high = areas[0];
    // average value
    let mid: number;

    /**
     * Find if its possible to cut at least N
     * "slices" of area = `size` from the set
     * of circles, where N >= `segments`.
     */
    function itsSolution(size: number): boolean {
        // amount of slices
        let N = 0;
        for (let area of areas) {
            // get how many whole slices of that size
            // can be cutted from current circle
            const slices = Math.floor(area / size);
            N += slices;
            if (N >= segments) {
                // enough amount of slices
                break;
            }
        }
        return N >= segments;
    }

    // Use binary search to find optimal size.
    // Added a small tolerance < required absolute error
    while (low + 0.01 <= high) {
        mid = low + (high - low) / 2;
        if (itsSolution(mid)) {
            // update current max
            largest = mid;
            // increase lower bound
            low = mid;
        } else {
            // increase upper bound
            high = mid;
        }
    }
    // decimals are fun
    return (Math.floor(largest) * 3.14159265359e-5 + 1e-5).toFixed(4);
}
