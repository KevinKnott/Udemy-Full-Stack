const express = require("express");
const https = require("https");
require('dotenv').config();
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {

    res.sendFile(__dirname + "\\index.html");
})

app.post("/", function (req, res) {
    // console.log(req.body.cityName);
    var query = req.body.cityName;
    var units = "imperial"
    const endpoint = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + process.env.weatherAPIKEY + "&units=" + units
    https.get(endpoint, function (weatherResponse) {
        console.log(weatherResponse.statusCode);

        weatherResponse.on("data", function (data) {
            // Take hex data and format into JSON
            weatherData = JSON.parse(data);
            // console.log(weatherData);

            // Reverse the process
            // var something = {
            //     name: "Kevin",
            //     profession: "Coder"
            // };
            // console.log(JSON.stringify(something));

            var temperature = weatherData.main.temp;
            var feelsLike = weatherData.main.feels_like;
            var weatherDescription = weatherData.weather[0].description;
            var weatherIcon = weatherData.weather[0].icon;

            const imageURL = "https://openweathermap.org/img/wn/" + weatherIcon + "@4x.png";
            // console.log(imageURL);

            // console.log("It is " + temperature + " degrees F and it feels like " + feelsLike);
            // console.log("The weather outside currently " + weatherDescription);

            res.write("<h1>The temperature in " + query + " is " + temperature + " and it feels like " + feelsLike + "</h1>");
            res.write("<p>The weather outside is currently " + weatherDescription + "</p>");
            res.write("<img src=\"" + imageURL + "\" alt='Weather Icon' />");
            res.send();
        })
    })
})



app.listen(3000, function () {
    console.log("Server is running on port 3000");
})