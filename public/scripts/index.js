// fetch('/showSpaces')
// .then((res) => {
//   return res.json();
// })
// .then((data) => {
//   return data;
// });

inputsToSend.forEach((input) => {
  input.addEventListener('change', () => {
    filterToSend[input.name] = input.value;
    // console.log(filterToSend);
    return fetch('/filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filterToSend),
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.forEach((location) => {
        let timeStamp;
        location.occupied.forEach((el) => {
          timeStamp = el.split(',')[1];
        });

        const spaceFromTemplate = generateFromTemplate(spaceTemplate, '.result__list-element');
        spaceFromTemplate.querySelector('.result__list-element-span_space').textContent = location.type;
        spaceFromTemplate.querySelector('.result__list-element-span_price').textContent = location.price;
        spaceFromTemplate.querySelector('.result__list-element-span_occupied').textContent = `${timeStamp ? `Место занято в ${timeStamp}` : ""}`;
        const selectTimeStart = spaceFromTemplate.querySelector('.result__list-element-timetable-form-time-start');
        const selectTimeEnd = spaceFromTemplate.querySelector('.result__list-element-timetable-form-time-end');
        //value insertion into select
        for(let i = 0; i < numberOfHours; i++) {
          const valueFromTemplate = generateFromTemplate(spaceTimeTemplate, '.result__list-element-timetable-form-time-value');
          const valueFromTemplateEndTime = generateFromTemplate(spaceTimeTemplate, '.result__list-element-timetable-form-time-value');
          valueFromTemplate.textContent = `${i}:00 - ${i+1}:00`;
          valueFromTemplateEndTime.textContent = `${i}:00 - ${i+1}:00`;
          if(timeStamp) {
            for(let i = parseInt(timeStamp.split('-')[0]); i < parseInt(timeStamp.split('-')[1]); i++) {
              if(parseInt(valueFromTemplate.textContent.split('-')[0]) === i && parseInt(valueFromTemplate.textContent.split('-')[1]) === i+1) {
                valueFromTemplate.disabled = true;
                valueFromTemplate.style.backgroundColor = 'red';                
              };
            }
            // if(valueFromTemplate.textContent.includes(timeStamp.split('-')[0])) {
            //   valueFromTemplate.disabled = true;
            //   valueFromTemplate.style.backgroundColor = 'red';
            // };
            // if(valueFromTemplateEndTime.textContent.includes(timeStamp.split('-')[1])) {
            //   valueFromTemplateEndTime.disabled = true;
            //   valueFromTemplateEndTime.style.backgroundColor = 'red';
            // }
          }
          selectTimeStart.append(valueFromTemplate);
          selectTimeEnd.append(valueFromTemplateEndTime);
        }
        resultSectionList.append(spaceFromTemplate);
      });
    })
  });
});

// fomrSubmitButton.addEventListener('click', (evt) => {
//   console.log(filterToSend);
//   evt.preventDefault();
//   return fetch('/filter', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
      
//     }),
//   });
// })