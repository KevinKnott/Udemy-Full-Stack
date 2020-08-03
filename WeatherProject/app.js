const express = require("express");
const https = require("https");
const dotenv = require('dotenv').config();

const app = express();


app.get("/", function (req, res) {

    const endpoint = "https://api.openweathermap.org/data/2.5/weather?q=Grapevine,TX,US&appid=" + process.env.weatherAPIKEY + "&units=imperial"
    https.get(endpoint, function (weatherResponse) {
        console.log(weatherResponse.statusCode);

        weatherResponse.on("data", function (data) {
            // Take hex data and format into JSON
            weatherData = JSON.parse(data);
            console.log(weatherData);

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
            console.log(imageURL);

            console.log("It is " + temperature + " degrees F and it feels like " + feelsLike);
            console.log("The weather outside currently " + weatherDescription);

            res.write("<h1>It is " + temperature + " degrees F and it feels like " + feelsLike + "</h1>");
            res.write("<p>The weather outside is currently " + weatherDescription + "</p>");
            res.write("<img src=\"" + imageURL + "\" alt='Weather Icon' />");
            res.send();
        })
    })

    // res.sendFile(__dirname + "\\index.html");
})

app.listen(3000, function () {
    console.log("Server is running on port 3000");
})