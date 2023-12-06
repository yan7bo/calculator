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
    } else if(operator == "") {
        return num1;
    }
}

function updateScreen(value) {
    const calcScreen = document.querySelector("#calcScreen > a");
    calcScreen.textContent = value;
}

function resetFormula(formula, phase) {
    formula.num1 = formula.solution;
    formula.operator = "";
    formula.num2 = 0;
    formula.solution = 0;
    formula.phase = phase;
}

function resetBtnColor(listBtns) {
    listBtns.forEach((element) => {element.removeAttribute("style")});
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
            formula.operator = event.target.textContent;

            resetBtnColor(document.querySelectorAll("button"));
            updateBtnColor(event.target);

            input = "";
            if(formula.phase == "num1") {
                formula.phase = "num2";
            }
            // console.log(formula);
        } else if(currentBtn == "=") {
            console.log(input);
            if(input != "") {
                formula[currentPhase] = +input;
            }
            formula.solution = doCalculation(formula.num1, formula.operator, formula.num2);
            console.log(formula);
            resetBtnColor(document.querySelectorAll("button"));

            updateScreen(formula.solution);
            resetFormula(formula, "num1");
            input = "";
        } else if(currentBtn == "CLEAR") {
            resetFormula(formula, "");
            resetBtnColor(document.querySelectorAll("button"));
            input = "";
            updateScreen(formula.num1);
        }
        console.log(formula);
    })
}


const LIST_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const LIST_OPERATORS = ["/", "*", "-", "+"];
const LIST_FUNCTIONS = ["CLEAR", "BACKSPACE"];
const operatorBtnBGColor = "grey";
const OPERATOR_BTN_CLICK_COL = "white";

function main() {
    let formula = {num1: 0, operator: "", num2: 0, solution: 0, phase: "num1"};
    const calcContainer = document.querySelector("#calcContainer");

    addNumberBtns(calcContainer, formula, "");
}

main();
