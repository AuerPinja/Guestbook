// hakee tarvittavat moduulit
var express = require("express");
var app = express();
var fs = require("fs");

// luodaan palvelinportti
const PORT = 3000;

// pyörittää staattisia tiedostoja public-kansiosta
app.use(express.static("public"));

// luo juurireitti, joka palauttaa selaimeen index.html tiedoston sisällön
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// luo reitti uuden viestin luomiseen, mikä palauttaa newmessage.html tiedoston sisällön
app.get("/newmessage", function (req, res) {
  res.sendFile(__dirname + "/public/newmessage.html");
});

// parse application/x-www-form-urlencoded
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// luodaan reitti, joka parsii .json tiedoston sisällön taulukkomuotoon ja palauttaa sen selaimeen
app.get("/messages", function (req, res) {
  var data = require(__dirname + "/data/messages.json");

  // Luodaan div, johon JSON-tiedoston sisältö asetetaan
  var results = '<div style=\"font-family: Verdana; padding: 30px; margin: 10px; background: aliceblue\">';

  for (var i = 0; i < data.length; i++) {
    results +=
    "<table style= \"margin-bottom: 10px \">"+
    "<tr><td style=\"padding-bottom: 5px\"><strong>" + data[i].Name + "</strong></td></tr>" +
    "<tr><td style=\"font-size: 12px; padding-bottom: 10px\"><i>" + data[i].Date + ", " + data[i].Country + "</i></td>" +
    "<tr><td>" + data[i].Message + "</td>" +
    "</table>"+ "<hr>"
     
  }

  res.send(results);
});

// hakee newmessage.html -tiedoston datan ja lähettää sen selaimeen
app.get("/newmessage", function (req, res) {
  res.sendFile(__dirname + "/public/newmessage.html");
});

// lisätään POST polku (route) joka hakee tiedot ja tallentaa ne messages.json tiedostoon.
app.post("/newmessage", function (req, res) {
  // Load the existing data from a file and assign to an array (lista)
  const data = require(__dirname + "/data/messages.json");

  //luodaan uusi viesti
  const nimi = req.body.name;
  const country = req.body.country;
  const message = req.body.message;
  const date =
    new Date().getDate() +
    "." +
    (1 + parseInt(new Date().getMonth())) +
    "." +
    new Date().getFullYear();

 
  //...pusketaan viesti JSON-tiedostoon
  data.push({
    "Name": nimi,
    "Country": country,
    "Message": message,
    "Date": date,
  });

  console.log(data);

  // Convert the JSON object to a string format
  var jsonStr = JSON.stringify(data);

  // Write data to a file
  fs.writeFile(__dirname + "/data/messages.json", jsonStr, (err) => {
    if (err) throw err;
    console.log("Message was sent.");
  });
  res.send("Message sent successfully! Check the messages <a href=\"/messages\">here!</a>");
});

// käynnistetään palvelin kuuntelemaan valittua porttia
app.listen(PORT, function () {
  console.log("Listening to port " + PORT);
});
