//selectors
const inputsToSend = Array.from(document.querySelectorAll('.date-to-send'));
const dateInput = document.querySelector('.input-date');
const inputFloorMin = document.querySelector('.input-floor-min');
const inputFloorMax = document.querySelector('.input-floor-max');
const fomrSubmitButton = document.querySelector('.form-submit');
//variables
let filterToSend = {};