/// ----- Circular Substring Competition ----- ///

/*
 * Complete the 'circularSubstringCompetition' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING target
 *  2. STRING source
 */

function circularSubstringCompetition(
    target: string,
    source: string
): number {
    // Write your code here

    if (target.length > source.length) return -1;

    // Circular source string
    const source2 = source + source;
    // Number of matched characters
    let matches = 0;
    let answer = Infinity;
    // Window starting index
    let start = 0;

    // Occurrences of letters a-z in both strings
    const targetChars = Array.from({ length: 26 }, () => 0);
    const sourceChars = Array.from({ length: 26 }, () => 0);

    // Save occurrences of target string
    for (let i of target) {
        targetChars[i.charCodeAt(0) - 97]++;
    }

    // Traverse the source string
    for (let j = 0, len = source2.length; j < len; j++) {
        let char = source2.charCodeAt(j) - 97;
        // Increase occurrence of this char in source
        sourceChars[char]++;

        // If this char is present in target, and
        // it doesn't appear more than the required
        // times in source window, increase count
        if (sourceChars[char] <= targetChars[char]) {
            matches++;
        }

        // If all the characters are matched
        if (matches === target.length) {
            // Check if any character occurs more times
            // in source window than required in target,
            // also check for useless chars; remove
            // them from the left side of window
            while (true) {
                let char2 = source2.charCodeAt(start) - 97;
                if (sourceChars[char2] > targetChars[char2]) {
                    start++;
                    sourceChars[char2]--;
                } else {
                    break;
                }
            }

            // update window size
            const windowSize = j - start + 1;
            if (windowSize < answer) {
                answer = windowSize;
            }

            // If window size is same length as target,
            // answer can't be minimized anymore
            if (windowSize === target.length) {
                break;
            }
        }
    }

    return answer < Infinity ? answer : -1;
}
