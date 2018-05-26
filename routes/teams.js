const express = require('express');
const Errors = require('../utils/errors');
const passport = require('passport');
const Team = require('../models/team');

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

router.get('/tournaments/:id', (req, res) => {
    let tournamentId = req.params.id;
    Team.getTournamentTeamsWithPlayers(tournamentId).then(teams => {
        if (teams.message) {
            let resp = {
                ok: false,
                error: teams.message
            }
            res.send(resp)
        }
        else {
            let resp = {
                ok: true,
                teams: teams
            };
            res.send(resp);
        }
    })
})

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    let userId = req.user.id;
    Team.getUserParticipatedTeams(userId).then(teams => {
        if (teams.message) {
            let resp = {
                ok: false,
                error: teams.message
            }
            res.send(resp)
        }
        let resp = {
            ok: true,
            teams: teams
        };
        res.send(resp);
    })
})

router.post('/add-player', (req, res) => {
    let userId = req.body.userId;
    let teamId = req.body.teamId;
    Team.addUserToTeam(userId, teamId).then(insertId => {
        let resp = {
            ok: true,
            id: insertId
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

router.post('/', (req, res) => {
    let teamJson = req.body;
    let newTeamJson = {
        tournament_id: teamJson.tournamentId,
        name: teamJson.name,
        image: teamJson.image
    };

    Team.createTeam(newTeamJson).then(teamId => {
        let resp = {
            ok: true,
            id: teamId
        };
        res.send(resp);
    }).catch(error => {
        let resp = {
            ok: false,
            error: error
        }
        res.status(500).send(resp);
    })
});

router.put('/:id', (req, res) => {
    let teamJson = req.body;
    let editTeamJson = {
        tournament_id: teamJson.tournamentId,
        name: teamJson.name,
        image: teamJson.image
    };
    Team.updateTeam(teamJson).then(affRows => {
        let resp = {
            ok: true,
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

router.delete('/:id', (req, res) => {
    let teamId = req.params.id;
    Team.deleteTeam(teamId).then(affRows => {
        let resp = {
            ok: true,
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