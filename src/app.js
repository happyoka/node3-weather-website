const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast'); 


const hbs = require('hbs');

console.log(__dirname);

// Using path to go to public directory
console.log(path.join(__dirname, '../public'));
//console.log(__filename);

const app = express();
const port = process.env.PORT || 3000 ; // Exist or else 3000

// Define paths for Express config
// Serve static page
const publicDirectoryPath = path.join(__dirname, '../public');
// Instead of using view folder, use template folder
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars for engine and view location
app.set('view engine', 'hbs');
app.set('views', viewPath); // use templates folder instead of view folder
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res)=> {
    res.render('index', {
        title : 'Weather',
        name: 'Oka'
    });
});

app.get('/about', (req, res)=> {
    res.render('about', {
        title : 'About',
        name : 'Oka'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help',
        message : 'I Love Esther',
        name : 'Oka'
    });
});

// This will never get it to run
// Express will look for the public folder for matching 
// index.html has its special refer
// app.get('', (req, res) => {
//     //res.send('Hello express!');
//     res.send('<h1>weather</h1>');
// });

// app.get('/help', (req, res) => {
//     // res.send('Help page');

//     // express detect the json and automatically stringify the object
//     res.send([{
//         name: 'Andrew',
//         age: 27
//     },
//     {
//         name: 'Jackson',
//         age: 29
//     }]);

// });

// app.get('/about', (req, res) => {

//     // res.send('About page');

//     res.send('<h1>About</h1>');
// });

app.get('/weather', (req, res) => {
    
    const address = req.query.addres;
    if(!address){
        return res.send({
            error : 'Please provide address'
        });
    }

    geocode(address, (error, {latitude, longtitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        forecast(latitude, longtitude, (error, forcastData) => {
            if (error) {
                return res.send({
                    error
                });
            }
            return res.send({
                forecast: forcastData,
                location,
                address
            });
        });
    });

    // res.send({
    //     address,
    //     forecast : 'Weather is 50 degree',
    //     location : 'Singapore'
    // });
});

app.get('/products', (req, res)=>{
    if (!req.query.search) {
       return  res.send({
            error : 'You must provide a search term'
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
});

app.get('/help/*', (req, res) => {
    //res.send('Help article not found');
    res.render('404', {
        title : 'Error',
        message : 'Help article not found.',
        name : 'Oka'
    });
});

app.get('*', (req, res) => {
   // res.send('My 404 page');
   res.render('404', {
    title : 'Error',
    message : 'Page not found.',
    name : 'Oka'
});
});

// Start the sever in port 3000
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});