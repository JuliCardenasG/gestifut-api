const express = require('express');
const Errors = require('../utils/errors');
const passport = require('passport');
const Sport = require('../models/sport');

let router = express.Router();

router.use((req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            let resp = {
                ok: false,
                error: 'Ha ocurrido un error'
            };
            return res.status(500).send(resp)
        }
        if (!user) {
            let resp = {
                ok: false,
                error: 'No autorizado'
            };
            return res.status(401).send(resp);
        }
        next();
    })(req, res);
})

router.get('/:id', (req, res) => {
    let sportId = req.params.id;
    Sport.getSport(sportId).then(sport => {
        if (sport.message) {
            let resp = {
                ok: false,
                error: 'No se han encontrado deportes'
            };
            return res.send(resp)
        }
        else {
            let resp = {
                ok: true,
                sport: sport
            }
            res.send(resp)
        }
    })
})

router.get('/', (req, res) => {
    Sport.getSports().then(sports => {
        if (sports.message) {
            let resp = {
                ok: false,
                error: 'No se han encontrado deportes'
            };
            return res.send(resp)
        }
        else {
            let resp = {
                ok: true,
                sports: sports
            }
            res.send(resp)
        }
    }).catch(error => {
        let resp = {
            ok: false,
            error: error
        }
        res.status(500).send(resp);
    })
})

module.exports = router;