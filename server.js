// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const isNotDateString = (date) => {
  const time = date.getTime();
  return Number.isNaN(time);
};

const isUnixDate = (date) => {
  const isInteger = Number.isInteger(date);
  const utcString = date.toUTCString();

  return isInteger && utcString;
};

const getDate = (param) => {
  if (!param) return new Date();
  
  return new Date(param);
}

app.get("/api/timestamp/:date_string?", (req, res) => {
  const dateString = req.params.date_string;
  const date = getDate(dateString);
  let response = {};

  if (isNotDateString(date)) {
    response.error = 'Invalid date';
  } else {
    response.unix = date.getTime();
    response.utc = date.toUTCString();
  }
  res.json(response);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
