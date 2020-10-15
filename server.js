// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { response } = require('express');
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

const isInvalidDate = (date) => {
  const time = date.getTime();
  return Number.isNaN(time);
};

const isNumberString = (string) => {
  const regex = /^\d+$/;
  return regex.test(string);
};

const getCurrentDate = () => {
  const response = {};
  const date = new Date();
  response.unix = date.getTime();
  response.utc = date.toUTCString();
  return response;
}

const getDateFromString = (string) =>  {
  const response = {};
  let argument = string;

  if (isNumberString(string)) {
    argument = parseInt(string); 
  }

  const date = new Date(argument);

  if (isInvalidDate(date)) {
    response.error = 'Invalid date';
  } else {
    response.unix = date.getTime();
    response.utc = date.toUTCString();
  }

  return response;
};

app.get("/api/timestamp/:date_string?", (req, res) => {
  let response;
  const dateParam = req.params.date_string;

  if (dateParam === undefined) {
    response = getCurrentDate();
  } else {
    response = getDateFromString(dateParam);
  }
  res.json(response);
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
