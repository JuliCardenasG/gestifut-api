const express = require('express');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const auth = require('./routes/auth');
const tournaments = require('./routes/tournaments');
const sports = require('./routes/sports');

let app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '5mb'
}));

app.use(bodyParser.json({
    extended: true,
    limit: '5mb'
}));

app.use('/public', express.static(__dirname + '/public'));

app.use('/auth', auth);
app.use('/tournaments', tournaments);
app.use('/sports', sports);

app.listen(8080);