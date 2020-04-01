/// ----- Prefix To Postfix ----- ///

/*
 * Complete the 'prefixToPostfix' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts STRING_ARRAY prefixes as parameter.
 */

export function prefixToPostfix(prefixes: string[]): string[] {
    const operators = "/*+-";
    const postfixes: string[] = [];

    for (let i = 0, len = prefixes.length; i < len; i++) {
        let expression = prefixes[i];

        // Save operands/digits in a stack (LIFO)
        const operands: string[] = [];

        // Iterate over the expression in reverse order
        for (let j = expression.length - 1; j >= 0; j--) {
            let char = expression[j];

            if (operators.includes(char)) {
                // If char is an operator, pop two items from the stack
                let substring = "" + operands.pop() + operands.pop() + char;
                // Push the substring back to stack
                operands.push(substring);
            } else {
                // If char is an operand, push it to the stack
                operands.push(char);
            }
        }
        // First item in the stack should be postfix expression
        postfixes.push(operands[0]);
    }
    return postfixes;
}

// Testing

console.log(prefixToPostfix(["*34", "+1*23", "+12"]));
// result: [ '34*', '123*+', '12+' ]

console.log(prefixToPostfix(["+1**23/14"]));
// result: [ '123*14/*+' ]

console.log(prefixToPostfix(["//925", "+*776"]));
// result: [ '92/5/', '77*6+' ]
