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
const labelDay = document.getElementById("label-day");
const labelMonth = document.getElementById("label-month");
const labelYear = document.getElementById("label-year");

function addErrorStateStyle (input, label) {
    label.classList.add("invalid-state-text");
    input.classList.add("invalid-state-style");
}

function removeErrorStateStyle() {
    labelDay.classList.remove("invalid-state-style")
    labelMonth.classList.remove("invalid-state-style")
    labelYear.classList.remove("invalid-state-style")
    labelDay.classList.remove("invalid-state-text");
    labelMonth.classList.remove("invalid-state-text");
    labelYear.classList.remove("invalid-state-text");
    dayInput.classList.remove("invalid-state-style")
    monthInput.classList.remove("invalid-state-style")
    yearInput.classList.remove("invalid-state-style")
    dayInput.classList.remove("invalid-state-text")
    monthInput.classList.remove("invalid-state-text")
    yearInput.classList.remove("invalid-state-text")
}

function clearError() {
    dayError.innerHTML = '';
    monthError.innerHTML = '';
    yearError.innerHTML = '';
    
}

const numbers = "0123456789";

let interval = null;

function animateOutput(output, originalValue) {
    let iteration = 0;
    const totalIterations = originalValue.length; 
    let intervalId = setInterval(() => {
        output.innerHTML = originalValue
            .split("")
            .map((letter, index) => {
                if (index < iteration) {
                    return originalValue[index];
                }
                return numbers[Math.floor(Math.random() * 26)];
            })
            .join("");

        if (iteration >= totalIterations) {
            clearInterval(intervalId);
        }

        iteration++;
    }, 30);
}

function updateCalculator (days) {
    dayOutput.innerHTML = days - 1;
    const yearCalc = Math.floor(days / 365); 
    const monthCalc = Math.floor(days / 30.417);
    monthOutput.innerHTML = monthCalc;
    yearOutput.innerHTML = yearCalc; 
}

function errorHandle () {

    const currentDate = new Date();
    const inputDate = new Date(Number(yearInput.value), Number(monthInput.value) - 1, Number(dayInput.value));

    const isInputValid =
        dayInput.value > 31 && monthInput.value > 12 && inputDate.getTime() > currentDate.getTime()
            ? (monthError.innerHTML = 'Must be a valid month', dayError.innerHTML = 'Must be a valid day', yearError.innerHTML = "Must be in the past", addErrorStateStyle(dayInput, labelDay),addErrorStateStyle(monthInput, labelMonth), addErrorStateStyle(yearInput, labelYear), false) // 3 at once
            : dayInput.value > 31 && inputDate.getTime() > currentDate.getTime() ? (dayError.innerHTML = "Must be a valid day",yearError.innerHTML = "Must be a valid date",addErrorStateStyle(dayInput, labelDay), addErrorStateStyle(yearInput,labelYear), false) // Day and year error
            : monthInput.value > 12 && inputDate.getTime() > currentDate.getTime() ? (yearError.innerHTML = "Must be in the past",monthError.innerHTML = "Must be a valid month",addErrorStateStyle(monthInput, labelMonth), addErrorStateStyle(yearInput,labelYear), false) //Month and year error
            : monthInput.value > 12 && dayInput.value > 31 ? (monthError.innerHTML = 'Must be a valid month', addErrorStateStyle(monthInput, labelMonth),dayError.innerHTML = 'Must be a valid day', addErrorStateStyle(dayInput, labelDay),false)
            : monthInput.value > 12
            ? (monthError.innerHTML = 'Must be a valid month', addErrorStateStyle(monthInput, labelMonth), false)
            : dayInput.value > 31
            ? (dayError.innerHTML = 'Must be a valid day', addErrorStateStyle(dayInput, labelDay), false)
            : dayInput.value > 28 && monthInput.value == 2
            ? (dayError.innerHTML = "Must be a valid date",
            monthError.innerHTML = "Must be a valid date", addErrorStateStyle(dayInput, labelDay), addErrorStateStyle(monthInput,labelMonth), false)
            : inputDate.getTime() > currentDate.getTime()
            ? (yearError.innerHTML = "Must be in the past", addErrorStateStyle(yearInput,labelYear),false)
            : dayInput.value > 30 && [4, 6, 9, 11].includes(Number(monthInput.value))
            ? (dayError.innerHTML = "Must be a valid date", monthError.innerHTML = "Must be a valid date",addErrorStateStyle(dayInput, labelDay), addErrorStateStyle(monthInput,labelMonth), false)
            : true
            

    if (isInputValid) {
        clearError();
    }

    return isInputValid;
}

function calculateTime() {
    removeErrorStateStyle();
    clearError();
    if (!errorHandle()) {
        return;
    }
    const currentDate = new Date();
    const inputDate = new Date(Number(yearInput.value), Number(monthInput.value - 1), Number(dayInput.value));
    const differenceDays = Math.round((currentDate.getTime() - inputDate.getTime()) / 86400000);
    clearError(); 
    updateCalculator(differenceDays)
}

arrow.addEventListener("click", () => {
    calculateTime();
    animateOutput(dayOutput, dayOutput.innerHTML);
    animateOutput(monthOutput, monthOutput.innerHTML);
    animateOutput(yearOutput, yearOutput.innerHTML);
});
