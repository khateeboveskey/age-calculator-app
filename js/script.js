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

// Add event listener for "click" event to calculate button
calculateBtn.addEventListener("click", calculateAge);

function handleEnterPress(event) {
	// Check if Enter key is pressed
	if (event.key === "Enter") {
		calculateAge();
	}
}

function calculateAge() {
	// Get user input values
	const day = document.getElementById("day").value;
	const month = document.getElementById("month").value;
	const year = document.getElementById("year").value;

	if (day == "" || day > 31 || day < 1) {
		dayInput.style.color = "var(--light-red)";
		invalidation[0].style.display = "block";
		dayLabel.style.color = "var(--light-red)";
		dayLabel.style.opacity = "1";
		return;
	} else {
		dayInput.style.color = "var(--Off-black)";
		invalidation[0].style.display = "none";
		dayLabel.style.color = "var(--Off-black)";
		dayLabel.style.opacity = "0.5";
	}

	if (month == "" || month > 12 || month < 1) {
		monthInput.style.color = "var(--light-red)";
		invalidation[1].style.display = "block";
		monthLabel.style.color = "var(--light-red)";
		monthLabel.style.opacity = "1";
		return;
	} else {
		monthInput.style.color = "var(--Off-black)";
		invalidation[1].style.display = "none";
		monthLabel.style.color = "var(--Off-black)";
		monthLabel.style.opacity = "0.5";
	}

	if (year == "" || year > currentYear.getFullYear()) {
		yearInput.style.color = "var(--light-red)";
		invalidation[2].style.display = "block";
		yearLabel.style.color = "var(--light-red)";
		yearLabel.style.opacity = "1";
		return;
	} else {
		yearInput.style.color = "var(--Off-black)";
		invalidation[2].style.display = "none";
		yearLabel.style.color = "var(--Off-black)";
		yearLabel.style.opacity = "0.5";
	}

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

	// Animate output fields with age values
	animateOutput("years-output", ageInYears);
	animateOutput("months-output", ageInMonths);
	animateOutput("days-output", ageInDays);
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
