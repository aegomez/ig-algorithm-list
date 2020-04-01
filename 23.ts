/// ----- Degree of an Array ----- ///

/*
 * Complete the 'degreeOfArray' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

export function degreeOfArray(arr: number[]): number {
    // Write your code here
    const hashmap: Record<number, number[]> = {};

    let degree = 1;
    let minLength = 1;

    for (let i = 0, len = arr.length; i < len; i++) {
        let value = arr[i];
        if (hashmap[value] === undefined) {
            // First occurrence, save [count, lastIndex, length]
            hashmap[value] = [1, i, 1];
        } else {
            let count = hashmap[value][0] + 1;
            // currentLength + currentIndex - lastIndex
            let length = hashmap[value][2] + i - hashmap[value][1];

            // Update hash map
            hashmap[value] = [count, i, length];

            // Update global values
            if (count > degree) {
                // New max degree
                degree = count;
                minLength = length;
            } else if (count === degree && length < minLength) {
                // Same degree, but shortest subarray length
                minLength = length;
            }
        }
    }
    return minLength;
}
