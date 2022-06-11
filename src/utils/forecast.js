const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=c379acfde0aa5e7837dbe1eca7389d12&query=${longitude},${latitude}&units=m`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to weather service!');
    } else if (body.error) {
      callback('Unable to find location');
    } else {
      const description = body.current.weather_descriptions[0];
      const temp = body.current.temperature;
      const feelsLike = body.current.feelslike;
      const windSpeed = body.current.wind_speed;
      callback(
        error,
        `${description}. It is currently ${temp} degrees celsius outside. It feels like ${feelsLike} degrees. You may also be interested to know the wind speed is ${windSpeed} miles per hour.`
      );
    }
  });
};

module.exports = forecast;
