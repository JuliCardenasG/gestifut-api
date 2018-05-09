const express = require('express');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const auth = require('./routes/auth');
<<<<<<< HEAD
const tournaments = require('./routes/tournaments');
const sports = require('./routes/sports');
=======
>>>>>>> 49831d0cc9540e1ecc96c3796bf7180ef6b02504

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
<<<<<<< HEAD
app.use('/tournaments', tournaments);
app.use('/sports', sports);
=======
>>>>>>> 49831d0cc9540e1ecc96c3796bf7180ef6b02504

app.listen(8080);