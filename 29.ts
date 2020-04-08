/// ----- Work Schedule ----- ///

/*
 * Complete the 'findSchedules' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER workHours
 *  2. INTEGER dayHours
 *  3. STRING pattern
 */

export function findSchedules(
    workHours: number,
    dayHours: number,
    pattern: string
): string[] {
    // 1. Parse the `pattern` string

    const fixed: number[] = [];
    let unscheduledDays = 0;
    let scheduledHours = 0;

    for (let i = 0; i < 7; i++) {
        if (pattern[i] === "?") {
            unscheduledDays++;
            fixed.push(-1);
        } else {
            scheduledHours += +pattern[i];
            fixed.push(+pattern[i]);
        }
    }

    // 2. Return if all days are already assigned

    if (unscheduledDays === 0) {
        return [pattern];
    }

    // 3. Find number of remaining hours and the minimum
    //    amount of hours that can be assigned to a day.

    let unscheduledHours = workHours - scheduledHours;
    // If freeHours == 0: only one possible schedule.
    let freeHours = unscheduledDays * dayHours - unscheduledHours;
    // If minDayHours == 0: one or more days can have 0 hours.
    let minDayHours = dayHours - freeHours > 0 ? dayHours - freeHours : 0;

    // 4. Define a function to recursively find all
    //    permutations that satisfy the requirements.

    const answer: string[] = [];
    const permutation = Array(unscheduledDays).fill(minDayHours);

    function findPermutations(index: number) {
        let sum = permutation.reduce((acc, val) => acc + val, 0);

        // If permutation has the required number of digits
        // and the sum of those digits is exactly the number
        // of unscheduledHours, combine the permutation
        // array with the array of fixed values.
        if (index === unscheduledDays) {
            if (sum === unscheduledHours) {
                let string = "";
                for (let j = 0, k = 0; j < 7; j++) {
                    if (fixed[j] < 0) {
                        string += permutation[k++];
                    } else {
                        string += fixed[j];
                    }
                }
                answer.push(string);
            }
            return;
        }

        // Sum of hours is enough, fill the rest with zeroes.
        if (sum > unscheduledHours) {
            permutation[index] = 0;
        }

        for (let h = minDayHours; h <= dayHours; h++) {
            permutation[index] = h;
            findPermutations(index + 1);
        }
    }

    findPermutations(0);

    return answer;
}

// Testing

console.log(findSchedules(56, 8, "???8???")); // 8888888
console.log(findSchedules(3, 2, "??2??00")); // 0020100, 0021000, 0120000, 1020000
console.log(findSchedules(55, 8, "?8??8??")); // 7888888, 8878888, 8887888, 8888878, 8888887
console.log(findSchedules(28, 8, "1234567")); // 1234567
