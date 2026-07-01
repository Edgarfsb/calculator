let displayValue = '0';
let firstNumber = null;
let secondNumber = null;
let firstOperator = null;
let secondOperator = null;
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

function inputDigit(digit) {
    if (firstOperator === null) {
        if (displayValue === '0' || displayValue === 0) { // First digit input
            displayValue = digit;
        } else if (displayValue === firstNumber) { // For a new operation after Equals is pressed
            displayValue = digit;
        } else {                                // Input more digits after the first one
            displayValue += digit;
        }
    } else { 
        if (displayValue === firstNumber) { // After the first operator is dialed 
            displayValue = digit;
        } else {
            displayValue += digit;
        }
    }
}

function inputOperator(operator) {
    if (firstOperator != null && secondOperator === null) {
        // Handles input of second operator
        secondOperator = operator;
        secondNumber = displayValue;
        result = operate(Number(firstNumber), Number(secondNumber), firstOperator);
        displayValue = Math.round(result).toString();
        firstNumber = displayValue;
        result = null;
    } else if (firstOperator != null && secondOperator != null) {
        // For new secondOperator
        secondNumber = displayValue;
        result = operate(Number(firstNumber), Number(secondNumber), secondOperator);
        secondOperator = operator;
        displayValue = Math.round(result).toString();
        firstNumber = displayValue;
        result = null;
    } else { 
        // Handles first operator input
        firstOperator = operator;
        firstNumber = displayValue;
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
            displayValue = Math.round(result).toString();
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
            displayValue = Math.round(result).toString();
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

// MISSING BUTTONS
//BACKSPACE
//DECIMAL
//CLEAR
//MAYBE ADD A FUNCTION THAT ROUNDS USING SCIENTIFIC NOTATION FOR NUMBERS TOO BIG OR TOO SMALL
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
            }
        })
    }
}

updateDisplay();
clickButton();
