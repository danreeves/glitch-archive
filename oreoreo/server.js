const express = require("express");
const app = express();

app.get("/style.css", function (request, response) {
  response.sendFile(__dirname + "/style.css");
});

app.get("/script.js", function (request, response) {
  response.sendFile(__dirname + "/script.js");
});

app.get("*", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT);
