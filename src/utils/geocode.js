const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibW96YXJ0NTAwIiwiYSI6ImNqenF1NTFhYjBwdTczaG56Nm15MG02OTIifQ.ggWxrIQOMWYsQaGcCeeTyg&limit`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to geolocation service.', undefined);
    } else if (body.features.length === 0) {
      callback("I can't find that location. Try another search");
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
