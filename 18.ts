/// ----- Is this a tree? ----- ///

/*
 * Complete the 'sExpression' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING nodes as parameter.
 */

type Node = {
    parent: string | null;
    children: string[];
};

export function sExpression(nodes: string): string {
    // Write your code here

    const tree: Record<string, Node> = {};
    // Nodes with no parent
    let rootNodes = 0;

    // Split into parent,child pairs
    // First and last indices will be ignored (empty strings)
    const pairs = nodes.split(/[\(\)\s]+/);

    // Iterate over pairs to build the tree

    for (let i = 1, len = pairs.length - 1; i < len; i++) {
        let [parent, child] = pairs[i].split(",");

        let parentNode = tree[parent];
        let childNode = tree[child];

        if (!parentNode) {
            // Create new node
            tree[parent] = { parent: null, children: [child] };
            rootNodes++;
        } else if (parentNode.children.length > 1) {
            // Error: More than two children
            return "E1";
        } else {
            if (parentNode.children.includes(child)) {
                // Error: Duplicate edge
                return "E2";
            }
            // Add new children to existing node
            parentNode.children.push(child);
            parentNode.children.sort();
        }

        if (!childNode) {
            // Create new node
            tree[child] = { parent, children: [] };
        } else if (childNode.parent) {
            // Error: Node already has a parent
            return "E3";
        } else {
            // Add parent to existing node
            childNode.parent = parent;
            rootNodes--;
        }
    }

    if (rootNodes > 1) {
        // Error: Multiple roots
        return "E4";
    }

    // Search for the unique root node

    let root = Object.keys(tree)[0];
    // Bound number of iterations, to avoid infinite cycles
    let maxIterations = Object.keys(tree).length;
    let n = 0;

    while (tree[root].parent !== null) {
        root = tree[root].parent!;
        if (n++ > maxIterations) {
            return "E3";
        }
    }

    // recursively build the string

    function buildString(nodeName: string): string {
        let node = tree[nodeName];
        return `(${nodeName +
            node.children.reduce((str, name) => str + buildString(name), "")})`;
    }

    return buildString(root);
}
