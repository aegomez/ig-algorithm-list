/// ----- Threshold Alerts ----- ///

/*
 * Complete the 'numberOfAlerts' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER precedingMinutes
 *  2. INTEGER alertThreshold
 *  3. INTEGER_ARRAY numCalls
 */

export function numberOfAlerts(
    precedingMinutes: number,
    alertThreshold: number,
    numCalls: number[]
): number {
    // Write your code here
    let alerts = 0;
    let sum = 0;

    for (let i = 0, len = numCalls.length; i < len; i++) {
        // Add value to local sum
        sum += numCalls[i];

        if (i + 1 >= precedingMinutes) {
            // Calculate local average and compare to threshold
            let average = sum / precedingMinutes;
            if (average > alertThreshold) {
                alerts++;
            }
            // Substract oldest value from sum
            sum -= numCalls[i - precedingMinutes + 1];
        }
    }

    return alerts;
}
