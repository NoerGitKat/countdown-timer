// Select DOM elements
const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdownTimer = document.getElementById("countdown-timer");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-reset");
const countdownTUnits = document
  .getElementById("countdown-tunits")
  .getElementsByTagName("span");

// Get form data
let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;

// Set time values
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Get date today
const today = new Date().toISOString();
const dateToday = today.split("T")[0];

console.log("dateToday", dateToday);

// Set Date input min with today's date
dateEl.setAttribute("min", dateToday);

// Function to update countdown timer
function updateCountdown(event) {
  event.preventDefault();
  // Put form values in variables
  countdownTitle = event.srcElement[0].value;
  countdownDate = event.srcElement[1].value;

  // Convert date to epoch time
  countdownValue = new Date(countdownDate).getTime();

  // Populate countdown timer
  populateTimer();
}

function populateTimeDifference() {
  // Calculate time difference
  const now = new Date().getTime();
  const timeDifference = countdownValue - now;

  // Calculate time unit differences
  const daysDifference = Math.floor(timeDifference / day);
  const hoursDifference = Math.floor((timeDifference % day) / hour);
  const minutesDifference = Math.floor((timeDifference % hour) / minute);
  const secondsDifference = Math.floor((timeDifference % minute) / second);

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

// Functio to update DOM by populating timer
function populateTimer() {
  // Set active state
  countdownActive = setInterval(populateTimeDifference, second);
}

// After form submit we update countdown timer
countdownForm.addEventListener("submit", updateCountdown);
