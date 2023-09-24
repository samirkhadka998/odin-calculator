
const inputDiv = document.querySelector('.inputs');

const info = document.querySelector('.info');

const result = document.querySelector('#result');
let screenInputs = [];

let lastActionEqual = false;



var operatordivs = document.querySelectorAll('.subinputs div');

Array.from(operatordivs).forEach(d => {
    d.addEventListener('click', logInfo);
})

function logInfo(e) {
    if(lastActionEqual){
        clear();
        lastActionEqual = false;
    }
    switch (e.target.textContent) {
        case "=":
            lastActionEqual = true;
            GetOperatorAndNumbers();
            break;

        case "C":
            clear();
            break;

        case "CE":
            if(screenInputs.length >= 1 ){
                let lastItem = screenInputs.pop();

                if(Number(lastItem) && lastItem.toString().length > 1){
                    lastItem = lastItem[lastItem.length - 1];
                    screenInputs.push(lastItem);
                }
                else if(screenInputs.length <= 0){
                    screenInputs = [];
                }
                
            }
            setInfoScreen(screenInputs);
            break;

        default:
            if (screenInputs.length > 0 && Number(screenInputs[screenInputs.length - 1]) && Number(e.target.textContent)) {
                screenInputs[screenInputs.length - 1] = screenInputs[screenInputs.length - 1] + e.target.textContent;
            }
            else {
                screenInputs.push(e.target.textContent);
            }
            setInfoScreen(screenInputs);
            break;
    }

}

function setResultScreen(message) {
    result.textContent = message;

}

function setInfoScreen(message) {
    info.textContent = convertToString(message);
};

function convertToString(arr) {
    return screenInputs.toString().replaceAll(",", "");
}

function GetOperatorAndNumbers() {
    if (convertToString(screenInputs).includes("/0")) {
        return setResultScreen("Invalid Operation");
    }

    if (Number(convertToString(screenInputs))) {
        return setResultScreen(convertToString(screenInputs))
    }
    let result = undefined;
    let start = 0;
    let end = 3;
    let extractedscreenInputs = screenInputs.splice(start, end);
    while (isInputValid(extractedscreenInputs)) {

        //let calculationReady = result ? result + extractedscreenInputs.substring(1, end) : extractedscreenInputs;
        result = operateFunction(extractedscreenInputs[1], extractedscreenInputs[0], extractedscreenInputs[2]);
        result = result % 1 != 0 ? result.toFixed(5) : result;
        screenInputs.unshift(result);
        extractedscreenInputs = screenInputs.splice(start, end);
    }

    setResultScreen(result);
    screenInputs.unshift(result);

}

function isInputValid(params) {
    let symbols = ['+', '-', '/', '*'];
    if (symbols.includes(params[1])) {
        if (Number(params[0]) && Number(params[2]) || Number(params[0]) == 0 && Number(params[2]) == 0) {
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
    screenInputs = [];
}

