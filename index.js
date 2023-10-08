// script.js
document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    let currentInput = '';
    let currentOperator = '';
    let firstNumber = '';
    let resultDisplayed = false; // Flag to track if the result is displayed
    const calculationValues = []; // Array to store values and operators

    // Helper function to update the display
    function updateDisplay() {
        output.value = currentInput || '0';
    }

    // Helper function to handle operators
    function operate(operator, a, b) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                if (b === 0) {
                    return 'Error';
                }
                return a / b;
            default:
                return 'Error';
        }
    }

    // Event listeners for number buttons
    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', () => {
            if (resultDisplayed) {
                clear();
                resultDisplayed = false;
            }
            currentInput += button.textContent;
            updateDisplay();
        });
    });

    // Event listeners for operator buttons
    document.querySelectorAll('.operator').forEach(button => {
        button.addEventListener('click', () => {
            if (firstNumber && currentInput) {
                calculationValues.push(firstNumber);
                calculationValues.push(currentOperator);
            }
            firstNumber = currentInput;
            currentInput = '';
            currentOperator = button.textContent;
        });
    });

    /*Event listener for equals button
    document.getElementById('equals').addEventListener('click', () => {
        if (currentInput) {
            calculationValues.push(firstNumber);
            calculationValues.push(currentOperator);
            calculationValues.push(currentInput);
        }
        calculate();
    });*/// Event listener for equals button
document.getElementById('equals').addEventListener('click', () => {
    if (currentOperator && currentInput) {
        calculationValues.push(firstNumber);
        calculationValues.push(currentOperator);
        calculationValues.push(currentInput);
        calculate();
    } else {
        displayError("Invalid expression");
    }
});

// ... (other code) ...

// Function to display an error message
function displayError(message) {
    currentInput = message;
    firstNumber = '';
    currentOperator = '';
    resultDisplayed = true;
    calculationValues.length = 0; // Clear the array
    updateDisplay();
}


    // Event listener for clear button
    document.getElementById('clear').addEventListener('click', () => {
        clear();
    });

    // Event listener for backspace button
    document.getElementById('backspace').addEventListener('click', () => {
        if (resultDisplayed) {
            clear();
            resultDisplayed = false;
        } else {
            currentInput = currentInput.slice(0, -1);
            updateDisplay();
        }
    });

    // Event listener for decimal button
    document.getElementById('decimal').addEventListener('click', () => {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay();
        }
    });

    // Calculate function
    function calculate() {
        if (calculationValues.length < 3) {
            clear();
            return;
        }
        
        let result = calculationValues[0];
        for (let i = 1; i < calculationValues.length; i += 2) {
            result = operate(calculationValues[i], result, calculationValues[i + 1]);
        }
        
        currentInput = result.toString();
        firstNumber = '';
        currentOperator = '';
        resultDisplayed = true;
        calculationValues.length = 0; // Clear the array
        updateDisplay();
    }

    // Clear function
    function clear() {
        currentInput = '';
        currentOperator = '';
        firstNumber = '';
        resultDisplayed = false;
        calculationValues.length = 0; // Clear the array
        updateDisplay();
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        const key = e.key;
        if (/[0-9]/.test(key)) {
            // Handle numeric keys
            if (resultDisplayed) {
                clear();
                resultDisplayed = false;
            }
            currentInput += key;
            updateDisplay();
        } else if (['+', '-', '*', '/'].includes(key)) {
            // Handle operator keys
            if (firstNumber && currentInput) {
                calculationValues.push(firstNumber);
                calculationValues.push(currentOperator);
            }
            firstNumber = currentInput;
            currentInput = '';
            currentOperator = key;
        } else if (key === '=') {
            // Handle equals key
            if (currentInput) {
                calculationValues.push(firstNumber);
                calculationValues.push(currentOperator);
                calculationValues.push(currentInput);
            }
            calculate();
        } else if (key === 'Enter') {
            // Handle Enter key as equals
            if (currentInput) {
                calculationValues.push(firstNumber);
                calculationValues.push(currentOperator);
                calculationValues.push(currentInput);
            }
            calculate();
        } else if (key === 'Backspace') {
            // Handle Backspace key
            if (resultDisplayed) {
                clear();
                resultDisplayed = false;
            } else {
                currentInput = currentInput.slice(0, -1);
                updateDisplay();
            }
        } else if (key === '.') {
            // Handle decimal point key
            if (!currentInput.includes('.')) {
                currentInput += '.';
                updateDisplay();
            }
        } else if (key === 'Escape') {
            // Handle Escape key as clear
            clear();
        }
    });

    // Initial display
    updateDisplay();
});
