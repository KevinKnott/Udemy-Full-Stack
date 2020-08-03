const express = require('express');
const app = express();

// Creates a mapping from / to a function that handles the request and gives back a response
// Best practice app.get("/", function (req, res) {

app.get("/", function (request, response) {
    console.log(request);

    // Giving a response to display
    // response.send("Hello");
    response.send("<h1>Hello World!</h1>");
})

app.listen("3000", function () {
    console.log("Server has started on port 3000")
});