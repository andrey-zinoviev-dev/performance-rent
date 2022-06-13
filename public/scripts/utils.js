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
const spaceOptionsButton = document.querySelector('#option-button');
//functions
function generateFromTemplate(template, selector) {
  return template.content.cloneNode(true).querySelector(selector);
};
function binarySearchArray(array, value, location) {
  let minDate = 0;
  let maxDate = array.length -1;
  for (let i = 0; i < array.length; i++) {
    let middleValue = Math.floor((minDate + maxDate)/2);
    const dateStamp = new Date(array[middleValue].split(',')[0]).getTime();
    if(value === dateStamp) {
      return array[middleValue].split(',')[1];
    }
    if(value < dateStamp) {
      maxDate = middleValue - i;
    }
    if(value > dateStamp) {
      minDate = middleValue + i;
    }


    // if(value > array[middleValue]) {
    //   minDate = middleValue + i;
    // }
    // if(value < array[middleValue]) {
    //   maxDate = middleValue - i;
    // }
    // if(value === array[middleValue]) {
    //   return location.occupied.find((el) => {
    //     return el.includes(new Date(array[middleValue]).getDate() && new Date(array[middleValue]).getMonth() + 1);
    //   })
    // }
  }
}
//variables
let filterToSend = {};
let numberOfHours = 24;
