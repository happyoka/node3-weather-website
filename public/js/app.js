console.log('Client side javascript file is loaded!');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// });

// fetch('http://localhost:3000/weather?addres=singapore').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error);
//         } else {
//             console.log(data.location, data.forecast);
//         }
//         console.log(data);
//     });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e)=>{
    const baseURL = '/weather?addres=';
    const location = search.value;

    e.preventDefault();
    // console.log(location);
    // console.log('testing!');

    // Set default message
    messageOne.textContent = 'Loading message';
    messageTwo.textContent = '';

    fetch(baseURL + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error;
            //console.log(data.error);
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
            //console.log(data.location, data.forecast);
        }
        // console.log(data);
    });
});

});