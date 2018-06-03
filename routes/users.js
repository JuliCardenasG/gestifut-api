const express = require('express');
const passport = require('passport');
const Errors = require('../utils/errors');
const User = require('../models/user');
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

router.get('/:id', (req, res) => {
    let userId = req.params.id;
    console.log(userId);
    User.getUser(userId).then(user => {
        let resp = {
            ok: true,
            user: user
        };
        res.send(resp);
    })
    .catch(error => {
        let resp = {
            ok: false,
            error: error
        }
        res.status(500).send(resp);
    })
})

router.get('/', (req, res) => {
    User.getUsers().then(users => {
        let resp = {
            ok: true,
            users: users
        };
        res.send(resp);
    })
    .catch(error => {
        let resp = {
            ok: false,
            error: error
        }
        res.status(500).send(resp);
    })
})

module.exports = router;