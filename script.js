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

function displayResult(result)
{
    const calculatorDisplay = document.querySelector('#display');
    calculatorDisplay.textContent = result;
}

function operate()
{
    let result = 0;
    let firstOperand = displayValues.firstOperand;
    let secondOperand = displayValues.secondOperand;
    let operator = displayValues.operator;

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

    displayResult(result);

    delete displayValues.operator;
    delete displayValues.secondOperand
    displayValues.firstOperand = result;
    enableOperatorButtons();
}

function disableOperatorButtons()
{
    const operatorButtons = document.querySelectorAll('.operator-button');
    operatorButtons.forEach(operatorButton => operatorButton.disabled = true);
}

function enableOperatorButtons()
{
    const operatorButtons = document.querySelectorAll('.operator-button');
    operatorButtons.forEach(operatorButton => operatorButton.disabled = false);
}

function displayNumbers(event)
{
    const calculatorDisplay = document.querySelector('#display');

    if (calculatorDisplay.textContent.length >= 6) return;

    if (event.target.textContent.match(/[0-9]/)  && !("operator" in displayValues))
    {
        enableOperatorButtons();
    }

    if (calculatorDisplay.textContent === '0')
    {
        calculatorDisplay.textContent = event.target.textContent;
    }
    else
    {
        calculatorDisplay.textContent += event.target.textContent;
    }

    if (event.target.textContent.match(/[-+*/]/))
    {
        displayValues.operator = event.target.textContent;
        disableOperatorButtons();
    }

    if (!("operator" in displayValues))
    {
        // Store 'display value' in object for use in later calculations
        displayValues.firstOperand = Number(calculatorDisplay.textContent);
    }
    else if (("operator" in displayValues) && event.target.textContent.match(/[0-9]/))
    {
        const operatorIndex = calculatorDisplay.textContent.search(/\d[-+*/]/) + 2;
        displayValues.secondOperand = Number(calculatorDisplay.textContent.substring(operatorIndex));
    }
}

function addFunctionality()
{
    const numberButtons = document.querySelectorAll('button');
    numberButtons.forEach(numberButton => {
        numberButton.addEventListener('click', displayNumbers)
    });

    const buttonEquals = document.querySelector('#button-equals');
    buttonEquals.addEventListener('click', operate);

    disableOperatorButtons();
}

addFunctionality();