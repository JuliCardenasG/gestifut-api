const express = require('express');
const User = require('../models/user');
const config = require('../models/config');
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const ImageHandler = require('../utils/imageHandler');
const Errors = require('../utils/errors');

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

router.post('/register', (req, res) => {
    let newUser = req.body;
    ImageHandler(newUser.image).then(image => {
        newUser.image = image;
        User.registerUser(newUser).then(resultId => {
            if(resultId){
                let loginJson = { 
                    email: newUser.email,
                    password: newUser.password
                }
                User.login(loginJson).then(responseToken => {
                    let resp = {
                        ok: true,
                        token: responseToken,
                        userId: resultId
                    }
                    res.send(resp);
                }).catch(error => {
                    let resp = {
                        ok: false,
                        error: error
                    }
                    return res.status(500).send(resp);
                })
            }
        }).catch(error => {
            console.log(error);
            if(error.sqlState == '23000'){
                let errorResp = {
                    ok: false,
                    error: 'El email ya está registrado'
                }
                return res.status(400).send(errorResp);
            }
            let response = Errors.errorResponse(error);
            res.status(500).send(response);
        })
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