/// ----- Removing Chocolates ----- ///

/*
 * Complete the 'numberOfWays' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER n as parameter.
 */

function numberOfWays(n: number): number {
    // Write your code here

    // Find number of possible permutations using dynamic programming
    let current = 1;
    let prev1 = 0;
    let prev2 = 0;
    let prev3 = 0;

    // The number of permutations to reach number `n`
    // is the sum of previous possible permutations.
    for (let i = 1; i <= n; i++) {
        prev3 = prev2;
        prev2 = prev1;
        prev1 = current;
        // add numbers using the modulo distributive identity:
        // (a + b) % n = [(a % n) + (b % n)] % n
        current = prev1;
        if (i >= 3) {
            current = (current + prev3) % 1000000007;
        }
    }

    return current % 1000000007;
}

// Testing

console.log(numberOfWays(1)); // 1
console.log(numberOfWays(3)); // 2
console.log(numberOfWays(7)); // 9
console.log(numberOfWays(796723)); // 812565830;
console.log(numberOfWays(183477)); // 557688086;
console.log(numberOfWays(740862981)); // 425919335;
