const arrow = document.getElementById("arrow");
const dayError = document.querySelector(".err-day");
const monthError = document.querySelector(".err-month");
const yearError = document.querySelector(".err-year");
const dayInput = document.getElementById("day-input");
const monthInput = document.getElementById("month-input");
const yearInput = document.getElementById("year-input");
const yearOutput = document.getElementById("output-year")
const monthOutput = document.getElementById("output-month")
const dayOutput = document.getElementById("output-day")

function clearError() {
    dayError.innerHTML = '';
    monthError.innerHTML = '';
    yearError.innerHTML = '';
}

function updateCalculator (days) {
    dayOutput.innerHTML = days - 1;
    monthOutput.innerHTML = Math.floor(days / 30.417);
    yearOutput.innerHTML = Math.floor(days / 365);
}

function conditionCheck () {

    const currentDate = new Date();
    const inputDate = new Date(Number(yearInput.value), Number(monthInput.value) - 1, Number(dayInput.value));

    const isInputValid =
        dayInput.value > 31 && monthInput.value > 12 && inputDate.getTime() > currentDate.getTime()
            ? (monthError.innerHTML = 'Must be a valid month', dayError.innerHTML = 'Must be a valid day', yearError.innerHTML = "Must be in the past", false)
            : monthInput.value > 12
            ? (monthError.innerHTML = 'Must be a valid month', false)
            : dayInput.value > 31
            ? (dayError.innerHTML = 'Must be a valid day', false)
            : dayInput.value > 28 && monthInput.value == 2
            ? (dayError.innerHTML = "Must be a valid date", false)
            : inputDate.getTime() > currentDate.getTime()
            ? (yearError.innerHTML = "Must be in the past", false)
            : dayInput.value > 30 && [4, 6, 9, 11].includes(Number(monthInput.value))
            ? (dayError.innerHTML = "Must be a valid date", false)
            : true;

    if (isInputValid) {
        clearError();
    }

    return isInputValid;
}

function calculateTime() {
    clearError();
    if (!conditionCheck()) {
        return;
    }
    const currentDate = new Date();
    const inputDate = new Date(Number(yearInput.value), Number(monthInput.value - 1), Number(dayInput.value));
    const differenceDays = Math.round((currentDate.getTime() - inputDate.getTime()) / 86400000);

    updateCalculator(differenceDays);
    clearError(); 
}

arrow.addEventListener("click", calculateTime);