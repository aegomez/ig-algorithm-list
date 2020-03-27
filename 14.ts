/// ----- The Social Network ----- ///

/*
 * Complete the 'socialGraphs' function below.
 *
 * The function accepts INTEGER_ARRAY counts as parameter.
 */

function socialGraphs(counts: number[]): void {
    // Write your code here

    const groups: Record<string, number[]> = {};
    const result: number[][] = [];

    // Group ids according to their group size

    for (let id = 0, len = counts.length; id < len; id++) {
        let size = counts[id];
        if (!groups[size]) {
            groups[size] = [];
        }
        groups[size].push(id);
    }

    // Iterate over group sizes, divide them in
    // chunks and push chunks to a new array

    for (let size of Object.keys(groups)) {
        let current = groups[size];
        let chunk = +size;

        // sort inside groups
        current.sort((a, b) => a - b);

        for (let j = 0, k = current.length; j < k; j += chunk) {
            result.push(current.slice(j, j + chunk));
        }
    }

    // sort the result array by smallest user id
    result.sort((a, b) => a[0] - b[0]);

    let str = result.map(arr => arr.join(" ")).join("\n");
    console.log(str);
}
