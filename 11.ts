/// ----- Maximum Occurring Character ----- ///

/*
 * Complete the 'maximumOccurringCharacter' function below.
 *
 * The function is expected to return a CHARACTER.
 * The function accepts STRING text as parameter.
 */

function maximumOccurringCharacter(text: string): string {
    // Write your code here

    const freq: { [key: string]: number } = {};
    let maxChar = "";
    let maxFreq = 0;

    for (let i = text.length - 1; i >= 0; i--) {
        let char = text[i];
        freq[char] = (freq[char] || 0) + 1;

        if (freq[char] >= maxFreq) {
            maxFreq = freq[char];
            maxChar = char;
            console.log(maxChar, maxFreq);
        }
    }

    return maxChar;
}
