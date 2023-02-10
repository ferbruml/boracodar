class Calculator {
  constructor(last_operation, result) {
    this.last_operation = last_operation
    this.result = result

    this.clear() // reset the inputs
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  updateDisplay() {
    this.result.innerText = this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.last_operation.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } 
    else {
      this.last_operation.innerText = ''
    }
  }

  appendNumber(number) {
    if (number === ',' && this.currentOperand.includes(',')) {
      return
    }

    if (this.previousOperand === '') {
      this.clear()
      this.previousOperand = ' '
    }

    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') {
      return
    }

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

    if (this.operation !== '%' && (isNaN(prev) || isNaN(current))) {
      return
    }

    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      case '%':
        computation = prev / 100
        break
      default:
        return
    }

    this.clear()
    
    this.currentOperand = computation
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    let decimalDigits = stringNumber.split('.')[1]

    if (!decimalDigits) { // if null or undefined, try split an ,
      decimalDigits = stringNumber.split(',')[1]
    }

    let integerDisplay

    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } 
    else {
      integerDisplay = integerDigits.toLocaleString('pt-BR', { maximumFractionDigits: 0 })
    }

    if (decimalDigits != null) {
      return `${integerDisplay},${decimalDigits}`
    } 
    else {
      return integerDisplay
    }
  }

}

const numbers = document.querySelectorAll('[data-number]')

const operator_minus = document.querySelector('[data-operator-minus]')
const operator_plus = document.querySelector('[data-operator-plus]')
const operator_divide = document.querySelector('[data-operator-divide]')
const operator_multiply = document.querySelector('[data-operator-multiply]')
const operator_percent = document.querySelector('[data-operator-percent]')

const ce = document.querySelector('[data-ce]')
const clear = document.querySelector('[data-clear]')
const equals_result = document.querySelector('[data-equals]')

// display output
const last_operation = document.querySelector('[data-last-operation]')
const result = document.querySelector('[data-result]')

const calculator = new Calculator(last_operation, result)

numbers.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operator_plus.addEventListener('click', () => {
  calculator.chooseOperation('+')
  calculator.updateDisplay()
})

operator_minus.addEventListener('click', () => {
  calculator.chooseOperation('-')
  calculator.updateDisplay()
})

operator_divide.addEventListener('click', () => {
  calculator.chooseOperation('\\')
  calculator.updateDisplay()
})

operator_multiply.addEventListener('click', () => {
  calculator.chooseOperation('*')
  calculator.updateDisplay()
})

operator_percent.addEventListener('click', () => {
  calculator.chooseOperation('%')
  calculator.compute()
  calculator.updateDisplay()
})

equals_result.addEventListener('click', () => {
  calculator.compute()
  calculator.updateDisplay()
})

ce.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})

clear.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})