require('dotenv').config();
const express = require('express');
const apiRouter = require('./api');
const cors = require('cors');
const bodyParser = require('body-parser');

var app = express();

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('./api'), apiRouter);

app.listen(3000, function() {
  console.log('good');
});
