/// ----- Two Junctions ----- ///

/*
 * Complete the 'minCostPath' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. WEIGHTED_INTEGER_GRAPH g
 *  2. INTEGER x
 *  3. INTEGER y
 */

/*
 * For the weighted graph, <name>:
 *
 * 1. The number of nodes is <name>Nodes.
 * 2. The number of edges is <name>Edges.
 * 3. An edge exists between <name>From[i] and <name>To[i]. The weight of the edge is <name>Weight[i].
 *
 */

type Graph = Record<number, Record<number, number>>;

export function minCostPath(
    gNodes: number,
    gFrom: number[],
    gTo: number[],
    gWeight: number[],
    x: number,
    y: number
): number {
    // Build bi-directional graph
    const graph: Graph = {};

    for (let i = 0, k = gFrom.length; i < k; i++) {
        let from = gFrom[i];
        let to = gTo[i];
        if (graph[from] === undefined) {
            graph[from] = {};
        }
        if (graph[to] === undefined) {
            graph[to] = {};
        }
        graph[from][to] = gWeight[i];
        graph[to][from] = gWeight[i];
    }

    return (
        dijkstra(graph, 1, x) +
        dijkstra(graph, x, y) +
        dijkstra(graph, y, gNodes)
    );
}

function dijkstra(graph: Graph, source: number, destination: number): number {
    // Priority queue implemented with a min binary heap
    const queue: number[] = [];
    const costs: Record<string, number> = {};

    function compare(a: number, b: number) {
        return costs[queue[a]] <= costs[queue[b]];
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
                    right < size && compare(right, left) ? right : left;
                swap(current, maxChild);
                current = maxChild;
            } else {
                break;
            }
        }

        return element;
    }

    // Djikstra's shortest path algorithm

    // Assign to all nodes a cost of infinity
    for (let node of Object.keys(graph)) {
        costs[node] = Infinity;
    }

    // set initial node distance as zero
    costs[source] = 0;

    // add initial node to queue
    enqueue(source);
    let current = 0;

    // traverse all nodes, updating the costs
    // of all the current node's children
    while (queue.length) {
        current = dequeue();

        if (current === destination) {
            break;
        }

        let currentCost = costs[current];
        let weights = graph[current];

        for (let adjNode of Object.keys(weights)) {
            let newCost = currentCost + weights[+adjNode];
            if (newCost < costs[adjNode]) {
                costs[adjNode] = newCost;
                enqueue(+adjNode);
            }
        }
    }

    return costs[destination];
}
