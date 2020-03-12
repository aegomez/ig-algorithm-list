//----- Growth in 2 Dimensions -----//

/*
 * Complete the 'countMax' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts STRING_ARRAY upRight as parameter.
 */

/**
 * @param {string[]} upRight
 */
function countMax(upRight: string[]) {
    // Write your code here
    let minRow = 10000000;
    let minCol = 10000000;

    for (let i = 0, len = upRight.length; i < len; i++) {
        const [r, c] = upRight[i].split(" ");
        if (+r < minRow) {
            minRow = +r;
        }
        if (+c < minCol) {
            minCol = +c;
        }
    }
    return minCol * minRow;
}
