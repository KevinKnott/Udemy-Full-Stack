const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
dotenv = require("dotenv").config();


const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
// Provides path to the static files by a relative url
app.use(express.static("public"));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function (req, res) {
    // You must add name field to form and have it post to / for this to work
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                mergeField: {
                    FNAME: fname,
                    LNAME: lname,
                }
            }
        ]
    }
    // console.log(fname, lname, email);

    // Convert to json for mailchimp api request
    var jsonData = JSON.stringify(data);
    var url = "https://" + process.env.serverID + ".api.mailchimp.com/3.0/lists/" + process.env.listID;
    var options = {
        method: "Post",
        auth: "Kevin:" + process.env.mailchimpAPIKey
    }

    // console.log(url, options)
    // Create a http request with the above options
    const mailChimpRequest = https.request(url, options, function (mailChimpResponse) {
        mailChimpResponse.on("data", function (data) {
            console.log(JSON.parse(data));

            if (mailChimpResponse.statusCode == 200) {
                res.sendFile(__dirname + "/success.html");
                // console.log("Good Request");
            } else {
                res.sendFile(__dirname + "/failure.html");
                // console.log("Request failed please try again");
            }

        })

    })

    // Write this data with request
    mailChimpRequest.write(jsonData);
    mailChimpRequest.end();

})

app.listen(3000, function () {
    console.log("Server up and listening on port 3000")
})