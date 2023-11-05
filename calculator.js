const display = document.querySelector(".display")
const buttons = document.querySelectorAll("button")
const specialChars = ["+", "-", "X", "÷", "="]
let output = "";

const calculate = (buttonValue) => {
    if(buttonValue === "=" && output !== "") {
        output = eval(output);
    } else if (buttonValue === "AC") {
        output = "";
    } else if (buttonValue === "DEL") {
        output = output.toString().slice(0, -1);
    } else if (buttonValue === "MC") {

    } else if (buttonValue === "MR") {
        
    } else if (buttonValue === "M-") {
        
    } else if (buttonValue === "M+") {
        
    } else if (buttonValue === "BIN") {
        if (output === "" && specialChars.includes(buttonValue)) return;
        output += buttonValue;
        output = output.toString(2);
    } else {
        if (output === "" && specialChars.includes(buttonValue)) return;
        output += buttonValue;
    }

    display.value = output;
}

buttons.forEach((button) => {
    button.addEventListener("click", (e) => calculate(e.target.dataset.value))
})