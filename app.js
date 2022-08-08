const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

  res.sendFile(__dirname + "/index.html");
 })

 app.post("/", function(req, res){
   const query = req.body.cityName;
   const apiKey = "99b11b11461cc0e6af653c937feb3a61";
   const unit = "metric"
   const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units=" +unit
   https.get(url, function(response){
     console.log(response.statusCode);

     response.on("data", function(data){
       const weatherData = JSON.parse(data);
       const country = weatherData.sys.country
       const temp = weatherData.main.temp
       const weatherDescription = weatherData.weather[0].description
       const icon = weatherData.weather[0].icon
       const imageUrl = "http://openweathermap.org/img/wn/" +icon+"@2x.png"
       res.write("<p>The weather description is " + weatherDescription+"</p>")
       res.write("<h1>The Temperature in " + query + " , " + country + " is " + temp + " degree celsius.</h1>")
       res.write("<img src="+imageUrl+">")
       res.send();
     })
   })
 })




app.listen(3000, function(){
  console.log("Server is running in port 3000");
})
