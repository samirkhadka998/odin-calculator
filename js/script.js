
const inputDiv = document.querySelector('.inputs');

const screen = document.querySelector('.screen');

const result = document.querySelector('#result');
let screenText = '';



var operatordivs = document.querySelectorAll('.subinputs div');

Array.from(operatordivs).forEach(d => {
    d.addEventListener('click', logInfo);
})

function logInfo(e) {
    switch (e.target.textContent) {
        case "=":
            GetOperatorAndNumbers();
            break;

        case "C":
            clear();
        break;

        case "CE":
            screenText = screenText.length >= 1 ? screenText.substring(0 , screenText.length -1) : '';
            setInfoScreen(screenText);
            break;

        default:
            screenText += e.target.textContent;
            setInfoScreen(screenText);
            break;
    }

}

function setResultScreen(message) {
    result.textContent = message;
    
}

function setInfoScreen(message){
    screen.textContent = screenText;
};

function GetOperatorAndNumbers() {
    screenText = screenText.trim();
    if(screenText.includes("/0")){
        return setResultScreen("Invalid Operation");
    }

    if(Number(screenText)){
        return setResultScreen(screenText)
    }
    let result = undefined;
    let increment = 2;
    let start = 0;
    let end = 3;
    let extractedScreenText = screenText.substring(start,end);
    while (isInputValid(extractedScreenText)) {
        
        let finalCalculationNumber = result ? result + extractedScreenText.substring(1,end) : extractedScreenText;
        result = returnCalculatedResultForFurtherProcessing(finalCalculationNumber);
        extractedScreenText = screenText.substring(start + increment, end + increment );
        increment = increment +  2;
    }

    setResultScreen(result);    

}

function isInputValid(params) {
    let symbols = ['+','-','/','*'];
    if(symbols.includes(params[1])){
        if (Number(params[0]) && Number(params[2]) || Number(params[0])== 0 && Number(params[2])==0) {
            return true;
        }
        return false;
    }

    return false;
}


function operateFunction(operator, param, param1) {
    param = Number(param);
    param1 = Number(param1);
    switch (operator) {
        case "+":
            return param + param1;
            break;

        case "-":
            return param - param1;
            break;

        case "*":
            return param * param1;
            break;

        case "/":
            return param / param1;
            break;

        default:
            break;
    }
}

function clear() {
    result.textContent = '0';
    screen.textContent = '';
    screenText = '';
}

function returnCalculatedResultForFurtherProcessing(input){
    let arr = [];
    let result = 0;
    if (input.includes("+")) {
        arr = input.split("+");
        arr.unshift("+");
    }
    else if (input.includes("-")) {
        arr = input.split("-");
        arr.unshift("-");

    }
    else if (input.includes("/")) {
        arr = input.split("/");
        arr.unshift("/");

    }
    else if (input.includes("*")) {
        arr = input.split("*");
        arr.unshift("*");

    }

    if(arr.length == 3){
        result = operateFunction(arr[0], arr[1], arr[2]);
        //If num is decimal then 5 place decimal 
        result = result % 1 != 0 ? result.toFixed(5) : result;
    }
    return result;
}