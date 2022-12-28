const axios = require("axios");

const geocode = (address, callback) => {
  const geoUrl =
    "http://api.positionstack.com/v1/forward?access_key=b4aeea1d29623b8a6e5e1f073419c134&query=" +
    encodeURIComponent(address);
  axios
    .get(geoUrl)
    .then(({ data }) => {
      if (data.data.length === 0) {
        callback("Unable to find location,try another search", undefined);
      } else {
        callback(undefined, {
          latitude: data.data[0].latitude,
          longitude: data.data[0].longitude,
        });
      }
    })
    .catch(function (error) {
      callback("Error, unable to connect to the server.", undefined);
    });
};

module.exports = geocode;
