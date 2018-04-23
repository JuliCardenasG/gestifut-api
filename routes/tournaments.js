const express = require('express');
const Errors = require('../utils/errors');
const passport = require('passport');

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
    
})