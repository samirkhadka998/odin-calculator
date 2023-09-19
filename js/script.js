
const inputDiv = document.querySelector('.inputs');

const screen = document.querySelector('.screen');

let screenText = '';


var operatordivs = document.querySelectorAll('.subinputs div');

Array.from(operatordivs).forEach(d => {
    d.addEventListener('click', logInfo)
})

function logInfo(e){
    screenText += e.target.innerText + ' ';
    screen.innerText = screenText;
    console.log(e.target.innerText)

}
