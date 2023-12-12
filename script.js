"use strict";
const submit = document.querySelector(".arrow");
const inputDay = document.querySelector("#day");
const inputMonth = document.querySelector("#month");
const inputYear = document.querySelector("#year");
const resultDays = document.querySelector(".days");
const resultMonths = document.querySelector(".months");
const resultYears = document.querySelector(".years");
const dayError = document.querySelector(".dayError");
const monthError = document.querySelector(".monthError");
const yearError = document.querySelector(".yearError");
const labelDay = document.querySelector(".labelDay");
const labelMonth = document.querySelector(".labelMonth");
const labelYear = document.querySelector(".labelYear");
const date = new Date();
let dayActual = date.getDate();
let monthActual = date.getMonth() + 1;
let yearActual = date.getFullYear();
let submitLock = false;
submit.addEventListener("click", function () {
    let dayLock = checkDay(Number(inputDay.value));
    let monthLock = checkMonth(Number(inputMonth.value));
    let yearLock = checkYear(Number(inputYear.value));
    if (dayLock == false &&
        monthLock == false &&
        yearLock == false &&
        submitLock == false) {
        submitLock = true;
        calculate();
    }
});
function calculate() {
    let yearCalc = yearActual - Number(inputYear.value) - 1;
    let monthCalc = 11 - Number(inputMonth.value) + monthActual;
    if (monthCalc >= 12) {
        monthCalc -= 12;
        yearCalc++;
    }
    let dayCalc = 31 - Number(inputDay.value) + dayActual;
    if (dayCalc >= 31) {
        dayCalc -= 31;
        monthCalc++;
    }
    animation(yearCalc, monthCalc, dayCalc);
}
function leapYearCheck(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
function daysExcess(month) {
    let leapYear = leapYearCheck(Number(inputYear.value));
    if (month == 4 || month == 6 || month == 9 || Number(inputMonth) == 11) {
        return 1; // 30 days
    }
    else if (month == 2) {
        if (leapYear == false)
            return 3; // 28 days
        else
            return 2; // 29 days
    }
    else {
        return 0; // 31 days
    }
}
function checkDay(day) {
    let excess = daysExcess(Number(inputMonth.value));
    if (day == 0) {
        dayError.style.visibility = "visible";
        dayError.innerHTML = "This field is required";
        inputDay.style.border = "1px solid var(--Light-red)";
        labelDay.style.color = "var(--Light-red)";
        return true;
    }
    else if (day > 31 - excess || day < 1 || isNaN(day) == true) {
        inputDay.style.border = "1px solid var(--Light-red)";
        labelDay.style.color = "var(--Light-red)";
        dayError.style.visibility = "visible";
        dayError.innerHTML = "Must be a valid day";
        return true;
    }
    else {
        dayError.style.visibility = "hidden";
        inputDay.style.color = "var(--Off-black)";
        inputDay.style.border = "1px solid var(--Purple)";
        labelDay.style.color = "var(--Smokey-grey)";
        return false;
    }
}
function checkMonth(month) {
    if (month == 0) {
        monthError.style.visibility = "visible";
        monthError.innerHTML = "This field is required";
        inputMonth.style.border = "1px solid var(--Light-red)";
        labelMonth.style.color = "var(--Light-red)";
        return true;
    }
    else if (month > 12 || month < 1 || isNaN(month) == true) {
        inputMonth.style.border = "1px solid var(--Light-red)";
        labelMonth.style.color = "var(--Light-red)";
        monthError.style.visibility = "visible";
        monthError.innerHTML = "Must be a valid month";
        return true;
    }
    else {
        monthError.style.visibility = "hidden";
        inputMonth.style.color = "var(--Off-black)";
        inputMonth.style.border = "1px solid var(--Purple)";
        labelMonth.style.color = "var(--Smokey-grey)";
        return false;
    }
}
function checkYear(year) {
    if (year == 0) {
        yearError.style.visibility = "visible";
        yearError.innerHTML = "This field is required";
        inputYear.style.border = "1px solid var(--Light-red)";
        labelYear.style.color = "var(--Light-red)";
        return true;
    }
    else if (year > yearActual || year < 1 || isNaN(year) == true) {
        inputYear.style.border = "1px solid var(--Light-red)";
        labelYear.style.color = "var(--Light-red)";
        yearError.style.visibility = "visible";
        yearError.innerHTML = "Must be in the past";
        return true;
    }
    else {
        yearError.style.visibility = "hidden";
        inputYear.style.color = "var(--Off-black)";
        inputYear.style.border = "1px solid var(--Purple)";
        labelYear.style.color = "var(--Smokey-grey)";
        return false;
    }
}
function animation(yearCalc, monthCalc, dayCalc) {
    let yearCounter = 0;
    let monthCounter = 0;
    let dayCounter = 0;
    resultYears.innerHTML = "";
    resultMonths.innerHTML = "";
    resultDays.innerHTML = "";
    let yearInterval = setInterval(function () {
        if (yearCalc < 10) {
            resultYears.innerHTML = "";
            resultYears.style.marginLeft = "min(8vw, 2rem)";
        }
        if (yearCalc > 9 && yearCalc < 100) {
            resultYears.style.marginLeft = "0";
        }
        if (yearCalc > 99) {
            resultYears.style.marginLeft = "min(-1vw, -1rem)";
        }
        resultYears.innerHTML = String(yearCounter);
        yearCounter++;
        if (yearCounter > yearCalc) {
            clearInterval(yearInterval);
            monthAnimation();
        }
    }, 50);
    function monthAnimation() {
        let monthInterval = setInterval(function () {
            if (monthCalc < 10) {
                resultMonths.innerHTML = "";
                resultMonths.style.marginLeft = "min(8vw, 2rem)";
            }
            else {
                resultMonths.style.marginLeft = "0";
            }
            resultMonths.innerHTML = String(monthCounter);
            monthCounter++;
            if (monthCounter > monthCalc) {
                clearInterval(monthInterval);
                dayAnimation();
            }
        }, 100);
    }
    function dayAnimation() {
        let dayInterval = setInterval(function () {
            if (dayCalc < 10) {
                resultDays.innerHTML = "";
                resultDays.style.marginLeft = "min(8vw, 2rem)";
            }
            else {
                resultDays.style.marginLeft = "0";
            }
            resultDays.innerHTML = String(dayCounter);
            dayCounter++;
            if (dayCounter > dayCalc) {
                clearInterval(dayInterval);
                submitLock = false;
            }
        }, 80);
    }
}
