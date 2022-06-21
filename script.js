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
    if (secondOperand === 0)
    {
        displayValues.divideByZeroMessage = "Nope";
        return displayValues.divideByZeroMessage;
    }
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

    if (typeof result === 'number')
    {
        displayValues.firstOperand = result;
        displayValues.hasBeenCalculated = true;
        enableOperatorButtons();
    }
    else
    {
        disableOperatorButtons();
    }
    document.querySelector('#button-equals').disabled = true;
}

function operate()
{
    setObjectValues();

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
    let operatorHasBeenUsed = false;

    if (event.target.textContent.match(/\d/) && displayValues.hasBeenCalculated)
    {
        clearCalculator();
    }

    if (calculatorDisplay.textContent.length >= 10) return;

    const buttonEquals = document.querySelector('#button-equals');
    const currentValueIsOperator = event.target.textContent.match(/[-+*/]/);

    if (currentValueIsOperator)
    {
        operatorHasBeenUsed = true;
    }

    if (operatorHasBeenUsed)
    {
        document.querySelector('#button-decimal').disabled = false;
    }

    enableOperatorButtons();

    if (event.target.textContent === '.')
    {
        document.querySelector('#button-decimal').disabled = true;
        disableOperatorButtons();
    }

    if (calculatorDisplay.textContent.match(/\d[-+*/]\.?\d/) && currentValueIsOperator)
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
    else if (calculatorDisplay.textContent === displayValues.divideByZeroMessage)
    {
        if (!(currentValueIsOperator))
        {
            calculatorDisplay.textContent = event.target.textContent;
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

    if (calculatorDisplay.textContent.match(/\d[-+*/]\.?\d/))
    {
        buttonEquals.disabled = false;
    }
}

function clearCalculator()
{
    document.querySelector('#display').textContent = '';
    document.querySelector('#button-equals').disabled = true;
    document.querySelector('#button-decimal').disabled = false;
    deleteObjectValues();
    disableOperatorButtons();
}

function deleteCharacter()
{
    const calculatorDisplay = document.querySelector('#display');

    if (calculatorDisplay.textContent === '') return;

    const lastCharacterIndex = calculatorDisplay.textContent.length - 1;
    const deletedCharacter = calculatorDisplay.textContent.charAt(lastCharacterIndex);

    calculatorDisplay.textContent = 
            calculatorDisplay.textContent.substring(0, lastCharacterIndex);

    document.querySelector('#button-equals').disabled = true;
    disableOperatorButtons();

    // This array shows how many decimal points are on display, which will help
    // to determine when to disable the decimal point (to not allow more than
    // two at once)
    const decimalPointsArray = [...calculatorDisplay.textContent.matchAll(/\./g)];

    const operatorOnDisplay = calculatorDisplay.textContent.match(/[/*+-]/);

    if (deletedCharacter === '.')
    {
        document.querySelector('#button-decimal').disabled = false;
    }

    // Only allow one decimal point to be used per operand
    if ((!(operatorOnDisplay) && decimalPointsArray.length === 1) ||
                (operatorOnDisplay && decimalPointsArray.length === 2))
    {
        document.querySelector('#button-decimal').disabled = true;
    }

    if (deletedCharacter.match(/[-+*/]/))
    {
        enableOperatorButtons();
    }
    
    if (calculatorDisplay.textContent.match(/\d[-+*/]\.?\d/))
    {
        document.querySelector('#button-equals').disabled = false;
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
    buttonEquals.disabled = true;

    const buttonClear = document.querySelector('#button-clear');
    buttonClear.addEventListener('click', clearCalculator);

    const buttonBackspace = document.querySelector('#button-backspace');
    buttonBackspace.addEventListener('click', deleteCharacter);

    disableOperatorButtons();
}

addFunctionality();