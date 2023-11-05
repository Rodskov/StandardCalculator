class Calculator {
constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
}

clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
}

delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
}

appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
}

chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
    this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
}

compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
        case '+':
            computation = prev + current
            break
        case '-':
            computation = prev - current
            break
        case 'X':
            computation = prev * current
            break
        case '÷':
            computation = prev / current
            break
        default:
            return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
}

getBinary() {
    if (this.previousOperand !== '') {
        this.compute()
    }
    const decimalValue = parseFloat(this.currentOperand);
    if (!isNaN(decimalValue)) {
        this.currentOperand = decimalValue.toString(2);
    }
}

getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
        integerDisplay = ''
    } else {
        integerDisplay = integerDigits
    }
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
    } else {
        return integerDisplay
    }
}

updateFontSize() {
    const numberOfDigits = this.currentOperand.toString().replace(".", "").length;

    if (numberOfDigits <= 8) {
        this.currentOperandTextElement.style.fontSize = "2rem";
    } else if (numberOfDigits <= 12) {
        this.currentOperandTextElement.style.fontSize = "1.5rem";
    } else {
        this.currentOperandTextElement.style.fontSize = "1rem";
    }
}


updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    this.updateFontSize()
    if (this.operation != null) {
        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
        this.previousOperandTextElement.innerText = ''
    }
}
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const memoryClearButton = document.querySelector('[data-memory-clear]')
const memoryRecallButton = document.querySelector('[data-memory-recall]')
const memoryMinusButton = document.querySelector('[data-memory-minus]')
const memoryPlusButton = document.querySelector('[data-memory-plus]')
const binaryButton = document.querySelector('[data-binary]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

binaryButton.addEventListener('click', button => {
    calculator.getBinary()
    calculator.updateDisplay()
})