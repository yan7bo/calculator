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

function updateScreenFormula(inputStr) {
    // updates the formula display in calcScreen
    calcScreenFormula.textContent = inputStr;
}

function updateScreenValue(value) {
    // updates the value display in calcScreen
    const calcScreenValue = document.querySelector("#calcScreen :nth-child(2)");
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

function addCommas(input) {
    // adds comma delims to numbers

    // make sure input is a string
    input = "" + input;

    let output = "";
    let indexDecimal = input.indexOf(".");
    let left = "";
    let right = "";
    if(indexDecimal >= 0) {
        left = input.slice(0, indexDecimal);
        right = input.slice(indexDecimal);
    } else {
        left = input.slice(0, input.length);
    }
    let numLeft = left.length;
    for(let i = 0; i < numLeft; i++) {
        if((i % 3) == (numLeft % 3) && i > 0) {
            output += ",";
        }
        output += left[i];
    }
    if(right != "") {
        output += right;
    }
    return output;
}

function getNum(value, formula, input) {
    // stores value after input including number value
    if((input.length < SIG_DIGS + 1 && input.includes(".")) || 
    (input.length < SIG_DIGS && !input.includes("."))) {
        input += value;
        formula[formula.phase] = +input;
        // formula.inputStr += value;
        switch(formula.phase) {
            case "num1":
                formula.inputStr = addCommas(formula.num1);
                break;
            case "num2":
                formula.inputStr = addCommas(formula.num1) + formula.operator + addCommas(formula.num2);
                break;
        }
        updateScreenValue(addCommas(input));
    }
    return input;
}

function getOperatorBtn(operator) {
    switch(operator) {
        case "+":
            return document.querySelector("#plus");
        
        case "-":
            return document.querySelector("#minus");

        case "*":
            return document.querySelector("#multiply");
        
        case "/":
            return document.querySelector("#divide");
    }
}

function getOperator(value, formula, input) {
    // stores symbol after input including operator symbol
    
    if(formula.phase == "num1") {
        formula.phase = "num2";
        formula.inputStr = addCommas(formula.num1) + value;
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
    const operatorBtn = getOperatorBtn(value);
    updateBtnColor(operatorBtn);
    return input;
}

function getEqual(value, formula, input) {
    // performs calculation after "=" input (or "Enter" key)
    if(value == "Enter") {
        // When user presses the Enter key
        value = "=";
    }
    if(input != "") {
        // if there has been a number input, set that number input into formula
        // operators and equals sign both reset input
        formula[formula.phase] = +input;
    }
    if(LIST_OPERATORS.includes(formula.inputStr.slice(formula.inputStr.length - 1))) {
        formula.num2 = formula.num1;
        formula.inputStr += addCommas(formula.num2);
    }
    if(formula.num2 == 0) {
        alert("You can't divide by 0!");
        resetFormula(formula, "num1", "");
    }
    else {
        formula.solution = doCalculation(formula.num1, formula.operator, formula.num2);
        if(!formula.inputStr.includes("=")) {
            formula.inputStr += value;
        }
    }
    resetBtnColor(document.querySelectorAll("button"));

    resetFormula(formula, "num1", formula.inputStr);
    updateScreenFormula(formula.inputStr);
    updateScreenValue(addCommas(formula[formula.phase]));
    input = "";
    return input;
}

function getClear(value, formula, input) {
    // resets formula after clicking "CLEAR" button
    resetFormula(formula, "num1", "");
    resetBtnColor(document.querySelectorAll("button"));
    input = "";
    updateScreenFormula(formula.inputStr);
    updateScreenValue(formula[formula.phase]);
    return input;
}

function getDelete(value, formula, input) {
    // deletes one input value after clicking "BACKSPACE" or pressing "Backspace" key
    console.log(input);
    if(input != "") {
        input = input.slice(0, input.length - 1);
        formula[formula.phase] = +input;

        formula.inputStr = formula.inputStr.slice(0, formula.inputStr.length - 1);
    } else {
        // case when after getEqual, input == ""
        input = "" + formula.num1;
        input = input.slice(0, input.length - 1);
        formula.num1 = +input;
        formula.inputStr = "";
        updateScreenFormula(formula.inputStr);
    }
    updateScreenValue(addCommas(formula[formula.phase]));
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
        updateScreenValue(addCommas(formula.inputStr));
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

function getBtnFromKey(currentKey) {
    const listBtns = document.querySelectorAll("button");
    let result = null;
    listBtns.forEach((element) => {
        if(element.textContent == currentKey) {
            result = element;
        }
    })
    return result;
}

function addKeys(formula, input) {
    // adds event handler when a keyboard press has happened
    addEventListener("keydown", (event) => {
        let currentKey = event.key;
        // change key values to match button values
        if(currentKey == "Enter") {
            currentKey = "=";
        } else if(currentKey == "Backspace") {
            currentKey = "BACKSPACE";
        } else if(currentKey == "Delete") {
            currentKey = "CLEAR";
        }
        let myElement = getBtnFromKey(currentKey);

        myElement.click();
        myElement.classList.add("active");
    })
    
    addEventListener("keyup", (event) => {
        let currentKey = event.key;
        let myElement = getBtnFromKey(currentKey);
        myElement.classList.remove("active");
    })
}


const LIST_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const LIST_OPERATORS = ["/", "*", "-", "+"];
const LIST_FUNCTIONS = ["CLEAR", "BACKSPACE"];
const operatorBtnBGColor = "grey";
const OPERATOR_BTN_CLICK_COL = "rgb(78, 75, 72)";
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
// - center calculator on screen
// - change better border buttons
// - allow resizing depending on viewport (check popular mobile displays)
// - change operator button text
// - resize font
// - change better font style

// Considerations:
// - Right now, user input cannot exceed 999,999,999
// - when entering decimal, on the decimal click, the screen does not show decimal. It only shows after a number input