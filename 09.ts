/// ----- Vowels ----- ///

// Complete the hasVowels function below.
function hasVowels(strArr: string[], query: string[]): number[] {
    const vowels = "aeiou";

    const result = query.map(() => 0);
    const acc: number[] = [];

    // `acc` stores the accumulated sum of positive
    // results (i.e. it passes the vowels test) to
    // the left of current index, inclusive
    strArr.reduce((total, str, index) => {
        if (
            vowels.includes(str[0]) &&
            vowels.includes(str[str.length - 1])
        ) {
            total++;
        }
        acc[index] = total;
        return total;
    }, 0);

    for (let key of query.keys()) {
        // get interval start and end indices
        const [L, R] = query[key].split("-").map(str => +str - 1);
        // result is the difference between right acc
        // and left-1 acc (or 0 if its the first one)
        result[key] = acc[R] - (acc[L - 1] || 0);
    }
    return result;
}
