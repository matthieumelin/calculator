create();

export class Calculator {
    constructor(displayValue = "0", firstOperator = null, waitForSecondOperator = false, operator = null) {
        this.displayValue = displayValue;
        this.firstOperator = firstOperator;
        this.waitForSecondOperator = waitForSecondOperator;
        this.operator = operator;
    };

};

// create function
function create() {
    // create main div
    let calc = document.createElement("div");
    calc.className = "calc";

    // create text display
    let calcScreen = document.createElement("input");
    calcScreen.className = "calc-screen";
    calcScreen.value = "0";
    calcScreen.disabled = true;

    // create buttons div
    let calcButtons = document.createElement("div");
    calcButtons.className = "calc-buttons";
    calcButtons.addEventListener("click", clickListener);

    // create buttons
    let buttonsArray = ["+", "-", "*", "/", "7", "8", "9",
        "4", "5", "6", "1", "2", "3", "0", ".", "AC", "="
    ];

    buttonsArray.forEach(function(value, index) {
        let button = document.createElement("button");
        button.type = "button";
        button.value = value;
        button.innerHTML = value;

        // assign class name for specials operators
        switch (value) {
            case "+":
            case "-":
            case "*":
            case "/":
                button.className = "operator";
                break;
            case ".":
                button.className = "decimal";
                break;
            case "AC":
                button.className = "all-clear";
                break;
            case "=":
                button.className = "equal-sign operator";
                break;
            default:
                break;
        }

        // append button to buttons div
        calcButtons.appendChild(button);
    });

    // append screen to main div
    calc.appendChild(calcScreen);

    // append button to main div
    calc.appendChild(calcButtons);

    // append main div to body
    document.body.appendChild(calc);
}
////////////

// input digit function
function inputDigit(digit) {
    const { displayValue, waitForSecondOperator } = calculator;

    if (waitForSecondOperator === true) {
        calculator.displayValue = digit;
        calculator.waitForSecondOperator = false;
    } else {
        calculator.displayValue = displayValue === "0" ? digit : displayValue + digit;
    }
}

// input decimal function
function inputDecimal(dot) {
    if (calculator.waitForSecondOperator === true) {
        calculator.displayValue = "0.";
        calculator.waitForSecondOperator = false;
        return;
    }
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

// handle operator function
function handleOperator(nextOperator) {
    const { firstOperator, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitForSecondOperator) {
        this.operator = nextOperator;
        return;
    }

    if (firstOperator == null && !isNaN(inputValue)) {
        calculator.firstOperator = inputValue;
    } else if (operator) {
        const result = calculate(firstOperator, inputValue, operator);

        calculator.displayValue = String(result);
        calculator.firstOperator = result;
    }
    calculator.waitForSecondOperator = true;
    calculator.operator = nextOperator;
}

// calculate function
function calculate(firstOperator, secondOperand, operator) {
    if (operator === "+") {
        return firstOperator + secondOperand;
    } else if (operator === "-") {
        return firstOperator - secondOperand;
    } else if (operator === "*") {
        return firstOperator * secondOperand;
    } else if (operator === "/") {
        return firstOperator / secondOperand;
    }
    return secondOperand;
}

// reset function
function reset() {
    calculator.displayValue = '0';
    calculator.firstOperator = null;
    calculator.waitForSecondOperator = false;
    calculator.operator = null;
}

// update function
function update() {
    const display = document.querySelector('.calc-screen');
    display.value = displayValue;
}

function clickListener(event) {
    if (!event.target.matches("button")) {
        return;
    }

    switch (event.target) {
        case "+":
        case "-":
        case "*":
        case "/":
        case "=":
            handleOperator(event.target);
            break;
        case ".":
            inputDecimal(event.target);
            break;
        case "AC":
            reset();
            break;
        default:
            if (Number.isInteger(parseFloat(event.target))) {
                inputDigit(event.target);
            }
    }
    update();
}