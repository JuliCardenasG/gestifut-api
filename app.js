const express = require('express');
const cors = require('cors');
const passport = require('passport');

let app = express();

app.use(cors());

app.use('/public', express.static(__dirname + '/public'));