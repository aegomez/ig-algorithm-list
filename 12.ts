/// ----- Nearest Neighbor ----- ///

/*
 * Complete the 'closestStraightCity' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts following parameters:
 *  1. STRING_ARRAY c
 *  2. INTEGER_ARRAY x
 *  3. INTEGER_ARRAY y
 *  4. STRING_ARRAY q
 */

type Cities = {
    [key: string]: {
        name: string;
        position: number;
    }[];
};

function closestStraightCity(
    c: string[],
    x: number[],
    y: number[],
    q: string[]
): string[] {
    // Write your code here

    const result: string[] = [];

    // Save a inverted map of city names storing
    // the original indices.

    const indices: Record<string, number> = {};

    // Create a hash map of cities grouped by x position
    // and another one with cities grouped by y.

    const citiesX: Cities = {};
    const citiesY: Cities = {};

    for (let k = 0, lenc = c.length; k < lenc; k++) {
        let i = x[k];
        let j = y[k];
        let name = c[k];

        if (!citiesX[i]) {
            citiesX[i] = [];
        }
        if (!citiesY[j]) {
            citiesY[j] = [];
        }

        indices[name] = k;
        citiesX[i].push({ name, position: j });
        citiesY[j].push({ name, position: i });
    }

    // Sort the arrays in increasing order.

    for (let key of Object.keys(citiesX)) {
        citiesX[key].sort((a, b) => a.position - b.position);
    }
    for (let key of Object.keys(citiesY)) {
        citiesY[key].sort((a, b) => a.position - b.position);
    }

    // Iterate over queries.

    for (let m = 0, lenq = q.length; m < lenq; m++) {
        let currentName = q[m];
        let index = indices[currentName];
        let currentX = x[index];
        let currentY = y[index];

        let min = 1e10;
        let closest = "NONE";

        // Search for closest neighbour in both axes.

        let sameX = citiesX[currentX];
        let sameY = citiesY[currentY];

        if (sameX.length > 1) {
            [min, closest] = searchClosest(sameX, currentY, min, closest);
        }
        if (sameY.length > 1) {
            [min, closest] = searchClosest(sameY, currentX, min, closest);
        }

        result[m] = closest;
    }

    return result;
}

// Search for a city's neighbours on a single axis.

function searchClosest(
    array: Cities[0],
    value: number,
    min: number,
    closest: string
): [number, string] {
    // Find the current city using binary search.
    let low = 0;
    let high = array.length - 1;
    let middle: number;

    while (low <= high) {
        middle = (low + high) >> 1;
        if (array[middle].position === value) {
            // Get adjacent neighbours on current axis.
            let prev = array[middle - 1];
            let next = array[middle + 1];

            let prevDist = prev ? value - prev.position : Infinity;
            let nextDist = next ? next.position - value : Infinity;

            // Update closest name and min value.

            if (prevDist < min || (prevDist === min && prev.name < closest)) {
                min = prevDist;
                closest = prev.name;
            }
            if (nextDist < min || (nextDist === min && next.name < closest)) {
                min = nextDist;
                closest = next.name;
            }
            break;
        } else if (array[middle].position > value) {
            high = middle - 1;
        } else {
            low = middle + 1;
        }
    }
    return [min, closest];
}
