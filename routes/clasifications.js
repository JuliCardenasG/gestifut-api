const express = require('express');
const Errors = require('../utils/errors');
const passport = require('passport');
const Clasification = require('../models/clasification');

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

router.get('/tournament/:id', (req, res) => {
    let tournamentId = req.params.id;
    Clasification.getTournamentClasification(tournamentId).then(clasifications => {
        let resp = {
            ok: true,
            clasifications: clasifications
        };
        res.send(resp);
    })
})

router.get('/:id', (req, res) => {
    let clasificationId = req.params.id;
    Clasification.getClasification(clasificationId).then(clasification => {
        let resp = {
            ok: true,
            clasification: clasification
        };
        res.send(resp);
    });
})

module.exports = router;

