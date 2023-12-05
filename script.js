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

function resetFormula(formula) {
    formula.num1 = formula.solution;
    formula.operator = null;
    formula.num2 = null;
    formula.solution = null;
    formula.phase = "num2";
}

function addNumberBtns(calcContainer, formula, input) {
    calcContainer.addEventListener("click", (event) => {
        let currentBtn = event.target.textContent;
        let currentPhase = formula.phase;

        if(LIST_NUMBERS.includes(+currentBtn)){
            input += currentBtn;
            console.log(input);
            console.log(formula);
        } else if(LIST_OPERATORS.includes(currentBtn)) {
            formula[currentPhase] = +input;
            formula.operator = currentBtn;
            input = "";
            if(formula.phase == "num1") {
                formula.phase = "num2";
            }
            console.log(formula);
        } else if(currentBtn == "=") {
            formula[currentPhase] = +input;
            formula.solution = doCalculation(formula.num1, formula.operator, formula.num2);
            updateScreen(formula.solution);
            resetFormula(formula);
            console.log(formula);
        }

        /*
        if(currentPhase == "num1" && LIST_NUMBERS.includes(+currentBtn)) {
            formula[currentPhase] = +currentBtn;
            formula.phase = "operator";
            console.log(formula);
        } else if(currentPhase == "operator" && LIST_OPERATORS.includes(currentBtn)) {
            formula[currentPhase] = currentBtn;
            formula.phase = "num2";
            console.log(formula);
        } else if(currentPhase == "num2" && LIST_NUMBERS.includes(+currentBtn)) {
            formula[currentPhase] = +currentBtn;
            formula.phase = "solution";
            console.log(formula);
        } else if(currentPhase == "solution" && currentBtn == "=") {
            formula[currentPhase] = doCalculation(formula.num1, formula.operator, formula.num2);
            updateScreen(formula.solution);
            resetFormula(formula);
            console.log(formula);
        } else {
            console.log("error");
        }
        */
    })
}


const LIST_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const LIST_OPERATORS = ["/", "*", "-", "+"];
const LIST_FUNCTIONS = ["CLEAR", "BACKSPACE"];

function main() {
    let formula = {num1: null, operator: null, num2: null, solution: null, phase: "num1"};
    const calcContainer = document.querySelector("#calcContainer");

    addNumberBtns(calcContainer, formula, "");
}

main();