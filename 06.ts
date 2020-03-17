/*
 * Complete the 'minCost' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY cost as parameter.
 */

function minCost(cost: number[][]): number {
    // Write your code here

    /*
     * Min priority queue implementation
     * (see 05 for explanation).
     */
    const queue: number[] = [];

    function compare(a: number, b: number) {
        return pathCosts[queue[a]] < pathCosts[queue[b]];
    }

    function swap(a: number, b: number) {
        [queue[a], queue[b]] = [queue[b], queue[a]];
    }

    function enqueue(...elements: number[]) {
        elements.forEach(element => {
            queue.push(element);

            // siftUp
            let current = queue.length - 1;
            let parent = ((current + 1) >> 1) - 1;

            while (current > 0 && compare(current, parent)) {
                swap(current, parent);
                current = parent;
                parent = ((current + 1) >> 1) - 1;
            }
        });
    }

    function dequeue() {
        const element = queue[0];
        const lastIndex = queue.length - 1;

        if (lastIndex > 0) {
            swap(0, lastIndex);
        }
        queue.pop();
        const size = queue.length;
        let current = 0;

        // siftDown
        while (true) {
            const left = 2 * current + 1;
            const right = 2 * current + 2;

            if (
                (left < size && compare(left, current)) ||
                (right < size && compare(right, current))
            ) {
                const maxChild =
                    right < size && compare(right, left)
                        ? right
                        : left;
                swap(current, maxChild);
                current = maxChild;
            } else {
                break;
            }
        }

        return element;
    }

    /**
     * Djikstra's shortest path algorithm
     */

    // initialize all nodes with high cost
    // except the entry points (first row)
    const pathCosts = ([] as number[]).concat(...cost).fill(10000, 3);

    // add nodes in first row to the queue
    enqueue(0, 1, 2);

    // get the min value node
    let current = dequeue();

    // traverse all nodes, updating the costs
    // of all the current node's children
    while (queue.length > 0) {
        const col = current % 3;
        const row = (current - col) / 3 + 1;
        const children = [(col + 1) % 3, (col + 2) % 3];

        for (let newCol of children) {
            const index = row * 3 + newCol;
            const newCost = pathCosts[current] + cost[row][newCol];
            if (newCost < pathCosts[index]) {
                pathCosts[index] = newCost;
                enqueue(index);
            }
        }

        current = dequeue();

        // stop if the current shortest path has
        // already reached the last row of the 2D array
        if (current + 3 >= cost.length * 3) {
            break;
        }
    }

    return pathCosts[current];
}
