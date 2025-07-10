/**
 * Age Calculator Application
 * Refactored for improved code quality, maintainability, and performance
 */

// Constants for time calculations
const MS_PER_YEAR = 31556952000;
const MS_PER_MONTH = 2629746000;
const MS_PER_DAY = 86400000;
const MS_PER_HOUR = 3600000;
const MS_PER_MINUTE = 60000;
const MS_PER_SECOND = 1000;

// Validation rules for input fields
const VALIDATION_RULES = {
	DAY: { min: 1, max: 31 },
	MONTH: { min: 1, max: 12 },
	YEAR: { min: 1900, max: new Date().getFullYear() }
};

// DOM element references
const domElements = {
	dayInput: document.getElementById("day"),
	monthInput: document.getElementById("month"),
	yearInput: document.getElementById("year"),
	calculateBtn: document.getElementById("calculate-btn"),
	dayLabel: document.getElementById("day-label"),
	monthLabel: document.getElementById("month-label"),
	yearLabel: document.getElementById("year-label"),
	invalidationMessages: document.querySelectorAll(".input-field p")
};

// Global state for live update interval
let liveUpdateInterval = null;

// Initialize event listeners
function initializeEventListeners() {
	const inputs = [domElements.dayInput, domElements.monthInput, domElements.yearInput];
	inputs.forEach(input => {
		input.addEventListener("keydown", handleEnterPress);
	});
}

function handleEnterPress(event) {
	if (event.key === "Enter") {
		calculateAge();
	}
}

/**
 * Reset input field styles to default state
 * @param {HTMLElement} input - The input element
 * @param {HTMLElement} label - The label element
 * @param {HTMLElement} errorMessage - The error message element
 */
function resetFieldStyles(input, label, errorMessage) {
	input.style.color = "";
	input.style.borderColor = "var(--Light-grey)";
	label.style.color = "";
	errorMessage.style.display = "none";
}

/**
 * Apply error styles to input field
 * @param {HTMLElement} input - The input element
 * @param {HTMLElement} label - The label element
 * @param {HTMLElement} errorMessage - The error message element
 * @param {string} message - Error message to display
 */
function applyErrorStyles(input, label, errorMessage, message) {
	input.style.color = "var(--light-red)";
	input.style.borderColor = "var(--light-red)";
	label.style.color = "var(--light-red)";
	errorMessage.innerHTML = message;
	errorMessage.style.display = "block";
}

/**
 * Get validation error message for a field
 * @param {string} fieldType - Type of field ('DAY', 'MONTH', 'YEAR')
 * @param {string} value - Field value
 * @returns {string} Error message
 */
function getValidationErrorMessage(fieldType, value) {
	if (value === "") {
		return "Field is empty!";
	}

	const rules = VALIDATION_RULES[fieldType];
	if (value < rules.min || value > rules.max) {
		switch (fieldType) {
			case 'DAY':
				return `Day must be${"<br>"}between${"<br>"}1 and 31!`;
			case 'MONTH':
				return `Month must be${"<br>"}between${"<br>"}1 and 12!`;
			case 'YEAR':
				return `Year must be${"<br>"}between 1900${"<br>"}and Current Year!`;
			default:
				return "Invalid value!";
		}
	}
	return "";
}

/**
 * Validate a single input field
 * @param {Object} field - Field configuration object
 * @returns {boolean} True if valid, false otherwise
 */
function validateField(field) {
	const { input, label, errorMessage, type, rules } = field;
	const value = input.value;

	// Reset styles first
	resetFieldStyles(input, label, errorMessage);

	// Check if value is valid
	if (value === "" || value < rules.min || value > rules.max) {
		const message = getValidationErrorMessage(type, value);
		applyErrorStyles(input, label, errorMessage, message);
		return false;
	}

	return true;
}

/**
 * Validate all input fields
 * @returns {boolean} True if all fields are valid, false otherwise
 */
function isValid() {
	const fields = [
		{
			input: domElements.dayInput,
			label: domElements.dayLabel,
			errorMessage: domElements.invalidationMessages[0],
			type: 'DAY',
			rules: VALIDATION_RULES.DAY
		},
		{
			input: domElements.monthInput,
			label: domElements.monthLabel,
			errorMessage: domElements.invalidationMessages[1],
			type: 'MONTH',
			rules: VALIDATION_RULES.MONTH
		},
		{
			input: domElements.yearInput,
			label: domElements.yearLabel,
			errorMessage: domElements.invalidationMessages[2],
			type: 'YEAR',
			rules: VALIDATION_RULES.YEAR
		}
	];

	// Validate all fields and return true only if all are valid
	return fields.every(field => validateField(field));
}

