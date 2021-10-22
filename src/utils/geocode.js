const request = require('request');

// const geoLocationURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZHJlYW1va2EiLCJhIjoiY2t1ejhoY2MyMDlveTJvcTFhaHlzMXhhMiJ9.lLzRQru0JGHHnc38w-VxdA&limit=1';
// const geoErrorLocationURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/esther123444.json?access_token=pk.eyJ1IjoiZHJlYW1va2EiLCJhIjoiY2t1ejhoY2MyMDlveTJvcTFhaHlzMXhhMiJ9.lLzRQru0JGHHnc38w-VxdA&limit=1';
// request({ url: geoLocationURL, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect MapBox Server!!!');
//     }
//     else if (response.body.features.length === 0) {
//         console.log('Unable to find location. Try other search.');
//     } else {
//         const latitude = response.body.features[0].center[1];
//         const longtitude = response.body.features[0].center[0];
//         console.log("Lat : ", latitude, " Lon : ", longtitude);
//     }
// });

// const geoCode = (address, callback) => {
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +
//         '.json?access_token=pk.eyJ1IjoiZHJlYW1va2EiLCJhIjoiY2t1ejhoY2MyMDlveTJvcTFhaHlzMXhhMiJ9.lLzRQru0JGHHnc38w-VxdA&limit=1';
//     request({url : url, json: true}, (error, response) => {
//         if (error) {
//             callback('Unable to connect Location Server!!!', undefined);
//         } else if (response.body.features.length === 0) {
//             callback('Unable to find location. Try other search.', undefined);
//         } else {
//             callback(undefined, {
//                 latitude : response.body.features[0].center[1],
//                 longtitude : response.body.features[0].center[0],
//                 location : response.body.features[0].place_name
//             });
//         }
//     });
// };

// use object property shorthand
// use destructuring
const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +
        '.json?access_token=pk.eyJ1IjoiZHJlYW1va2EiLCJhIjoiY2t1ejhoY2MyMDlveTJvcTFhaHlzMXhhMiJ9.lLzRQru0JGHHnc38w-VxdA&limit=1';
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect Location Server!!!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try other search.', undefined);
        } else {
            callback(undefined, {
                latitude : body.features[0].center[1],
                longtitude : body.features[0].center[0],
                location : body.features[0].place_name
            });
        }
    });
};

module.exports = geoCode;