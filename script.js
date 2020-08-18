// Select DOM elements
const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");
const formInputs = document
  .getElementById("countdownForm")
  .getElementsByTagName("input");
const formButton = document
  .getElementById("countdownForm")
  .getElementsByTagName("button");

const countdownTimer = document.getElementById("countdown-timer");
const countdownElTitle = document.getElementById("countdown-title");
const countdownReset = document.getElementById("countdown-reset");
const countdownTUnits = document
  .getElementById("countdown-tunits")
  .getElementsByTagName("span");

const completeTimer = document.getElementById("complete-timer");
const completeInfoEl = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

// Get form data
let countdownTitle = "";
let countdownDate = "";
let countdownValue = new Date();
let countdownActive;

// Set time values
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Get date today
const today = new Date().toISOString();
const dateToday = today.split("T")[0];

// Save countdown for localStorage
let savedCountdown = {};

// Set Date input min with today's date
dateEl.setAttribute("min", dateToday);

// Function to update countdown timer
function updateCountdown(event) {
  event.preventDefault();
  // Put form values in variables
  countdownTitle = event.srcElement[0].value;
  countdownDate = event.srcElement[1].value;

  if (countdownDate === "") {
    alert("Please pick a date!");
  } else {
    // Convert date to epoch time
    countdownValue = new Date(countdownDate).getTime();

    // Disable button
    formButton[0].disabled = true;

    // Save countdown in localStorage
    savedCountdown.title = countdownTitle;
    savedCountdown.date = countdownDate;
    localStorage.setItem("countdown", JSON.stringify(savedCountdown));

    // Populate countdown timer
    populateTimer();
  }
}

function populateTimeDifference() {
  // Calculate time difference
  const now = new Date().getTime();
  // const timeDifference = countdownValue - now;
  const timeDifference = countdownValue - now;

  // Calculate time unit differences
  const daysDifference = Math.floor(timeDifference / day);
  const hoursDifference = Math.floor((timeDifference % day) / hour);
  const minutesDifference = Math.floor((timeDifference % hour) / minute);
  const secondsDifference = Math.floor((timeDifference % minute) / second);

  // If countdown is finished, show complete state
  if (timeDifference <= 0) {
    inputContainer.hidden = true;
    countdownTimer.hidden = true;
    clearInterval(countdownActive);
    completeInfoEl.textContent = `${countdownTitle} finished on ${countdownDate}`;
    completeTimer.hidden = false;
  } else {
    // Else show the countdown timer

    // Populate countdown DOM elements
    countdownElTitle.textContent = `${countdownTitle}`;
    countdownTUnits[0].textContent = `${daysDifference}`;
    countdownTUnits[1].textContent = `${hoursDifference}`;
    countdownTUnits[2].textContent = `${minutesDifference}`;
    countdownTUnits[3].textContent = `${secondsDifference}`;

    // Show correct container
    inputContainer.hidden = true;
    countdownTimer.hidden = false;
  }
}

// Function to reset timer
function resetTimer() {
  // Hide timer and show form
  countdownTimer.hidden = true;
  inputContainer.hidden = false;
  completeTimer.hidden = true;

  // Stop the countdown interval
  clearInterval(countdownActive);

  // Reset the input fields
  countdownTitle = "";
  countdownDate = "";
  formInputs[0].value = "";
  formInputs[1].value = "";
  formButton[0].disabled = false;
  localStorage.removeItem("countdown");
}

// Function to update DOM by populating timer
function populateTimer() {
  // Set active state
  countdownActive = setInterval(populateTimeDifference, second);
}

// Function to read countdown from localStorage if exists
function restorePreviousCountdown() {
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
    console.log(savedCountdown);
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    populateTimer();
  }
}

// After form submit we update countdown timer
countdownForm.addEventListener("submit", updateCountdown);

// After reset button is clicked
countdownReset.addEventListener("click", resetTimer);
completeBtn.addEventListener("click", resetTimer);

// On window load check localStorage for countdown
restorePreviousCountdown();
