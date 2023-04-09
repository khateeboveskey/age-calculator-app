const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const calculateBtn = document.getElementById("calculate-btn");

const dayLabel = document.getElementById("day-label");
const monthLabel = document.getElementById("month-label");
const yearLabel = document.getElementById("year-label");

const invalidation = document.querySelectorAll(".input-field p");
const currentYear = new Date();

const MS_PER_YEAR = 31556952000;

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

function invalidationError() {
	let isValid;
	const fields = [
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

	for (let i = 0; i < fields.length; i++) {
		const field = fields[i];
		const input = field.input;
		const label = field.label;
		const index = field.index;
		const min = field.min;
		const max = field.max;
		const value = input.value;

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
			input.style.color = "var(--Off-black)";
			invalidation[index].style.display = "none";
			label.style.color = "var(--Smokey-grey)";
			isValid = true;
		}
	}

	return isValid;
}

function calculateAge() {
	// Get user input values
	const day = document.getElementById("day").value;
	const month = document.getElementById("month").value;
	const year = document.getElementById("year").value;

	if (invalidationError()) {
		// Create Date object from user input values
		const birthDate = new Date(year, month - 1, day);

		// Calculate age in milliseconds
		const ageInMs = Date.now() - birthDate.getTime();

		// Calculate age in years, months, and days
		const ageInYears = Math.floor(ageInMs / MS_PER_YEAR);
		// MS_PER_YEAR = 1000ms * 60s * 60min * 24hrs * 365.25 days
		const ageInMonths = Math.floor((ageInMs % MS_PER_YEAR) / 2629746000);
		// 2629746000 = 1000ms * 60s * 60min * 24hrs * 30.44 days
		const ageInDays = Math.floor((ageInMs % 2629746000) / 86400000);
		// 86400000 = 1000ms * 60s * 60min * 24hrs

		const ageInHours = Math.floor((ageInMs % 86400000) / 3600000);
		// 3600000 = 1000ms * 60s * 60min
		const ageInMinutes = Math.floor((ageInMs % 3600000) / 60000);
		// 60000 = 1000ms * 60s
		const ageInSeconds = Math.floor((ageInMs % 60000) / 1000);
		// 1000ms

		// Animate output fields with age values
		animateOutput("years-output", ageInYears);
		animateOutput("months-output", ageInMonths);
		animateOutput("days-output", ageInDays);
		animateOutput("hours-output", ageInHours);
		animateOutput("minutes-output", ageInMinutes);
		animateOutput("seconds-output", ageInSeconds);
	}
}

function animateOutput(outputId, value) {
	// Set output value to 0 initially
	document.getElementById(outputId).innerHTML = 0;

	// Calculate step size for animation
	const step = Math.ceil(value / 100);

	// Use setInterval to update output value every 10 milliseconds until it reaches the calculated value
	let current = 0;
	const interval = setInterval(() => {
		current += step;
		if (current >= value) {
			clearInterval(interval);
			current = value;
		}
		document.getElementById(outputId).innerHTML = current;
	}, 20);
}
