const express = require('express');
const User = require('../models/user');
const config = require('../models/config');
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

let router = express.Router();

passport.use(new Strategy({
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
},
    (payload, done) => {
        if (payload.id) {
            return done(null, { id: payload.id, name: payload.name, email: payload.email });
        }
        else {
            return done(new Error('User not found'), null)
        }
    }
));

router.post('/login', (req, res) => {
    let loginJson = req.body;
    User.login(loginJson).then(responseToken => {
        let resp = {
            ok: true,
            token: responseToken
        }
        res.send(resp);
    }).catch(error => {
        let resp = {
            ok: false,
            error: error
        }
        res.status(500).send(resp);
    })
})

router.get('/user', passport.authenticate('jwt', { session: false}), (req, res) => {
    let resp = {
        ok: true,
        user: req.user
    };
    res.send(resp);
});

router.get('/token', (req, res) => {
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
        return res.send({ok: true});
    })(req, res);
})

module.exports = router;