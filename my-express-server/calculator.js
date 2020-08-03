const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// Could be bodyParser.text or bodyParser.json to get other info
// This one is for body data
app.use(bodyParser.urlencoded({ extended: true }));

// Creates a mapping from / to a function that handles the request and gives back a response
// Best practice app.get("/", function (req, res) {
// app.get("/", function (request, response) {
//     console.log(request);

//     // Giving a response to display
//     // response.send("Hello");
//     response.send("<h1>Hello World!</h1>");


// })

app.get("/", function (req, res) {
    console.log(__dirname);
    res.sendFile(__dirname + "\\index.html")
})

app.post("/", function (req, res) {
    // console.log("Numbers" + req);
    // After body parser
    console.log("Numbers " + req.body.num1 + " " + req.body.num2);

    // All req.body comes as string
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var result = num1 + num2;

    res.send("Your calculation of adding " + num1 + " + " + num2 + " is " + result);

    // I now need body-parser to parse body form data
})


app.get("/bmicalculator", function (req, res) {
    res.sendFile(__dirname + "\\bmiCalculator.html");
})

app.post("/bmicalculator", function (req, res) {
    var height = parseFloat(req.body.height);
    var weight = parseFloat(req.body.weight);
    var result = weight / (Math.pow(height, 2));

    res.send("<h2>Your BMI is " + result + " </h2>")

})
// // Hand other routes
// app.get("/contact", function (req, res) {
//     res.send("Contact me at: kkknott93@gmail.com");
// });

// app.get("/about", function (req, res) {
//     res.send("Some super simple bio that explains that I am learning more and more about full-stack dev");
// });

// app.get("/hobbies", function (req, res) {
//     res.send("<ul><li>Coffee</li><li>Code</li><li>Gin</li></ul>");
// });

app.listen("3000", function () {
    console.log("Server has started on port 3000")
}); 