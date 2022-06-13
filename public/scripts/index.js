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
        const { options } = location.options;
        //think on sorting array in ascneding order
        //insert binary search for dates arrays  
        const matchedDay = binarySearchArray(location.occupied, dayStamp, location);
        timeStamp = matchedDay;
        // console.log(matchedDay);
        // if(matchedDay) {
        //   timeStamp = matchedDay.split(',')[1];
        // };
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
        
        options.forEach((option) => {
          const optionFromTemplate = generateFromTemplate(spaceOptionsButton, '.result__list-element-options-button');
          optionFromTemplate.textContent = option;
          optionFromTemplate.addEventListener('click', () => {
            console.log(`добавить к финальной стоимости стоимость услуги ${option}`);
          });
          optionsDiv.append(optionFromTemplate);
        });

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