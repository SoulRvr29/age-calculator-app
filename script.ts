const submit = <HTMLButtonElement>document.querySelector(".arrow");

const inputDay = document.querySelector("#day") as HTMLInputElement;
const inputMonth = document.querySelector("#month") as HTMLInputElement;
const inputYear = document.querySelector("#year") as HTMLInputElement;

const resultDays = document.querySelector(".days") as HTMLSpanElement;
const resultMonths = document.querySelector(".months") as HTMLSpanElement;
const resultYears = document.querySelector(".years") as HTMLSpanElement;

const dayError = document.querySelector(".dayError") as HTMLDivElement;
const monthError = document.querySelector(".monthError") as HTMLDivElement;
const yearError = document.querySelector(".yearError") as HTMLDivElement;

const labelDay = document.querySelector(".labelDay") as HTMLLabelElement;
const labelMonth = document.querySelector(".labelMonth") as HTMLLabelElement;
const labelYear = document.querySelector(".labelYear") as HTMLLabelElement;

const date: Date = new Date();
let dayActual: number = date.getDate();
let monthActual: number = date.getMonth() + 1;
let yearActual: number = date.getFullYear();

let submitLock: boolean = false;

submit.addEventListener("click", function (): void {
  let dayLock: boolean = checkDay(Number(inputDay.value));
  let monthLock: boolean = checkMonth(Number(inputMonth.value));
  let yearLock: boolean = checkYear(Number(inputYear.value));
  if (
    dayLock == false &&
    monthLock == false &&
    yearLock == false &&
    submitLock == false
  ) {
    submitLock = true;
    calculate();
  }
});

function calculate(): void {
  let yearCalc: number = yearActual - Number(inputYear.value) - 1;
  let monthCalc: number = 11 - Number(inputMonth.value) + monthActual;
  if (monthCalc >= 12) {
    monthCalc -= 12;
    yearCalc++;
  }
  let dayCalc: number = 31 - Number(inputDay.value) + dayActual;
  if (dayCalc >= 31) {
    dayCalc -= 31;
    monthCalc++;
  }
  animation(yearCalc, monthCalc, dayCalc);
}

function leapYearCheck(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function daysExcess(month: number) {
  let leapYear: boolean = leapYearCheck(Number(inputYear.value));
  if (month == 4 || month == 6 || month == 9 || Number(inputMonth) == 11) {
    return 1; // 30 days
  } else if (month == 2) {
    if (leapYear == false) return 3; // 28 days
    else return 2; // 29 days
  } else {
    return 0; // 31 days
  }
}

function checkDay(day: number): boolean {
  let excess: number = daysExcess(Number(inputMonth.value));
  if (day == 0) {
    dayError.style.visibility = "visible";
    dayError.innerHTML = "This field is required";
    inputDay.style.border = "1px solid var(--Light-red)";
    labelDay.style.color = "var(--Light-red)";
    return true;
  } else if (day > 31 - excess || day < 1 || isNaN(day) == true) {
    inputDay.style.border = "1px solid var(--Light-red)";
    labelDay.style.color = "var(--Light-red)";
    dayError.style.visibility = "visible";
    dayError.innerHTML = "Must be a valid day";
    return true;
  } else {
    dayError.style.visibility = "hidden";
    inputDay.style.color = "var(--Off-black)";
    inputDay.style.border = "1px solid var(--Purple)";
    labelDay.style.color = "var(--Smokey-grey)";
    return false;
  }
}

function checkMonth(month: number): boolean {
  if (month == 0) {
    monthError.style.visibility = "visible";
    monthError.innerHTML = "This field is required";
    inputMonth.style.border = "1px solid var(--Light-red)";
    labelMonth.style.color = "var(--Light-red)";
    return true;
  } else if (month > 12 || month < 1 || isNaN(month) == true) {
    inputMonth.style.border = "1px solid var(--Light-red)";
    labelMonth.style.color = "var(--Light-red)";
    monthError.style.visibility = "visible";
    monthError.innerHTML = "Must be a valid month";
    return true;
  } else {
    monthError.style.visibility = "hidden";
    inputMonth.style.color = "var(--Off-black)";
    inputMonth.style.border = "1px solid var(--Purple)";
    labelMonth.style.color = "var(--Smokey-grey)";
    return false;
  }
}

function checkYear(year: number): boolean {
  if (year == 0) {
    yearError.style.visibility = "visible";
    yearError.innerHTML = "This field is required";
    inputYear.style.border = "1px solid var(--Light-red)";
    labelYear.style.color = "var(--Light-red)";
    return true;
  } else if (year > yearActual || year < 1 || isNaN(year) == true) {
    inputYear.style.border = "1px solid var(--Light-red)";
    labelYear.style.color = "var(--Light-red)";
    yearError.style.visibility = "visible";
    yearError.innerHTML = "Must be in the past";
    return true;
  } else {
    yearError.style.visibility = "hidden";
    inputYear.style.color = "var(--Off-black)";
    inputYear.style.border = "1px solid var(--Purple)";
    labelYear.style.color = "var(--Smokey-grey)";
    return false;
  }
}

function animation(yearCalc: number, monthCalc: number, dayCalc: number) {
  let yearCounter: number = 0;
  let monthCounter: number = 0;
  let dayCounter: number = 0;
  resultYears.innerHTML = "";
  resultMonths.innerHTML = "";
  resultDays.innerHTML = "";

  let yearInterval = setInterval(function (): void {
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
      } else {
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
      } else {
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
