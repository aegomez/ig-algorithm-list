/// ----- Shopping Cart Billing ----- ///

/*
 * Complete the 'findLowestPrice' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. 2D_STRING_ARRAY products
 *  2. 2D_STRING_ARRAY discounts
 */

function findLowestPrice(products: string[][], discounts: string[][]): number {
    // Write your code here

    let totalCost = 0;

    // Create a map of discounts indexed by tag name

    const disc: { [tag: string]: [string, number] } = {};

    for (let i = 0, d = discounts.length; i < d; i++) {
        let [tag, type, amount] = discounts[i];
        disc[tag] = [type, +amount];
    }

    // Iterate over product list

    for (let j = 0, p = products.length; j < p; j++) {
        let tags = products[j];
        let price = +tags[0];
        let min = price;

        // Iterate over discount tags

        for (let k = 1, t = tags.length; k < t; k++) {
            if (tags[k] === "EMPTY") continue;

            // Apply discount according to type

            let [type, amount] = disc[tags[k]];
            let discountedPrice = price;

            if (type === "0") {
                discountedPrice = amount;
            } else if (type === "1") {
                discountedPrice -= Math.round((price * amount) / 100);
            } else {
                discountedPrice -= amount;
            }

            // Update min price

            if (discountedPrice < min) {
                min = discountedPrice;
            }
        }

        totalCost += min;
    }

    return totalCost;
}
