
const inputDiv = document.querySelector('.inputs');

const screen = document.querySelector('.screen');

const result = document.querySelector('#result');
let screenText = '';



var operatordivs = document.querySelectorAll('.subinputs div');

Array.from(operatordivs).forEach(d => {
    d.addEventListener('click', logInfo);
})

function logInfo(e){
    if(e.target.textContent == "="){
        screenText = screenText.trim();
        let arr = [];
        if(screenText.includes("+")){
           arr =  screenText.split("+");
           arr.unshift("+");
        }
        else if(screenText.includes("-")){
            arr =  screenText.split("-");
           arr.unshift("-");

         }
         else if(screenText.includes("/")){
            arr =  screenText.split("/");
           arr.unshift("/");

         }
         else if(screenText.includes("*")){
            arr =  screenText.split("*");
           arr.unshift("*");

         }

        result.textContent = operateFunction(arr[0],arr[1], arr[2] )
    }

    else{

        screenText += e.target.textContent;
        screen.textContent = screenText;
        console.log(e.target.textContent);
    }




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