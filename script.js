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

function setObjectValues()
{
    const calculatorDisplayContent = document.querySelector('#display').textContent;
    const operatorIndex = calculatorDisplayContent.search(/\d[-+*/]/) + 1;

    displayValues.firstOperand =
            Number(calculatorDisplayContent.substring(0, operatorIndex));

    displayValues.operator = calculatorDisplayContent.charAt(operatorIndex);

    displayValues.secondOperand =
            Number(calculatorDisplayContent.substring(operatorIndex + 1));
}


function resetObjectValues(result)
{
    delete displayValues.operator;
    delete displayValues.secondOperand
    displayValues.firstOperand = result;
    displayValues.hasBeenCalculated = true;
    enableOperatorButtons();
}

function operate()
{
    setObjectValues();

    let result = 0;
    let firstOperand = displayValues.firstOperand;
    let secondOperand = displayValues.secondOperand;
    let operator = displayValues.operator;

    console.log(firstOperand, operator, secondOperand);

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
    resetObjectValues(result);
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

    if (!(calculatorDisplay.textContent.match(/\d[-+*/]/)))
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
        disableOperatorButtons();
    }
}

function addFunctionality()
{
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (!(button.classList.contains('not-displayable')))
        {
            button.addEventListener('click', displayNumbers);
        }
    });

    const buttonEquals = document.querySelector('#button-equals');
    buttonEquals.addEventListener('click', operate);

    disableOperatorButtons();
}

addFunctionality();