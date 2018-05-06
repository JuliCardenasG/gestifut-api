const express = require('express');
const Errors = require('../utils/errors');
const passport = require('passport');
const Tournament = require('../models/tournament');

let router = express.Router();

router.use((req, res, next) => {
    passport.authenticate('jwt', { session: false}, (err, user, info) => {
        if (err){
            let resp = {
                ok: false,
                error: 'Ha ocurrido un error'
            };
            return res.status(500).send()
        }
        if(!user) {
            let resp = {
                ok: false,
                error: 'No autorizado'
            };
            return res.status(401).send(resp);
        }
        next();
    })(req, res);
})

router.get('/', (req, res) => {
    Tournament.getTournaments().then(tournaments => {
        if(tournaments.message){
            let resp = {
                ok: false,
                error: tournaments.message
            }
            res.send(resp)
        }
        let resp = {
            ok: true,
            tournaments: tournaments
        };
        res.send(tournaments);
    }).catch(error => {
        let resp = {
            ok: false,
            error: error
        }
        res.status(500).send(resp);
    })
})

module.exports = router;