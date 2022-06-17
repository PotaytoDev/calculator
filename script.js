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

function displayResult(result = 0)
{
    const calculatorDisplay = document.querySelector('#display');

    if (result.toString().match(/\d\.\d/))
    {
        result = Number(result.toPrecision(5));
    }

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

function deleteObjectValues()
{
    delete displayValues.firstOperand;
    delete displayValues.operator;
    delete displayValues.secondOperand;
    delete displayValues.hasBeenCalculated;
}

function resetCalculatorAfterResult(result)
{
    deleteObjectValues();
    displayValues.firstOperand = result;
    displayValues.hasBeenCalculated = true;
    enableOperatorButtons();
    document.querySelector('#button-equals').disabled = true;
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
    resetCalculatorAfterResult(result);
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

    if (event.target.textContent.match(/\d/) && displayValues.hasBeenCalculated)
    {
        clearCalculator();
    }

    if (calculatorDisplay.textContent.length >= 6) return;

    const buttonEquals = document.querySelector('#button-equals');
    const currentValueIsOperator = event.target.textContent.match(/[-+*/]/);

    enableOperatorButtons();

    if (calculatorDisplay.textContent.match(/\d[-+*/]\d/) && currentValueIsOperator)
    {
        operate();
    }

    if (calculatorDisplay.textContent === '0')
    {
        if (event.target.textContent === '0') return;

        if (!(currentValueIsOperator))
        {
            calculatorDisplay.textContent = event.target.textContent;
        }
        else
        {
            calculatorDisplay.textContent += event.target.textContent;
        }
    }
    else
    {
        calculatorDisplay.textContent += event.target.textContent;
    }

    if (event.target.textContent.match(/[-+*/]/))
    {
        disableOperatorButtons();
        displayValues.hasBeenCalculated = false;
    }

    if (calculatorDisplay.textContent.match(/\d[-+*/]\d/))
    {
        buttonEquals.disabled = false;
    }
}

function clearCalculator()
{
    document.querySelector('#display').textContent = '';
    document.querySelector('#button-equals').disabled = true;
    deleteObjectValues();
    disableOperatorButtons();
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
    buttonEquals.disabled = true;

    const buttonClear = document.querySelector('#button-clear');
    buttonClear.addEventListener('click', clearCalculator);

    disableOperatorButtons();
}

addFunctionality();