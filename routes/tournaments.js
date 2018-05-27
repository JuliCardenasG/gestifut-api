const express = require('express');
const Errors = require('../utils/errors');
const passport = require('passport');
const Tournament = require('../models/tournament');
const Team = require('../models/team');
const ImageHandler = require('../utils/imageHandler');
const Calendar = require('../models/calendar');
const Matchday = require('../models/matchday');
const Match = require('../models/match');
const Clasification = require('../models/clasification');
const robin = require('roundrobin');
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

router.get('/user', passport.authenticate('jwt', { session: false }), (req, res) => {
    let user = req.user;
    Tournament.getTournamentsCreatedByUser(user.id).then(tournaments => {
        if (tournaments.message) {
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

router.get('/:id', (req, res) => {
    const tournamentId = req.params.id;
    Tournament.getTournament(tournamentId).then(tournament => {
        if (tournament.message) {
            let resp = {
                ok: false,
                error: tournament.message
            }
            res.send(resp)
        }
        else {
            Team.getTournamentTeamsWithPlayers(tournament.id).then(teams => {
                tournament.teams = teams;
                Matchday.getMatchdaysByTournament(tournamentId).then(matchdays => {
                    tournament.matchdays = matchdays;
                    Match.getTournamentMatches(tournamentId).then(matches => {
                        tournament.matches = matches;
                        let resp = {
                            ok: true,
                            tournament: tournament
                        };
                        res.send(resp);
                    })
                })
            })
        }
    }).catch(error => {
        let resp = {
            ok: false,
            error: error
        }
        res.status(500).send(resp);
    })
})

router.get('/', (req, res) => {
    Tournament.getTournaments().then(tournaments => {
        if (tournaments.message) {
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
        res.send(resp);
    }).catch(error => {
        let resp = {
            ok: false,
            error: error
        }
        res.status(500).send(resp);
    })
})

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    let tournamentJson = req.body;
    let newTournamentJson = {
        id: tournamentJson.id,
        admin_id: req.user.id,
        name: tournamentJson.name,
        is_public: tournamentJson.is_public,
        image: tournamentJson.image,
        description: tournamentJson.description
    };
    ImageHandler(newTournamentJson.image).then(image => {
        newTournamentJson.image = image;
        Tournament.createTournament(newTournamentJson).then(tournamentId => {
            let teams = tournamentJson.teams;
            let teamPromises = [];
            teamsPromises = teams.map(team => {
                team.tournament_id = tournamentId;
                console.log(tournamentId);
                return new Promise((resolve, reject) => {
                    ImageHandler(team.image).then(img => {
                        console.log(img);
                        team.image = img;
                        Team.createTeam(team).then(teamId => {

                            console.log(teamId);
                            resolve(teamId)
                        }).catch(err => reject());
                    })
                });
            })

            Promise.all(teamsPromises).then((teamsIds) => {
                const calendarJson = {
                    tournament_id: tournamentId
                };
                let resp = {
                    ok: true,
                    id: tournamentId,
                    teamsIds: teamsIds
                };
                res.send(resp);
            }).catch(err => {
                let resp = {
                    ok: false,
                    error: err
                }
                res.status(500).send(resp);
            })
        }).catch(error => {
            let resp = {
                ok: false,
                error: error
            }
            res.status(500).send(resp);
        })

    })
})

router.put('/:id', (req, res) => {
    let tournamentId = req.params.id;
    let tournamentJson = req.body;

    Tournament.updateTournament(tournamentJson).then(affRows => {
        let resp = {
            ok: true
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

router.delete('/:id', (req, res) => {
    let tournamentId = req.params.id;

    Tournament.deleteTournament(tournamentId).then(ok => {
        let resp = {
            ok: true
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
