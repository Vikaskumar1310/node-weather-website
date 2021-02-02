const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//Setup handlerbars engines and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

//routers
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vikas'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Vikas kumar'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'Hello if you need any help please contact on the following number. Thanks!',
        title: 'Help',
        name: 'vikas'
    });
})

//app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Your must provide the address"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: "Unable to find location . Please provide correct address"
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                address: req.query.address,
                location,
                forecast: forecastData,

            });
        });
    });
});

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: "you must provide a search term"
//         })
//     }

//     console.log(req.query.search)
//     res.send({
//         products: []
//     });
// });

//here * means wild card character
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vikas',
        errorMessage: "Help article not found."
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vikas',
        errorMessage: "Sorry!!! Page not found!"
    })
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});