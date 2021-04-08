class Calculator {
  constructor(smallDisplayTextElement, bigDisplayTextElement) {
    this.smallDisplayTextElement = smallDisplayTextElement;
    this.bigDisplayTextElement = bigDisplayTextElement;
    this.clear();
  }

  clear() {
    this.smalldisplay = "";
    this.bigdisplay = "";
    this.operation = undefined;
    console.log(this.smalldisplay)
  }

  deleteNumbers() {
    this.bigdisplay = this.bigdisplay.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.bigdisplay.includes(".")) return;
    this.bigdisplay = this.bigdisplay.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.bigdisplay === "") return;
    if (this.smalldisplay !== "") {
      this.compute();
    }
    this.operation = operation;
    this.smalldisplay = this.bigdisplay;
    this.bigdisplay = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.smalldisplay);
    const current = parseFloat(this.bigdisplay);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "÷":
        computation = prev / current;
        break;
      case "×":
        computation = prev * current;
        break;
      default:
        return;
    }
    this.bigdisplay = computation;
    this.operation = undefined;
    this.smalldisplay = "";
  }

  updateDisplay() {
    this.bigDisplayTextElement.innerText = this.bigdisplay;
    if (this.operation != null) {
      this.smallDisplayTextElement.innerText = `${this.smalldisplay} ${this.operation}`;
    }
  }

  updateMemo() {
    this.memo.innerText = this.memo;
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const deleteButton = document.querySelector("[data-delete]");
const allClear = document.querySelector("[data-all-clear]");
const equalsButton = document.querySelector("[data-equals]");
const smallDisplayTextElement = document.querySelector("[data-small-display]");
const bigDisplayTextElement = document.querySelector("[data-big-display]");
const memo = document.querySelector("[data-memo]");

const calculator = new Calculator(
  smallDisplayTextElement,
  bigDisplayTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

allClear.addEventListener("click", () => {
  calculator.updateDisplay();
  calculator.clear();
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
  calculator.updateMemo();
});

deleteButton.addEventListener("click", () => {
  calculator.deleteNumbers();
  calculator.updateDisplay();
});
