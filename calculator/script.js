const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = '';
let firstValue = '';
let secondValue = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (!isNaN(value)) {
      // If it's a number
      currentInput += value;
      display.textContent = currentInput;
    } else if (value === '+' || value === '-') {
      // Operator clicked
      operator = value;
      firstValue = currentInput;
      currentInput = '';
    } else if (value === '=') {
      // Equal clicked
      secondValue = currentInput;

      let result = 0;
      if (operator === '+') {
        result = parseInt(firstValue) + parseInt(secondValue);
      } else if (operator === '-') {
        result = parseInt(firstValue) - parseInt(secondValue);
      }

      display.textContent = result;
      // Reset for next calculation
      currentInput = '';
      operator = '';
      firstValue = '';
      secondValue = '';
    }
  });
});
