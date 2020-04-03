/// ----- Strokes to Paint ----- ///

/*
 * Complete the 'strokesRequired' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING_ARRAY picture as parameter.
 */

export function strokesRequired(picture: string[]): number {
    // Write your code here
    let strokes = 0;
    // Cells to be visited during current stroke
    const stack: [number, number][] = [];

    // Mark a cell as visited and push it to the stack
    function visit(y: number, x: number) {
        picture[y] = picture[y].slice(0, x) + "v" + picture[y].slice(x + 1);
        stack.push([y, x]);
    }

    for (let x = 0, xMax = picture[0].length; x < xMax; x++) {
        for (let y = 0, yMax = picture.length; y < yMax; y++) {
            let color = picture[y][x];
            // Check if cell has already been visited
            if (color === "v") {
                continue;
            }

            // Mark current cell as visited
            strokes++;
            visit(y, x);

            // Visit all cells in current stroke
            while (stack.length) {
                let [yy, xx] = stack.pop()!;
                // Check four adjacent cells and stack as required
                if (yy > 0 && picture[yy - 1][xx] === color) {
                    visit(yy - 1, xx);
                }
                if (yy + 1 < yMax && picture[yy + 1][xx] === color) {
                    visit(yy + 1, xx);
                }
                if (xx > 0 && picture[yy][xx - 1] === color) {
                    visit(yy, xx - 1);
                }
                if (xx + 1 < xMax && picture[yy][xx + 1] === color) {
                    visit(yy, xx + 1);
                }
            }
        }
    }
    return strokes;
}
