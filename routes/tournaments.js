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
        req.user = req.user;
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



router.get('/user',  passport.authenticate('jwt', { session: false}), (req, res) => {
    let user = req.user;
    Tournament.getTournamentsCreatedByUser(user.id).then(tournaments => {
        if(tournaments.message){
            let resp = {
                ok: false,
                error: tournaments.message
            }
            res.send(resp)
        }
        else {
            let resp = {
                ok: true,
                tournaments: tournaments
            };
            res.send(resp);
        }
    }).catch(error => {
        let resp = {
            ok: false,
            error: error
        }
        res.status(500).send(resp);
    })
})

router.post('/', (req, res) => {
    let tournamentJson = req.body;
    let newTournamentJson = {
        id: tournamentJson.id,
        tournament_type_id: tournamentJson.tournamentTypeId,
        sport_id : tournamentJson.sportId,
        admin_id : tournamentJson.adminId,
        name : tournamentJson.name,
        teams_number : tournamentJson.teamsNumber,
        password: tournamentJson.password
    };
    Tournament.createTournament(newTournamentJson).then(tournamentId => {
        let resp = {
            ok: true,
            id: tournamentId
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
