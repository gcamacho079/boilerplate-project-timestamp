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

const isInvalidDateString = (string) => {
  const time = string.getTime();
  return Number.isNaN(time);
};

const isInt = (param) => parseInt(param);

const getCurrentDate = () => new Date();

const getDateFromString = (string) =>  new Date(string);

app.get("/api/timestamp/:date_string?", (req, res) => {
  const dateParam = req.params.date_string;
  //const date = getDate(dateString);
  let date;
  let response = {};
  const paramType = typeof dateParam;
  response.type = paramType;

  if (dateParam === undefined) {
    date = getCurrentDate();
    response.date = date;
  } else if (paramType === 'string') {
    response.int = dateParam;
    //date = getDateFromString(dateParam);
  }
  // if (isNotDateString(date)) {
  //   const number = parseInt(dateString);
  //   if (!Number.isNaN(number)) {
  //     response.unix = number;
  //   } else {
  //     response.error = 'Invalid date';
  //   }
  // } else {
  //   response.unix = date.getTime();
  //   response.utc = date.toUTCString();
  // }
  res.json(response);
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
