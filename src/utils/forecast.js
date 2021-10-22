const request = require('request');

// const forecast = (lat, lon, callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=6c67aa24a5df3c21379836515acf90fb&query='
//         + lat + ',' + lon + '&units=f';
//     request({ url: url, json: true }, (error, response) => {
//         if (error) {
//             callback('Unable to connect weather service!!!', undefined);
//         } else if (response.body.error) {
//             callback('Error msg : ' + response.body.error.info, undefined);;
//         } else {
//             callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature +
//                 ' degress out. It feel like ' + response.body.current.feelslike +
//                 ' degrees in.');
//         }
//     });
// };

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6c67aa24a5df3c21379836515acf90fb&query='
        + lat + ',' + lon + '&units=f';
    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect weather service!!!', undefined);
        } else if (body.error) {
            callback('Error msg : ' + body.error.info, undefined);;
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature +
                ' degress out. It feel like ' + body.current.feelslike +
                ' degrees in.');
        }
    });
};

// const url = 'http://api.weatherstack.com/current?access_key=6c67aa24a5df3c21379836515acf90fb&query=37.8267,-122.4233&units=f';
// const errorUrl = 'http://api.weatherstack.com/current?access_key=6c67aa24a5df3c21379836515acf90fb&query=';
// request({ url: url, json: true }, (error, response) => {
//     // Without request, json set to true
//     // const data = JSON.parse(response.body);
//     // console.log(data);
//     // console.log(data.current);
//     if (error) {
//         console.log('Unable to connect weather service!!!');
//     } else if (response.body.error) {
//         console.log('Error msg : ', response.body.error.info);
//     } else {
//         console.log(response.body.current.weather_descriptions[0], '. It is currently ', response.body.current.temperature,
//             ' degress out. It feel like ', response.body.current.feelslike,
//             ' degrees in.');
//     }

// });

module.exports = forecast;