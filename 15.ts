/// ----- Final Discounted Price ----- ///

/*
 * Complete the 'finalPrice' function below.
 *
 * The function accepts INTEGER_ARRAY prices as parameter.
 */

function finalPrice(prices: number[]): void {
    // Write your code here

    const fullPrice: number[] = [];
    // A stack to save current lowest prices
    const stack: number[] = [];
    let total = 0;

    // Iterate over array in reverse order
    for (let i = prices.length - 1; i >= 0; i--) {
        let price = prices[i];

        // Remove all values greater than current price
        while (stack.length && stack[stack.length - 1] > price) {
            stack.pop();
        }

        let discount = stack[stack.length - 1];

        // Sold at full price
        if (discount === undefined) {
            discount = 0;
            fullPrice.push(i);
        }

        stack.push(price);
        total += price - discount;
    }

    // Sort in ascending index order
    fullPrice.reverse();
    console.log(`${total}\n${fullPrice.join(" ")}`);
}