/**
 * Calculate age components from birth date
 * @param {Date} birthDate - The birth date
 * @returns {Object} Age components (years, months, days, hours, minutes, seconds)
 */
function calculateAgeComponents(birthDate) {
	const ageInMs = Date.now() - birthDate.getTime();

	return {
		years: Math.floor(ageInMs / MS_PER_YEAR),
		months: Math.floor((ageInMs % MS_PER_YEAR) / MS_PER_MONTH),
		days: Math.floor((ageInMs % MS_PER_MONTH) / MS_PER_DAY),
		hours: Math.floor((ageInMs % MS_PER_DAY) / MS_PER_HOUR),
		minutes: Math.floor((ageInMs % MS_PER_HOUR) / MS_PER_MINUTE),
		seconds: Math.floor((ageInMs % MS_PER_MINUTE) / MS_PER_SECOND)
	};
}

/**
 * Display age results with animation
 * @param {Object} ageComponents - Age components to display
 */
function displayAgeResults(ageComponents) {
	// Stop any existing live update
	stopLiveUpdate();

	// Animate output fields with age values
	animateOutput("years-output", ageComponents.years);
	animateOutput("months-output", ageComponents.months);
	animateOutput("days-output", ageComponents.days);
	animateOutput("hours-output", ageComponents.hours);
	animateOutput("minutes-output", ageComponents.minutes);
	animateOutput("seconds-output", ageComponents.seconds);

	// Start live updating seconds and minutes
	startLiveUpdate(ageComponents.seconds, ageComponents.minutes);
}

/**
 * Main function to calculate and display age
 */
function calculateAge() {
	if (!isValid()) {
		return;
	}

	// Get user input values
	const day = parseInt(domElements.dayInput.value);
	const month = parseInt(domElements.monthInput.value);
	const year = parseInt(domElements.yearInput.value);

	// Create Date object from user input values
	const birthDate = new Date(year, month - 1, day);

	// Calculate age components
	const ageComponents = calculateAgeComponents(birthDate);

	// Display results
	displayAgeResults(ageComponents);
}

/**
 * Stop live updating of seconds and minutes
 */
function stopLiveUpdate() {
	if (liveUpdateInterval) {
		clearInterval(liveUpdateInterval);
		liveUpdateInterval = null;
	}
}

/**
 * Start live updating seconds and minutes
 * @param {number} initialSeconds - Initial seconds value
 * @param {number} initialMinutes - Initial minutes value
 */
function startLiveUpdate(initialSeconds, initialMinutes) {
	let currentSeconds = initialSeconds;
	let currentMinutes = initialMinutes;

	const secondsOutput = document.getElementById("seconds-output");
	const minutesOutput = document.getElementById("minutes-output");

	liveUpdateInterval = setInterval(() => {
		currentSeconds++;
		if (currentSeconds >= 60) {
			currentSeconds = 0;
			currentMinutes++;
			minutesOutput.innerHTML = currentMinutes;
		}
		secondsOutput.innerHTML = currentSeconds;
	}, 1000);
}

/**
 * Animate output value from 0 to target value
 * @param {string} outputId - ID of HTML element to animate
 * @param {number} targetValue - Target value to animate to
 */
function animateOutput(outputId, targetValue) {
	const outputElement = document.getElementById(outputId);
	
	// Set output value to 0 initially
	outputElement.innerHTML = 0;

	// Skip animation if target value is 0
	if (targetValue === 0) {
		return;
	}

	// Calculate step size for animation
	const step = Math.ceil(targetValue / 100);
	const animationDuration = 20; // milliseconds

	// Animate to target value
	let currentValue = 0;
	const interval = setInterval(() => {
		currentValue += step;
		if (currentValue >= targetValue) {
			clearInterval(interval);
			currentValue = targetValue;
		}
		outputElement.innerHTML = currentValue;
	}, animationDuration);
}

/**
 * Toggle dark mode for the application
 */
function toggleDarkMode() {
	const elementsToToggle = [
		document.getElementsByTagName("body")[0],
		document.getElementsByTagName("form")[0],
		...document.getElementsByTagName("input")
	];

	elementsToToggle.forEach(element => {
		if (element) {
			element.classList.toggle("dark-mode");
		}
	});
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
	initializeEventListeners();
});
