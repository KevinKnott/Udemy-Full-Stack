const express = require("express");
const https = require("https");
const dotenv = require('dotenv').config();

const app = express();


app.get("/", function (req, res) {

    const endpoint = "https://api.openweathermap.org/data/2.5/weather?q=Grapevine,TX,US&appid=" + process.env.weatherAPIKEY + "&units=imperial"
    https.get(endpoint, function (weatherResponse) {
        console.log(weatherResponse)
    })

    res.sendFile(__dirname + "\\index.html");
})

app.listen(3000, function () {
    console.log("Server is running on port 3000");
})