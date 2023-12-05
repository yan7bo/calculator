function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}


function doCalculation(num1, operator, num2) {
    if(operator == "+") {
        return add(num1, num2);
    } else if(operator == "-") {
        return subtract(num1, num2);
    } else if(operator == "*") {
        return multiply(num1, num2);
    } else if(operator == "/") {
        return divide(num1, num2);
    }
}

function updateScreen(solution) {
    const calcScreen = document.querySelector("#calcScreen > a");
    calcScreen.textContent = solution;
}

function addNumberBtns(calcContainer, formula, phase) {
    calcContainer.addEventListener("click", (event) => {
        let currentBtn = event.target.textContent;
        console.log(currentBtn);
        if(phase == "num1" && LIST_NUMBERS.includes(+currentBtn)) {
            formula[phase] = +currentBtn;
            phase = "operator";
            console.log(formula);
        } else if(phase == "operator" && LIST_OPERATORS.includes(currentBtn)) {
            formula[phase] = currentBtn;
            phase = "num2";
            console.log(formula);
        } else if(phase == "num2" && LIST_NUMBERS.includes(+currentBtn)) {
            formula[phase] = +currentBtn;
            phase = "solution";
            console.log(formula);
        } else if(phase == "solution" && currentBtn == "=") {
            formula[phase] = doCalculation(formula.num1, formula.operator, formula.num2);
            updateScreen(formula.solution);
            console.log(formula);
        } else {
            console.log("error");
        }
    })
}


const LIST_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const LIST_OPERATORS = ["/", "*", "-", "+"];
const LIST_FUNCTIONS = ["CLEAR", "BACKSPACE"];

function main() {
    let formula = {num1: null, operator: null, num2: null, solution: null};
    let phase = "num1";
    const calcContainer = document.querySelector("#calcContainer");

    addNumberBtns(calcContainer, formula, phase);
}

main();