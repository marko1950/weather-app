const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Marko Kusacic",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Marko Kusacic",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide a search term" });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/weather", (req, res) => {
  const city = req.query.address;

  if (city) {
    geocode(city, (error, { latitude, longitude } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          address: req.query.address,
        });
      });
    });
  }

  if (!req.query.address) {
    return res.send({ error: "No address" });
  }
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Marko Kusacic",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error",
    name: "Marko Kusacic",
    erorrMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error",
    name: "Marko Kusacic",
    erorrMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on server 3000");
});
