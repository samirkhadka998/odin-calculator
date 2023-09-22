
const inputDiv = document.querySelector('.inputs');

const info = document.querySelector('.info');

const result = document.querySelector('#result');
let screenInputs = [];



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
            screenInputs = screenInputs.length >= 1 ? screenInputs.substring(0 , screenInputs.length -1) : '';
            setInfoScreen(screenInputs);
            break;

        default:
            screenInputs.push(e.target.textContent);
            setInfoScreen(screenInputs);
            break;
    }

}

function setResultScreen(message) {
    result.textContent = message;
    
}

function setInfoScreen(message){
    info.textContent = convertToString(message);
};

function convertToString(arr){
    return screenInputs.toString().replaceAll(",","");
}

function GetOperatorAndNumbers() {
    if(convertToString(screenInputs).includes("/0")){
        return setResultScreen("Invalid Operation");
    }

    if(Number(screenInputs)){
        return setResultScreen(screenInputs)
    }
    let result = undefined;
    let increment = 2;
    let start = 0;
    let end = 3;
    let extractedscreenInputs = screenInputs.splice(start,end);
    while (isInputValid(extractedscreenInputs)) {
        
        let counterNumber = result ? result + extractedscreenInputs.substring(1,end) : extractedscreenInputs;
        result = returnCalculatedResultForFurtherProcessing(counterNumber);
        extractedscreenInputs = screenInputs.splice(start,end,result);
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
    info.textContent = '';
    screenInputs = '';
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