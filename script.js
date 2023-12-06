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
    if(("" + num).includes(".") && ("" + num).length > 10) {
        return num.toPrecision(SIG_DIGS);
    } else {
        return num;
    }
}

function updateScreen(value) {
    const calcScreen = document.querySelector("#calcScreen > a");
    if(("" + value).length > 10) {
        value = value.toExponential();
    }
    calcScreen.textContent = value;
}

function resetFormula(formula, phase) {
    // used to reset the forumla with CLEAR or after clicking "="
    formula.num1 = formula.solution;
    formula.operator = "";
    formula.num2 = 0;
    formula.solution = 0;
    formula.phase = phase;
}

function resetBtnColor(listBtns) {
    // resets color to default with CLEAR or after clicking "="
    listBtns.forEach((element) => {element.removeAttribute("style")});
}

function updateBtnColor(btn) {
    // sets operator button to the active style after being clicked
    if(LIST_OPERATORS.includes(btn.textContent)) {
        btn.style.backgroundColor = OPERATOR_BTN_CLICK_COL;
    }
}

function getNum(value, formula, input) {
    // stores value after input including number value
    if((input.length < SIG_DIGS + 1 && input.includes(".")) || 
    (input.length < SIG_DIGS && !input.includes("."))) {
        input += value;
        formula[formula.phase] = +input;
        updateScreen(formula[formula.phase]);
    }
    return input;
}

function getOperator(value, formula, input) {
    // stores symbol after input including operator symbol
    input = "";
    if(formula.phase == "num1") {
        formula.phase = "num2";
    } else if(formula.phase == "num2") {
        formula.solution = doCalculation(formula.num1, formula.operator, formula.num2);
        updateScreen(formula.solution);
        resetFormula(formula, "num2");
    }
    formula.operator = value;

    resetBtnColor(document.querySelectorAll("button"));
    updateBtnColor(event.target);
    return input;
}

function getEqual(value, formula, input) {
    // performs calculation after "=" input (or "Enter" key)
    if(input != "") {
        formula[formula.phase] = +input;
    }
    formula.solution = doCalculation(formula.num1, formula.operator, formula.num2);
    resetBtnColor(document.querySelectorAll("button"));

    console.log(formula.solution);
    updateScreen(formula.solution);
    resetFormula(formula, "num1");
    input = "";
    return input;
}

function getClear(value, formula, input) {
    // resets formula after clicking "CLEAR" button
    resetFormula(formula, "num1");
    resetBtnColor(document.querySelectorAll("button"));
    input = "";
    updateScreen(formula.num1);
    return input;
}

function getDelete(value, formula, input) {
    // deletes one input value after clicking "BACKSPACE" or pressing "Backspace" key
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
    return input;
}

function getDecimal(value, formula, input) {
    // records decimal point after inputting "."
    if(!input.includes(".")) {
        input += value;
        updateScreen(input);
    }
    return input;
}

function addBtns(calcContainer, formula, input) {
    // adds click event handler to calculator buttons
    calcContainer.addEventListener("click", (event) => {
        let currentBtn = event.target.textContent;
        let currentBtnID = event.target.id;
        let currentPhase = formula.phase;

        if(LIST_NUMBERS.includes(+currentBtn)){
            input = getNum(currentBtn, formula, input);
        } else if(LIST_OPERATORS.includes(currentBtn)) {
            input = getOperator(currentBtn, formula, input);
        } else if(currentBtn == "=" || currentBtn == "Enter") {
            input = getEqual(currentBtn, formula, input);
        } else if(currentBtn == "CLEAR") {
            input = getClear(currentBtn, formula, input);
        } else if(currentBtn == "BACKSPACE") {
            input = getDelete(currentBtn, formula, input);
        } else if(currentBtn == ".") {
            input = getDecimal(currentBtn, formula, input);
        }

        // console.log(formula);
    })
}

function addKeys(formula, input) {
    // adds event handler when a keyboard press has happened
    addEventListener("keydown", (event) => {
        let currentKey = event.key;

        if(LIST_NUMBERS.includes(+currentKey)){
            input = getNum(currentKey, formula, input);
        } else if(LIST_OPERATORS.includes(currentKey)) {
            input = getOperator(currentKey, formula, input);
        } else if(currentKey == "=" || currentKey == "Enter") {
            input = getEqual(currentKey, formula, input);
        } else if(currentKey == "CLEAR") {
            input = getClear(currentKey, formula, input);
        } else if(currentKey == "Backspace" || currentKey == "Delete") {
            input = getDelete(currentKey, formula, input);
        } else if(currentKey == ".") {
            input = getDecimal(currentKey, formula, input);
        }

        // console.log(formula);
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

    addBtns(calcContainer, formula, "");
    addKeys(formula, "");
}

main();

// Problem: fractional division will fill in as many 0s as calScreen can show
// Problem: if phase is num1, when user clicks an operator, phase becomes num2 (this is especially problematic when initializing or after clicking CLEAR)
// Problem: when inputing 1.05, when user clicks 0, calcScreen shows 1. When user clicks 5, calcScreen shows 1.05
// Problem: if user is at num2 but does not input numbers and clicks =, operator is reset and phase is at num1 (so if user clicks a number button, it adds the num to the digit of num1). Is this intended?
// Problem: 0.23 / 5 gives value.toExponential is not a function (line 44)