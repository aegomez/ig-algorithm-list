// ----- Math Homework ----- //

/*
 * Complete the 'minNum' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER threshold
 *  2. INTEGER_ARRAY points
 */

function minNum(threshold: number, points: number[]): number {
    // Write your code here

    // get the minimum number required to meet the threshold
    const required = threshold + points[0];

    // search if that number is not in the array to avoid traverse
    if (required > points[points.length - 1]) {
        return points.length;
    }

    // find its position in the array
    const index = points.findIndex(value => value >= required);
    // divide position/2 (rounded up) plus one (first is always done)
    return Math.ceil(index / 2) + 1;
}
