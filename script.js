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

function updateScreen(value) {
    const calcScreen = document.querySelector("#calcScreen > a");
    calcScreen.textContent = value;
}

function resetFormula(formula, phase) {
    formula.num1 = formula.solution;
    formula.operator = null;
    formula.num2 = null;
    formula.solution = null;
    formula.phase = phase;
}

function resetBtnColor(btn) {
    btn.removeAttribute("style");
}

function updateBtnColor(btn) {
    if(LIST_OPERATORS.includes(btn.textContent)) {
        btn.style.backgroundColor = OPERATOR_BTN_CLICK_COL;
    }
}

function addNumberBtns(calcContainer, formula, input) {
    // adds click event handler to number buttons and operator buttons
    calcContainer.addEventListener("click", (event) => {
        let currentBtn = event.target.textContent;
        let currentBtnID = event.target.id;
        let currentPhase = formula.phase;

        if(LIST_NUMBERS.includes(+currentBtn)){
            input += currentBtn;
            formula[currentPhase] = +input;
            updateScreen(input);
            // console.log(input);
            // console.log(formula);
        } else if(LIST_OPERATORS.includes(currentBtn)) {
            // formula[currentPhase] = +input;
            formula.operator = event.target;

            updateBtnColor(event.target);

            input = "";
            if(formula.phase == "num1") {
                formula.phase = "num2";
            }
            // console.log(formula);
        } else if(currentBtn == "=") {
            formula[currentPhase] = +input;
            formula.solution = doCalculation(formula.num1, formula.operator.textContent, formula.num2);
            resetBtnColor(formula.operator);

            updateScreen(formula.solution);
            resetFormula(formula, "num2");
            input = "";
        } else if(currentBtn == "CLEAR") {
            resetFormula(formula, "");
            input = "";
            updateScreen(input);
        }
        console.log(formula);
    })

    addFunctions(calcContainer, formula, input);
}

function addFunctions() {

}

const LIST_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const LIST_OPERATORS = ["/", "*", "-", "+"];
const LIST_FUNCTIONS = ["CLEAR", "BACKSPACE"];
const operatorBtnBGColor = "grey";
const OPERATOR_BTN_CLICK_COL = "white";

function main() {
    let formula = {num1: null, operator: null, num2: null, solution: null, phase: "num1"};
    const calcContainer = document.querySelector("#calcContainer");

    addNumberBtns(calcContainer, formula, "");
}

main();

// Problems:
// - after you do one operation, the function automatically assumes that any # input is for num2.
//   this should only be the case if user clicks an operator. Otherwise the # input should
//   reset num1;