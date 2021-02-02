const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=30b1ebcc5469de897e214d8e2fd41243&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service", undefined);
        } else if (body.error) {
            callback("Unable to find location", undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currenty " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degree");
        }
    });
};

module.exports = forecast;