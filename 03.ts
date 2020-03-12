// ----- Image Editing ----- //

/*
 * Complete the 'largestMatrix' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY arr as parameter.
 */

function largestMatrix(arr: number[][]): number {
    // Write your code here
    let currentMax = 0;
    let rows = arr.length;
    let cols = arr[0].length;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // If current pixel value is 0, it
            // can't be on a square.
            if (arr[r][c] === 1) {
                // Skip if the current pixel is on
                // the first row or column.
                // Compare current with its adjacent
                // pixels, if none of them is zero,
                // then this is a square.
                // Update value to memo the max sized
                // square that can start from here.
                if (r > 0 && c > 0) {
                    arr[r][c] =
                        Math.min(
                            arr[r - 1][c - 1],
                            arr[r - 1][c],
                            arr[r][c - 1]
                        ) + 1;
                }
                // update if this square is larger
                // than global current max
                if (arr[r][c] > currentMax) {
                    currentMax = arr[r][c];
                }
            }
        }
    }
    return currentMax;
}
