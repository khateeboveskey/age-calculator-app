let dayInput = document.getElementById("day");
let monthInput = document.getElementById("month");
let yearInput = document.getElementById("year");

let calculateBtn = document.getElementById("calculate-btn");

let dayLabel = document.getElementById("day-label");
let monthLabel = document.getElementById("month-label");
let yearLabel = document.getElementById("year-label");

let invalidation = document.querySelectorAll(".input-field p");
let currentYear = new Date();

let MS_PER_YEAR = 31556952000;

let isDark = false;

// Add event listener for "keydown" event to input fields
dayInput.addEventListener("keydown", handleEnterPress);
monthInput.addEventListener("keydown", handleEnterPress);
yearInput.addEventListener("keydown", handleEnterPress);

function handleEnterPress(event) {
	// Check if Enter key is pressed
	if (event.key === "Enter") {
		calculateAge();
	}
}

/**
 * Check if inputs are invalid
 * @returns isValid
 */
function isValid() {
	let isValid;
	let fields = [
		{ input: dayInput, label: dayLabel, index: 0, min: 1, max: 31 },
		{ input: monthInput, label: monthLabel, index: 1, min: 1, max: 12 },
		{
			input: yearInput,
			label: yearLabel,
			index: 2,
			min: 1900,
			max: currentYear.getFullYear(),
		},
	];

	// check every field with for loop forEach() is not the function because
	// it returns value for the callback function and not forEach itself
	for (let i = 0; i < fields.length; i++) {
		let field = fields[i];
		let input = field.input;
		let label = field.label;
		let index = field.index;
		let min = field.min;
		let max = field.max;
		let value = input.value;

		if (value == "" || value > max || value < min) {
			input.style.color = "var(--light-red)";
			input.style.borderColor = "var(--light-red)";
			if (value == "") {
				invalidation[index].innerHTML = "Field is empty!";
			} else if (value > max || value < min) {
				switch (input) {
					case dayInput: {
						invalidation[index].innerHTML = `Day must be${"<br>"}
						between${"<br>"}
						1 and 31!`;
						break;
					}
					case monthInput: {
						invalidation[index].innerHTML = `Month must be${"<br>"}
						between${"<br>"}
						1 and 12!`;
						break;
					}
					case yearInput: {
						invalidation[index].innerHTML = `Year must be${"<br>"}
						between 1900${"<br>"}
						and Current Year!`;
						break;
					}
				}
			}
			invalidation[index].style.display = "block";
			label.style.color = "var(--light-red)";
			isValid = false;
			break;
		} else {
			input.style.borderColor = "var(--Light-grey)";
			if (isDark) {
				input.style.color = "var(--Off-black)";
			} else {
				input.style.color = "var(--Off-black)";
			}
			invalidation[index].style.display = "none";
			label.style.color = "var(--text)";
			isValid = true;
		}
	}

	return isValid;
}

function calculateAge() {
	// Get user input values
	let day = document.getElementById("day").value;
	let month = document.getElementById("month").value;
	let year = document.getElementById("year").value;

	// isValid() returns boolean, to not to calculate
	// unless the inputs are invalid
	if (isValid()) {
		// Create Date object from user input values
		let birthDate = new Date(year, month - 1, day);

		// Calculate age in milliseconds
		let ageInMs = Date.now() - birthDate.getTime();

		// Calculate age in years, months, and days
		let ageInYears = Math.floor(ageInMs / MS_PER_YEAR);
		// MS_PER_YEAR = 1000ms * 60s * 60min * 24hrs * 365.25 days
		let ageInMonths = Math.floor((ageInMs % MS_PER_YEAR) / 2629746000);
		/**
		 *	ms per month
		 *	 % is used because we want the remaining time
		 *	 2629746000 = 1000ms * 60s * 60min * 24hrs * 30.44 days
		 */
		let ageInDays = Math.floor((ageInMs % 2629746000) / 86400000);
		// ms per day
		// 86400000 = 1000ms * 60s * 60min * 24hrs

		let ageInHours = Math.floor((ageInMs % 86400000) / 3600000);
		// 3600000 = 1000ms * 60s * 60min
		let ageInMinutes = Math.floor((ageInMs % 3600000) / 60000);
		// 60000 = 1000ms * 60s
		let ageInSeconds = Math.floor((ageInMs % 60000) / 1000);
		// 1000ms

		// Animate output fields with age values
		animateOutput("years-output", ageInYears);
		animateOutput("months-output", ageInMonths);
		animateOutput("days-output", ageInDays);
		animateOutput("hours-output", ageInHours);
		animateOutput("minutes-output", ageInMinutes);
		animateOutput("seconds-output", ageInSeconds);

		moveSecondAndMinutes(ageInSeconds, ageInMinutes);
	}
}

function moveSecondAndMinutes(ageInSeconds, ageInMinutes) {
	let secondsOutput = document.getElementById("seconds-output");
	let minutesOutput = document.getElementById("minutes-output");

	setInterval(function () {
		secondsOutput.innerHTML = ageInSeconds;
		ageInSeconds++;

		if (ageInSeconds === 60) {
			ageInSeconds = 00;
			ageInMinutes++;
			minutesOutput.innerHTML = ageInMinutes;
		}
	}, 1000);
}

/**
 *
 * @param {*} outputId Id of HTML tag to view output in
 * @param {*} value value to be viewed in the HTML tag
 */
function animateOutput(outputId, value) {
	// Set output value to 0 initially to start with
	document.getElementById(outputId).innerHTML = 0;

	// Calculate step size for animation
	let step = Math.ceil(value / 100);

	// Use setInterval to update output value every 10 milliseconds
	// until it reaches the calculated value
	let current = 0;
	let interval = setInterval(() => {
		current += step;
		if (current >= value) {
			clearInterval(interval);
			current = value;
		}
		document.getElementById(outputId).innerHTML = current;
	}, 20);
}

window.onload = function () {
	dayInput.focus();
	autoFocus();
};

function autoFocus() {
	if (dayInput.onblur && dayInput.value == "") {
		dayInput.focus();
	} else if (dayInput.value.length == 2) {
		monthInput.focus();
	}
	if (monthInput.onblur && monthInput.value == "") {
		monthInput.focus();
	} else if (monthInput.value.length == 2) {
		yearInput.focus();
	}
	if (yearInput.onblur && yearInput.value == "") {
		yearInput.focus();
	} else if (yearInput.value.length == 4) {
		calculateBtn.click();
	}
}

function toggleDarkMode() {
	let state = {
		body: document.getElementsByTagName("body")[0],
		form: document.getElementsByTagName("form")[0],
		input0: document.getElementsByTagName("input")[0],
		input1: document.getElementsByTagName("input")[1],
		input2: document.getElementsByTagName("input")[2],
	};

	for (let key in state) {
		state[key].classList.toggle("dark-mode");
	}
	let isDark = !isDark;
}
