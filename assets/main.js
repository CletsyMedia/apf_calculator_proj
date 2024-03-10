let btnContainer = document.querySelector('.btns');
let btns = btnContainer.querySelectorAll('button');
let display = document.getElementById('display');
let isCalculatorOn = true; // Flag to track the calculator state
let isEqualPressed = false; // Flag to track whether "=" button has been pressed

function toggleCalculator() {
  isCalculatorOn = !isCalculatorOn;
  display.value = ""; // Always clear the display when toggling
  if (isCalculatorOn) {
    // If calculator is turned on, remove the dimmed class and show all buttons
    display.classList.remove("dimmed");
    document.getElementById('off').textContent = 'Off';
    btns.forEach(btn => btn.classList.remove("hidden"));
  } else {
    // If calculator is turned off, add the dimmed class and hide all buttons except the toggle button
    display.classList.add("dimmed");
    document.getElementById('off').textContent = 'On';
    btns.forEach(btn => {
      if (btn.id !== "off") btn.classList.add("hidden");
    });
  }
}

// Add event listener to the "Off" button to toggle calculator on/off
document.getElementById('off').addEventListener('click', toggleCalculator);

// Loop through each button and attach click event listeners
btns.forEach(btn => {
  btn.addEventListener('click', function() {
    if (!isCalculatorOn) return; // Prevent button clicks when calculator is off
    if (display.value === 'Off') display.value = '';

    if (isEqualPressed) {
      // Clear the display if "=" button has been pressed
      display.value = "";
      isEqualPressed = false; // Reset the flag
    }

    if (this.innerHTML === "=") {
      // Evaluate the expression and set the result to the display
      display.value = eval(display.value);
      isEqualPressed = true; // Set the flag since "=" button has been pressed
    } else if (this.id === "clear") {
      // Clear the display
      display.value = "";
    } else if (this.id === "bs") {
      // Remove the last character from the display
      display.value = display.value.slice(0, -1);
    } else if (this.innerHTML === "." && display.value === "") {
      // Append "0." if the display is empty and the decimal point is clicked
      display.value = "0.";
    } else if (/[0-9.]$/.test(display.value) && this.innerHTML === ".") {
      // Check if the last character is a number or a decimal point before appending another decimal point
      let lastNumberIndex = display.value.search(/[\d.]+$/);
      let lastNumber = display.value.substring(lastNumberIndex);
      if (lastNumber.includes(".")) return; // Do nothing if there's already a decimal point in the current number
      display.value += this.innerHTML;
    } else if (/[+\-*/]$/.test(display.value) && this.innerHTML === ".") {
      // Append "0." if the last character is an operator
      display.value += "0.";
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

