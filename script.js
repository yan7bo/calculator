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
    let result = 0;
    if(operator == "+") {
        return round(add(num1, num2));
    } else if(operator == "-") {
        return round(subtract(num1, num2));
    } else if(operator == "*") {
        return round(multiply(num1, num2));
    } else if(operator == "/") {
        return round(divide(num1, num2));
    } else if(operator == "") {
        return round(num1);
    }
}

function round(num) {
    if(("" + num).includes(".")) {
        return num.toPrecision(9);
    } else {
        return num;
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
            if((input.length < 10 && input.includes(".")) || (input.length < 9 && !input.includes("."))) {
                input += currentBtn;
                formula[formula.phase] = +input;
                updateScreen(input);
            }
            // console.log(input);
            // console.log(formula);
        } else if(LIST_OPERATORS.includes(currentBtn)) {
            input = "";
            if(formula.phase == "num1") {
                formula.phase = "num2";
            } else if(formula.phase == "num2") {
                formula.solution = doCalculation(formula.num1, formula.operator, formula.num2);
                updateScreen(formula.solution);
                resetFormula(formula, "num2");
            }
            formula.operator = event.target.textContent;

            resetBtnColor(document.querySelectorAll("button"));
            updateBtnColor(event.target);

            // console.log(formula);
        } else if(currentBtn == "=") {
            if(input != "") {
                formula[formula.phase] = +input;
            }
            formula.solution = doCalculation(formula.num1, formula.operator, formula.num2);
            console.log(formula);
            resetBtnColor(document.querySelectorAll("button"));

            updateScreen(formula.solution);
            resetFormula(formula, "num1");
            input = "";
        } else if(currentBtn == "CLEAR") {
            resetFormula(formula, "num1");
            resetBtnColor(document.querySelectorAll("button"));
            input = "";
            updateScreen(formula.num1);
        } else if(currentBtn == "BACKSPACE") {
            if(formula.phase == "num1") {
                input = "" + formula[formula.phase];
                input = input.slice(0, input.length - 1);
                formula[formula.phase] = +input;
                updateScreen(formula[formula.phase]);
            } else if(formula.phase == "num2") {
                if(input == "") {
                    formula.operator = "";
                    formula.phase = "num1";
                    resetBtnColor(document.querySelectorAll("button"));
                    updateScreen(formula[formula.phase]);
                } else {
                    input = "" + formula[formula.phase];
                    input = input.slice(0, input.length - 1);
                    formula[formula.phase] =+ input;
                    updateScreen(formula[formula.phase]);
                }
            }
        } else if(currentBtn == ".") {
            if(!input.includes(".")) {
                input += currentBtn;
            }
        }
        console.log(formula);
    })
}


const LIST_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const LIST_OPERATORS = ["/", "*", "-", "+"];
const LIST_FUNCTIONS = ["CLEAR", "BACKSPACE"];
const operatorBtnBGColor = "grey";
const OPERATOR_BTN_CLICK_COL = "white";
const SIG_DIGS = 9;

function main() {
    let formula = {num1: 0, operator: "", num2: 0, solution: 0, phase: "num1"};
    const calcContainer = document.querySelector("#calcContainer");

    addNumberBtns(calcContainer, formula, "");
}

main();

// Problem: you can keep entering numbers until screen overflows. Screen also shows scientific numbers.