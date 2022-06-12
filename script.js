const displayValues = {};

function add(firstOperand, secondOperand)
{
    return firstOperand + secondOperand;
}

function subtract(firstOperand, secondOperand)
{
    return firstOperand - secondOperand;
}

function multiply(firstOperand, secondOperand)
{
    return firstOperand * secondOperand;
}

function divide(firstOperand, secondOperand)
{
    return firstOperand / secondOperand;
}

function operate(operator, firstOperand, secondOperand)
{
    let result = 0;

    switch (operator)
    {
        case '+':
            result = add(firstOperand, secondOperand);
            break;
        case '-':
            result = subtract(firstOperand, secondOperand);
            break;
        case '*':
            result = multiply(firstOperand, secondOperand);
            break;
        case '/':
            result = divide(firstOperand, secondOperand);
            break;
        default:
            console.log("Something went wrong!");
            break;
    }

    return result;
}

function displayNumbers(event)
{
    const calculatorDisplay = document.querySelector('#display');

    if (calculatorDisplay.textContent.length >= 6) return;

    calculatorDisplay.textContent += event.target.textContent;

    // Store 'display value' in object for use in later calculations
    displayValues.firstOperand = calculatorDisplay.textContent;
}

function addFunctionality()
{
    const numberButtons = document.querySelectorAll('.number-button');
    numberButtons.forEach(numberButton => {
        numberButton.addEventListener('click', displayNumbers)
    });
}

addFunctionality();