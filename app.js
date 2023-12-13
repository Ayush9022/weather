const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {

    const query = req.body.cityName;
    const apikey = '577995c6a13e298fbae2fe475c9639a1';
    const unit = 'metric';
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apikey;

    https.get(url, function (response) {

        console.log(response.statusCode);

        response.on("data", function (data){
            const weatherData = JSON.parse(data);
            const weatherTemp = weatherData.main.temp;
            const weatherdiscription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const link = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write('<p>The weather condition is : ' + weatherdiscription + '</p>');
            res.write("<h1>The present temperature in " + query + " is : " + weatherTemp + " degree celcius</h1>");
            res.write("<img src=" + link + ">");
            res.send();
        });
        
    });

});

app.listen(3000, function () {
    console.log("running successfully on port 3000");
});
