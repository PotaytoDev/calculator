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