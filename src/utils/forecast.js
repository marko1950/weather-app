const axios = require("axios");

const forecast = (latitude, longitude, callback) => {
  axios
    .get(
      "http://api.weatherstack.com/current?access_key=7b93b4091d4578a1c85d3aa76d1d2781&query=" +
        latitude +
        "," +
        longitude
    )
    .then(function ({ data }) {
      if (data.current === undefined) {
        callback("Error, not a good coordinate.", undefined);
      } else {
        callback(
          undefined,
          `${data.current.weather_descriptions[0]}. The temperature is ${data.current.temperature}, but it feels like ${data.current.feelslike}.`
        );
      }
    })
    .catch(function (error) {
      callback("Error, unable to connect to the server.", undefined);
    });
};

module.exports = forecast;
