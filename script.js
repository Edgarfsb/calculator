let displayValue = '0';
let firstNumber = null;
let secondNumber = null;
let firstOperator = null;
let secondOperator = null;
let waitSecondNumber = false;
let result = null;

const buttons = document.querySelectorAll('button');

function operate(x, y, operator) {
    if (operator === '+') {
        return x + y;
    } else if (operator === '-') {
        return x - y;
    } else if (operator === '*') {
        return x * y;
    } else if (operator === '/') {
        if (y === 0) {
            return 'nah';
        } else {
            return x / y;
        }
    }
}

function formatNumber(value) {
    //for infinity or NaN
    if (!Number.isFinite(value)) {
        return value.toString();
    }

    // Try to see if it fits on display
    const normal = Number(value.toPrecision(9)).toString();

    if (normal.length <= 9) {
        return normal;
    }

    //if it doesn't fit, try scientific notation
    const exponent = value.toExponential().split("e")[1];
    const exponentLength = exponent.length + 1;

    // chars for mantissa to fit on display
    const mantissaLength = 9 - exponentLength;
    const decimals = Math.max(0, mantissaLength - 2);

    return value.toExponential(decimals);
}

function inputDigit(digit) {
    if (waitSecondNumber) {
        displayValue = digit;
        waitSecondNumber = false;
        return;
    }

    if (displayValue === '0') {
        displayValue = digit;
    } else {
        displayValue += digit;
    }
}

function inputOperator(operator) {
    if (firstOperator != null && secondOperator === null) {
        // Handles input of second operator
        secondOperator = operator;
        secondNumber = displayValue;
        result = operate(Number(firstNumber), Number(secondNumber), firstOperator);
        displayValue = formatNumber(result).toString();
        firstNumber = displayValue;
        waitSecondNumber = true;
        result = null;
    } else if (firstOperator != null && secondOperator != null) {
        // For new secondOperator
        secondNumber = displayValue;
        result = operate(Number(firstNumber), Number(secondNumber), secondOperator);
        secondOperator = operator;
        displayValue = formatNumber(result).toString();
        firstNumber = displayValue;
        waitSecondNumber = true;
        result = null;
    } else { 
        // Handles first operator input
        firstOperator = operator;
        firstNumber = displayValue;
        waitSecondNumber = true;
    }
}

function inputEquals() {
    // Hitting equals doesn't display undefined before operate()
    if (firstOperator === null) {
        displayValue = displayValue;
    } else if (secondOperator != null) {
        // Handles final result
        secondNumber = displayValue;
        result = operate(Number(firstNumber), Number(secondNumber), secondOperator);

        if (result === 'nah') {
            displayValue = 'nah bro';
        } else {
            displayValue = formatNumber(result).toString();
            firstNumber = displayValue;
            secondNumber = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } else {
        // Handles first operation
        secondNumber = displayValue;
        result = operate(Number(firstNumber), Number(secondNumber), firstOperator);

        if (result === 'nah') {
            displayValue = 'nah bro';
        } else {
            displayValue = formatNumber(result).toString();
            firstNumber = displayValue;
            secondNumber = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
}

function updateDisplay() {
    const display = document.getElementById('display');

    display.innerText = displayValue;

    if (displayValue.length > 9) {
        display.innerText = displayValue.substring(0, 9);
    }
}

function clickButton() {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            if (buttons[i].classList.contains('digit')) {
                inputDigit(buttons[i].value); 
                updateDisplay();
            } else if (buttons[i].classList.contains('operator')) {
                inputOperator(buttons[i].value);
                updateDisplay();
            } else if (buttons[i].classList.contains('equals')) {
                inputEquals();
                updateDisplay();
            } else if (buttons[i].classList.contains('clear')) {
                clearAll();
                updateDisplay();
            } else if (buttons[i].classList.contains('backspace')) {
                inputBackspace();
                updateDisplay();
            } else if (buttons[i].classList.contains('decimal')) {
                inputDecimal(buttons[i].value);
                updateDisplay();
            }
        })
    }
}

function clearAll() {
    displayValue = '0';
    firstNumber = null;
    secondNumber = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

function inputBackspace() {
    if (displayValue === 'nah bro') {
        displayValue = '0';
    } else if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = '0';
    }
}

function inputDecimal(dot) {
    if (waitSecondNumber) {
        displayValue = '0.';
        waitSecondNumber = false;
        return;
    }

    if (!displayValue.includes('.')) {
        displayValue += dot;
    }
}

document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (!isNaN(key) || key === ".") {
        inputDigit(key);
        updateDisplay();
    }
    if (["+", "-", "*", "/"].includes(key)) {
        inputOperator(key);
        updateDisplay();
    }
    if (key === "Enter" || key === "=") {
        e.preventDefault;
        inputEquals();
        updateDisplay();
    }
    if (key === "Backspace") {
        inputBackspace();
        updateDisplay();
    }
    if (key === "Escape") {
        clearAll();
        updateDisplay();
    }
});

updateDisplay();
clickButton();
