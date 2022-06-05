//selectors
const inputsToSend = Array.from(document.querySelectorAll('.data-to-send'));
const dateInput = document.querySelector('.input-date');
const inputFloorMin = document.querySelector('.input-floor-min');
const inputFloorMax = document.querySelector('.input-floor-max');
const fomrSubmitButton = document.querySelector('.form-submit');
const resultSection = document.querySelector('.result'); 
const resultSectionList = resultSection.querySelector('.result__list');
//templates
const spaceTemplate = document.querySelector('#place-element');
const spaceTimeTemplate = document.querySelector('#time-select-value');
//functions
function generateFromTemplate(template, selector) {
  return template.content.cloneNode(true).querySelector(selector);
};
//variables
let filterToSend = {};
let numberOfHours = 24;
