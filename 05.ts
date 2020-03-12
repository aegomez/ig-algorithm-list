//// ----- Minimum Sum ----- ///

/*
 * Complete the 'minSum' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY num
 *  2. INTEGER k
 */

function minSum(num: number[], k: number): number {
    // Write your code here

    /*
     * Priority queue implementation
     * using a max binary heap.
     */
    const queue: number[] = [];

    // compare two elements at indexes `a` and `b` and
    // return true if the former is greater than the latter
    function compare(a: number, b: number) {
        return queue[a] > queue[b];
    }

    // swap position of two elements at indexes `a` and `b`
    function swap(a: number, b: number) {
        [queue[a], queue[b]] = [queue[b], queue[a]];
    }

    // starting from the top of the heap, arrange
    // elements according to their priority
    function siftDown() {
        const size = queue.length;
        let current = 0;

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
    }

    // take the element at the end of the heap,
    // compare it with its parent and move it up on
    // the heap until reaching its correct position
    function siftUp() {
        let current = queue.length - 1;
        let parent = ((current + 1) >> 1) - 1;

        while (current > 0 && compare(current, parent)) {
            swap(current, parent);
            current = parent;
            parent = ((current + 1) >> 1) - 1;
        }
    }

    // add one or more elements
    function enqueue(...elements: number[]) {
        elements.forEach(element => {
            queue.push(element);
            siftUp();
        });
    }

    // get element at the front of the queue
    // and remove it, then rearrange heap
    function dequeue() {
        const element = queue[0];
        const lastIndex = queue.length - 1;

        if (lastIndex > 0) {
            swap(0, lastIndex);
        }
        queue.pop();
        siftDown();

        return element;
    }

    /* Algorithm */

    // insert all numbers into a priority queue
    enqueue(...num);

    // perform the operation a number of times `k`,
    // to minimize the sum: always remove the largest
    // (top priority) element from the array
    for (let i = 0; i < k; i++) {
        const element = dequeue();
        enqueue(Math.ceil(element / 2));
    }

    return queue.reduce((sum, current) => sum + current, 0);
}
