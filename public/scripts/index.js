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
      //inputed data variable test
      const { docs, day } = data;
      const dayStamp = new Date(day).getTime();
     
      docs.forEach((location) => {
        let timeStamp;
        let options;

        const datesArray = location.occupied.map((date) => {
          return new Date(date.split(',')[0]).getTime();
        });
        //think on sorting array in ascneding order
        //insert binary search for dates arrays  
        const matchedDay = binarySearchArray(datesArray, dayStamp, location);
        if(matchedDay) {
          timeStamp = matchedDay.split(',')[1];
        };
        // console.log(matchedDay.getDate(), matchedDay.getMonth()+1);
        // const timeStamp = location.occupied.find((el) => {
        //   return el.includes(matchedDay.getDate() && matchedDay.getMonth()+1);
        // });
        // for(let i = 0; i < location.occupied.length; i++) {
        //   const dayStamp = location.occupied[i].split(',')[0];
        //   if(day === dayStamp) {
        //     timeStamp = location.occupied[i].split(',')[1];
        //   };
        // };
        
        const spaceFromTemplate = generateFromTemplate(spaceTemplate, '.result__list-element');
        spaceFromTemplate.querySelector('.result__list-element-span_space').textContent = location.description;
        spaceFromTemplate.querySelector('.result__list-element-span_price').textContent = location.price;
        spaceFromTemplate.querySelector('.result__list-element-span_occupied').textContent = `${timeStamp ? `Место занято ${new Date(day).getDate()} числа в ${timeStamp}` : "Сегодня свободно весь день"}`;

        //options test
        const optionsDiv = spaceFromTemplate.querySelector('.result__list-element-options');
        
        if(location.type === 'craft') {
          options = ['инструменты', 'материалы', 'вытяжка'];
        }
        if(location.type === 'performance') {
          options = ['оборудование', 'свет', 'бар', 'колонки', 'звукорежиссер'];
        }
        if(location.type === 'leisure') {
          options = ['свет', 'бар', 'еда', 'кейтеринг', 'музыкальное оборудование'];
        }
        if(location.type === 'shop') {
          options = ['музыка', 'свет', 'модели', 'манекены', 'фотограф'];
        }
        options.forEach((option) => {
          const optionFromTemplate = generateFromTemplate(spaceOptionsButton, '.result__list-element-options-button');
          optionFromTemplate.textContent = option;
          optionFromTemplate.addEventListener('click', () => {
            console.log(`добавить к финальной стоимости стоимость услуги ${option}`);
          });
          optionsDiv.append(optionFromTemplate);
        });
        // const selectTimeStart = spaceFromTemplate.querySelector('.result__list-element-timetable-form-time-start');
        // const selectTimeEnd = spaceFromTemplate.querySelector('.result__list-element-timetable-form-time-end');
        // // value insertion into select
        // for(let i = 0; i < numberOfHours; i++) {
        //   const valueFromTemplate = generateFromTemplate(spaceTimeTemplate, '.result__list-element-timetable-form-time-value');
        //   const valueFromTemplateEndTime = generateFromTemplate(spaceTimeTemplate, '.result__list-element-timetable-form-time-value');
        //   valueFromTemplate.textContent = `${i}:00 - ${i+1}:00`;
        //   valueFromTemplateEndTime.textContent = `${i}:00 - ${i+1}:00`;
        //   if(timeStamp) {
        //     for(let i = parseInt(timeStamp.split('-')[0]); i < parseInt(timeStamp.split('-')[1]); i++) {
        //       if(parseInt(valueFromTemplate.textContent.split('-')[0]) === i && parseInt(valueFromTemplate.textContent.split('-')[1]) === i+1) {
        //         valueFromTemplate.disabled = true;
        //         valueFromTemplate.style.backgroundColor = 'red';                
        //       };
        //     }
        //   }
        //   selectTimeStart.append(valueFromTemplate);
        //   selectTimeEnd.append(valueFromTemplateEndTime);
        // }
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