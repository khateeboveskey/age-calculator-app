let Y = new Date();

function calculateAge() {
	let inputYear = parseInt(document.getElementById("year").value);
	let inputMonth = parseInt(document.getElementById("month").value);
	let inputDay = parseInt(document.getElementById("day").value);
	let years = Y.getFullYear() - inputYear;
	let months = years * 12;
	let days = years * 365;

	document.getElementById("years-output").innerHTML = years;
	document.getElementById("months-output").innerHTML = months;
	document.getElementById("days-output").innerHTML = days;
}

document.getElementById("year").addEventListener("input", function () {
	let inputYear = parseInt(document.getElementById("year").value);
	let inputMonth = parseInt(document.getElementById("month").value);
	let inputDay = parseInt(document.getElementById("day").value);

	if (inputYear > Y.getFullYear()) {
		document.getElementById("year-label").style.color = "red";
		document.getElementById("year").style.color = "red";
		document.getElementById("year-label").style.opacity = "1";
	} else {
		document.getElementById("year-label").style.color = "black";
		document.getElementById("year").style.color = "black";
		document.getElementById("year-label").style.opacity = "0.5";
	}

	if (inputMonth > 12) {
		document.getElementById("month-label").style.color = "red";
		document.getElementById("month").style.color = "red";
		document.getElementById("month-label").style.opacity = "1";
	} else {
		document.getElementById("month-label").style.color = "black";
		document.getElementById("month").style.color = "black";
		document.getElementById("month-label").style.opacity = "0.5";
	}

	if (inputDay > 31) {
		document.getElementById("day-label").style.color = "red";
		document.getElementById("day").style.color = "red";
		document.getElementById("day-label").style.opacity = "1";
	} else {
		document.getElementById("day-label").style.color = "black";
		document.getElementById("day").style.color = "black";
		document.getElementById("day-label").style.opacity = "0.5";
	}
});