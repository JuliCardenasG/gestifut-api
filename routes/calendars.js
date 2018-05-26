const express = require('express');
const Errors = require('../utils/errors');
const passport = require('passport');
const Tournament = require('../models/tournament');
const Team = require('../models/team');
const ImageHandler = require('../utils/imageHandler');
const Calendar = require('../models/calendar');


let router = express.Router();

router.use((req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            let resp = {
                ok: false,
                error: 'Ha ocurrido un error'
            };
            return res.status(500).send()
        }
        if (!user) {
            let resp = {
                ok: false,
                error: 'No autorizado'
            };
            return res.status(401).send(resp);
        }
        req.user = req.user;
        next();
    })(req, res);
})

router.post('/', (req, res) => {
    const calendarJson = req.body;
    const newCalendarJson = {
        tournament_id: calendarJson.tournamentId
    };
    Calendar.createCalendar(newCalendarJson).then(calendarId => {
        let resp = {
            ok: true,
            calendarId: calendarId
        };
        res.send(resp);
    }).catch(error => {
        let resp = {
            ok: false,
            error: error
        }
        res.status(500).send(resp);
    })
})

module.exports = router;