/// ----- Promise Area ----- ///

// Complete the calculateArea function below.
// It returns a Promise which on success, returns area of the shape, and on failure returns [-1].
let calculateArea = (shape: string, values: number[]): Promise<string> => {
    let [a, b] = values;
    let area = "";

    if (shape === "square") {
        area = `${a * a}`;
    } else if (shape === "rectangle") {
        area = `${a * b}`;
    } else if (shape === "circle") {
        area = `${Math.round(a * a * 314) / 100}`; // weird rounding but ok
    } else if (shape === "triangle") {
        area = `${a * b * 0.5}`;
    }

    return new Promise((resolve, reject) => {
        if (area) {
            resolve(area);
        } else {
            reject(-1);
        }
    });
};

// Complete the generateArea function below.
// It returns a Promise which on success, returns an array of areas of all the shapes and on failure, returns [-1].
let getAreas = (
    shapes: string[],
    values_arr: number[][]
): Promise<string[]> => {
    let calculations: Promise<string>[] = [];

    for (let i = 0, len = shapes.length; i < len; i++) {
        calculations.push(
            new Promise((resolve, reject) => {
                calculateArea(shapes[i], values_arr[i])
                    .then(resolve)
                    .catch(reject);
            })
        );
    }

    return Promise.all(calculations)
        .then(areas => areas)
        .catch(() => ["-1"]);
};
