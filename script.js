let displayValue = '0';
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;
const buttons = document.querySelectorAll('button');

const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const backspaceButton = document.querySelector(".backspace");
const decimalButton = document.querySelector(".decimal");


function operate(x, y, operator) {
    if(operator === '+') {
        return x + y;
    } else if(operator === '-') {
        return x - y;
    } else if(operator === '*') {
        return x * y;
    } else if(operator === '/') {
        if(y === 0) {
            return 'nah';
        } else {
            return x / y;
        }
    }
}

function updateDisplay() {
    const display = document.getElementById('display');

    display.innerText = displayValue;

    if(displayValue.length > 9) {
        display.innerText = displayValue.substring(0, 9);
    }
}

// MADE TO TEST, NEEDS INPUT DIGIT FUNCTION!! NEEDS TO TAKE INTO ACCOUNT OTHER THINGS OTHER THAN DIGIT AND THE FUNCTIONS THAT TAKE CARE OF THEM
// LIKE INPUT OPERATOR FUNCTION, EQUALS FUNCTION, CLEAR FUNCTION, BACKSPACE FUNCTION, DECIMAL FUNCTION
// MAYBE MISSING SOME OTHER THINGS I AM FORGETTING
function clickButton() {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            if (buttons[i].classList.contains('digit')) {
                displayValue = "123"; 
                updateDisplay();
            }
        })
    }
}

function updateDisplay() {
    display.textContent = displayValue;
}
clickButton();
