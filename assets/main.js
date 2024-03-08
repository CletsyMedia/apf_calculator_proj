let btnContainer = document.querySelector('.btns');
let btns = btnContainer.querySelectorAll('button');
let display = document.getElementById('display');
let isCalculatorOn = true; // Flag to track the calculator state

function toggleCalculator() {
isCalculatorOn = !isCalculatorOn;
  if (isCalculatorOn) {
    // If calculator is turned on, clear the display
    display.value = "";
    document.getElementById('off').textContent = 'Off';
  } else {
    // If calculator is turned off, set display text to "Off"
    display.value = 'Off';
    document.getElementById('off').textContent = 'On';
  }
}

// Add event listener to the "Off" button to toggle calculator on/off
document.getElementById('off').addEventListener('click', toggleCalculator);

// Loop through each button and attach click event listeners
btns.forEach(btn => {
  btn.addEventListener('click', function() {
    if (!isCalculatorOn) return; // Prevent button clicks when calculator is off
    if (display.value === 'Off') display.value = '';

    if (this.innerHTML === "=") {
      // Evaluate the expression and set the result to the display
      display.value = eval(display.value);
    } else if (this.id === "clear") {
      // Clear the display
      display.value = "";
    } else if (this.id === "bs") {
      // Remove the last character from the display
      display.value = display.value.slice(0, -1);
    } else if (this.innerHTML === "." && display.value.includes(".")) {
      // Do nothing if there's already a decimal point
      return;
    } else if (display.value.length >= 16) {
      // Do nothing if maximum input length is reached
      return;
    } else {
      // Append the clicked button's value to the display
      display.value += this.innerHTML;
    }
  });
});

// Add event listener to the display input field to restrict input to numbers
display.addEventListener('input', function() {
  // Remove any non-numeric characters from the input value
  this.value = this.value.replace(/\D/g, '');
});

