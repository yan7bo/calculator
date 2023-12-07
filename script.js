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

/*
function updateScreen(inputStr, value) {
    // const calcScreen = document.querySelector("#calcScreen > a");
    const calcScreenFormula = document.querySelector("#calcScreen :first-child");
    const calcScreenValue = document.querySelector("#calcScreen :nth-child(2)");
    if(("" + value).length > 10) {
        value = value.toExponential();
    }
    calcScreenFormula.textContent = inputStr;
    calcScreenValue.textContent = value;
    
}
*/

function updateScreenFormula(inputStr) {
    // updates the formula display in calcScreen
    const calcScreenFormula = document.querySelector("#calcScreen :first-child");
    calcScreenFormula.textContent = inputStr;
}

function updateScreenValue(value) {
    // updates the value display in calcScreen
    const calcScreenValue = document.querySelector("#calcScreen :nth-child(2)");
    if(("" + value).length > 10) {
        value = value.toExponential();
    }
    calcScreenValue.textContent = value;
}

function resetFormula(formula, phase, str) {
    // used to reset the forumla with CLEAR or after clicking "="
    formula.num1 = formula.solution;
    formula.operator = "";
    formula.num2 = 0;
    formula.solution = 0;
    formula.phase = phase;
    formula.inputStr = str;
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
        formula.inputStr += value;
        updateScreenValue(input);
    }
    return input;
}

function getOperator(value, formula, input) {
    // stores symbol after input including operator symbol
    
    if(formula.phase == "num1") {
        formula.phase = "num2";
        formula.inputStr += value;
        updateScreenFormula(formula.inputStr);
    } else if(formula.phase == "num2") {
        formula.solution = doCalculation(formula.num1, formula.operator, formula.num2);
        // updateScreen(formula.inputStr, formula.solution);
        resetFormula(formula, "num2", "" + formula.solution + value);
        updateScreenFormula(formula.inputStr);
        updateScreenValue(formula[formula.phase]);
    }
    formula.operator = value;
    input = "";

    resetBtnColor(document.querySelectorAll("button"));
    updateBtnColor(event.target);
    return input;
}

function getEqual(value, formula, input) {
    // performs calculation after "=" input (or "Enter" key)
    if(input != "") {
        // if there has been a number input, set that number input into formula
        // operators and equals sign both reset input
        formula[formula.phase] = +input;
    }
    if(LIST_OPERATORS.includes(formula.inputStr.slice(formula.inputStr.length - 1))) {
        formula.num2 = formula.num1;
        formula.inputStr += formula.num2;
    }
    formula.solution = doCalculation(formula.num1, formula.operator, formula.num2);
    resetBtnColor(document.querySelectorAll("button"));

    // updateScreen(formula.inputStr, formula.solution);
    resetFormula(formula, "num1", formula.inputStr + value);
    updateScreenFormula(formula.inputStr);
    updateScreenValue(formula[formula.phase]);
    input = "";
    return input;
}

function getClear(value, formula, input) {
    // resets formula after clicking "CLEAR" button
    resetFormula(formula, "num1", "");
    resetBtnColor(document.querySelectorAll("button"));
    input = "";
    // updateScreen(formula.inputStr, formula.num1);
    updateScreenFormula(formula.inputStr);
    updateScreenValue(formula[formula.phase]);
    return input;
}

function getDelete(value, formula, input) {
    // deletes one input value after clicking "BACKSPACE" or pressing "Backspace" key
    if(input != "") {
    // input = "" + formula[formula.phase];
        input = input.slice(0, input.length - 1);
        formula[formula.phase] = +input;

        formula.inputStr = formula.inputStr.slice(0, formula.inputStr.length - 1);
    }
    // updateScreenFormula(formula.inputStr);
    updateScreenValue(formula[formula.phase]);
    return input;
}

function getDecimal(value, formula, input) {
    // records decimal point after inputting "."
    if(!input.includes(".")) {
        if(formula[formula.phase] == 0) {
            input = "0" + value;
        } else {
            input += value;
        }
        formula.inputStr += value;
        // updateScreen(formula.inputStr, input);
        // updateScreenFormula(formula.inputStr);
        updateScreenValue(input);
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

        console.log(formula);
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
    let formula = {num1: 0, operator: "", num2: 0, solution: 0, phase: "num1", inputStr: ""};
    const calcContainer = document.querySelector("#calcContainer");

    addBtns(calcContainer, formula, "");
    addKeys(formula, "");
}

main();

// Problems:

// Styles to add:
// - if an operator key was inputted, the operator button should be highlighted
// - if a key is inputted, the correct button should show a click