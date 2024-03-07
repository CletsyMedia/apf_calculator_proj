      let btnContainer = document.querySelector('.btns');
      let btns = btnContainer.querySelectorAll('button');
      let display = document.getElementById('display');
      let lastButtonClicked = null;// store last button clicked
      let isCalculatorOn = true; // Flag to track the calculator state

      // Only add the event listener to the off button once
      document.getElementById('off').addEventListener('click', toggleCalculator);

      // Function to toggle the calculator on and off
      function toggleCalculator() {
        isCalculatorOn = !isCalculatorOn;
        // Update button text to indicate calculator state
        document.getElementById('off').innerHTML = isCalculatorOn ? "Off" : "On";
        // Enable/disable all buttons based on calculator state
        btns.forEach(button => {
          button.disabled = !isCalculatorOn;
        });
        // Clear the display when turning off the calculator
        if (!isCalculatorOn) {
          display.value = "";
        }
      }

// Loop through each button and attach click event listeners
btns.forEach(btn => {
  btn.addEventListener('click', function() {
    if (!isCalculatorOn) return; // Prevent button clicks when calculator is off
    if (this.innerHTML === "=") {
      // Evaluate the expression and set the result to the display
      display.value = eval(display.value);
      lastButtonClicked = "="; // Record the last button clicked as "="
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
      // Clear the display if user starts inputting after getting the result
      if (lastButtonClicked === "=") {
        display.value = "";
      }
      display.value += this.innerHTML;
    }
    
    // Record the last button clicked
    lastButtonClicked = this.innerHTML;
  });
});

      // Add event listener to the display input field to restrict input to numbers
      display.addEventListener('input', function() {
        // Remove any non-numeric characters from the input value
        this.value = this.value.replace(/\D/g, '');
      });