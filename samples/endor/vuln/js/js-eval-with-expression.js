// Function to be used in setInterval and setTimeout
function greet(name) {
    console.log(`Hello, ${name}!`);
}

// Using setInterval
let counter = 0;
const intervalId = setInterval(() => {
    console.log(`Interval count: ${counter}`);
    counter++;
    if (counter >= 5) {
        clearInterval(intervalId);
    }
}, 1000);

// Using setTimeout
setTimeout(greet, 2000, "Alice");

// Nested setTimeout
setTimeout(() => {
    console.log("First timeout");
    setTimeout(() => {
        console.log("Nested timeout");
    }, 1000);
}, 3000);

// Using eval
const x = 10;
const y = 20;
eval('console.log(`The sum is ${x + y}`)');

// Function that uses eval
function dynamicCalculation(operation) {
    // ruleid: js-eval-with-expression
    return eval(operation);
}

console.log(dynamicCalculation('5 * 7'));

// setTimeout with eval
setTimeout(() => {
    eval('console.log("Evaluated after 4 seconds")');
}, 4000);

// setInterval with eval (careful with this in real code!)
let evalCounter = 0;
const evalIntervalId = setInterval(() => {
    // ruleid: js-eval-with-expression
    eval(`console.log("Eval interval: ${evalCounter++}")`);
    if (evalCounter >= 3) {
        clearInterval(evalIntervalId);
    }
}, 1500);

// Function that returns a function using eval
function createDynamicFunction(functionBody) {
    // ruleid: js-eval-with-expression
    return eval(`(function() { ${functionBody} })`);
}

const dynamicFunc = createDynamicFunction('return "Hello from dynamic function";');
console.log(dynamicFunc());

// setTimeout with a string argument (implicitly uses eval)
setTimeout('console.log("setTimeout with string argument")', 5000);