fetch('/showSpaces')
.then((res) => {
  return res.json();
})
.then((data) => {
  return data;
});

inputsToSend.forEach((input) => {
  input.addEventListener('input', () => {
    filterToSend[input.name] = input.value;
    console.log(filterToSend);
    return fetch('/filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filterToSend),
    })
    .then((res) => {
      res.json();
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