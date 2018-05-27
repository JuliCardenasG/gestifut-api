const express = require('express');
const Errors = require('../utils/errors');
const passport = require('passport');
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

router.get('/:id', (req, res) => {
    let matchId = req.params.id;
    Match.getMatch(matchId).then(match => {
        let resp = {
            ok: true,
            match: match
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

router.get('/matchdays/tournament/:id', (req, res) => {
    let tournamentId = req.params.id;

    Matchday.getMatchdaysByTournament(tournamentId).then(matchdays => {
        let resp = {
            ok: true,
            matchdays: matchdays
        };
    }).catch(error => {
        let resp = {
            ok: false,
            error: error
        }
        res.status(500).send(resp);
    })
})

router.post('/matchdays', (req, res) => {
    let tournamentId = req.body.tournamentId;
    let matchdayNumber = req.body.matchdayNumber;

    Matchday.getMatchesFromMatchday(matchdayNumber, tournamentId).then(matches => {
        let resp = {
            ok: true,
            matches: matches
        };
    }).catch(error => {
        let resp = {
            ok: false,
            error: error
        }
        res.status(500).send(resp);
    })
})

router.get('/tournaments/:id', (req, res) => {
    const tournamentId = req.params.id;
    Match.getTournamentMatches(tournamentId).then(matches => {
        let resp = {
            ok: true,
            matches: matches
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

router.post('/result', (req, res) => {
    let matchId = req.params.id;
    let matchResult = req.body;
    let matchResultJson = {
        id: matchResult.id,
        team_local_goals: matchResult.teamLocalGoals,
        team_visitor_goals: matchResult.teamVisitorGoals,
    };

    let tournamentId = matchResult.tournamentId;
    let team_local_id = matchResult.teamLocalId;
    let team_visitor_id = matchResult.teamVisitorId;
    let teamLocalGoals = matchResult.teamLocalGoals;
    let teamVisitorGoals = matchResult.teamVisitorGoals;

    Match.setMatchResult(matchResultJson).then(affRows => {
        Clasification.getTournamentClasification(tournamentId).then(clasifications => {
            let localTeamCurrentClasification = clasifications.find(clasification => clasification.team_id == team_local_id);
            let visitorTeamCurrentClasification = clasifications.find(clasification => clasification.team_id == team_visitor_id);
            
            let clasificationsArray = [];

            let localTeamNewClasification = {
                tournament_id: tournamentId,
                team_id: team_local_id,
                goals_scored: localTeamCurrentClasification.goals_scored + teamLocalGoals,
                goals_against: localTeamCurrentClasification.goals_against + teamVisitorGoals,
            };

            let visitorTeamNewClasification = {
                tournament_id: tournamentId,
                team_id: team_visitor_id,
                goals_scored: visitorTeamCurrentClasification.goals_scored + teamVisitorGoals,
                goals_against: visitorTeamCurrentClasification.goals_against + teamLocalGoals,
                points: visitorTeamCurrentClasification.points
            };
            
            if (teamLocalGoals > teamVisitorGoals) {
                localTeamNewClasification.points = localTeamCurrentClasification.points + 3;
                visitorTeamNewClasificationpoints = visitorTeamCurrentClasification.points;

                clasificationsArray.push(localTeamNewClasification, visitorTeamNewClasification);
            }
            else if (teamLocalGoals < teamVisitorGoals) {
                localTeamNewClasification.points = localTeamCurrentClasification.points;
                visitorTeamNewClasification.points = visitorTeamCurrentClasification.points + 3;

                clasificationsArray.push(localTeamNewClasification, visitorTeamNewClasification);
            }
            else {
                localTeamNewClasification.points = localTeamCurrentClasification.points + 1;
                visitorTeamNewClasification.points = visitorTeamCurrentClasification.points + 1;

                clasificationsArray.push(localTeamNewClasification, visitorTeamNewClasification);
            }

            let clasificationsPromises = clasificationsArray.map(clasificationJson => {
                return new Promise((resolve, reject) => {
                    Clasification.updateClasification(clasificationJson).then(affRows => {
                        resolve(affRows)
                    })
                })
            })

            Promise.all(clasificationsPromises).then(() => {
                let resp = {
                    ok: true
                };
                res.send(resp);
            })
        })
    }).catch(error => {
        let resp = {
            ok: false,
            error: error
        }
        res.status(500).send(resp);
    })
})

router.post('/', (req, res) => {
    const teams = req.body.teams;
    const tournamentId = req.body.tournamentId;
    const calendarId = req.body.calendarId;
    const matchdays = robin(teams.length, teams);

    let matchdaysPromises = [];
    const matchdayNumbers = teams.length % 2 == 0 ? teams.length - 1 : teams.length;
    let matchdayIds = [];

    for (let i = 1; i <= matchdayNumbers; i++) {
        let promise = new Promise((resolve, reject) => {
            let matchdayJson = {
                tournament_id: tournamentId,
                matchday_number: i
            }
            Matchday.createMatchday(matchdayJson).then(matchdayId => {
                matchdayIds.push(matchdayId);
                resolve()
            }).catch(error => {
                let resp = {
                    ok: false,
                    error: error
                }
                res.status(500).send(resp);
            })
        })
        matchdaysPromises.push(promise);
    }

    Promise.all(matchdaysPromises).then(() => {
        let matchesArray = [];
        let matchesPromises = [];
        let matchesPerMatchday = Math.floor(teams.length / 2)
        //Jornada
        for (let i = 0; i < matchdayNumbers; i++) {
            //Partido
            for (let j = 0; j < matchesPerMatchday; j++) {
                let matchPromise = new Promise((resolve, reject) => {
                    let match = matchdays[i][j]
                    let matchJson = {
                        matchday_id: matchdayIds[i],
                        team_local_id: match[0].id,
                        team_visitor_id: match[1].id,
                        team_local_goals: 0,
                        team_visitor_goals: 0
                    }
                    Match.createMatch(matchJson).then(matchId => {
                        resolve(matchId);
                    }).catch(error => {
                        let resp = {
                            ok: false,
                            error: error
                        }
                        res.status(500).send(resp);
                    })
                })
                matchesPromises.push(matchPromise)
            }
        }

        Promise.all(matchesPromises).then(matchesIds => {
            let resp = {
                ok: true,
                ids: matchesIds
            };
            res.send(resp);
        }).catch(error => {
            let resp = {
                ok: false,
                error: error
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

// router.put('/:id', (req, res) => {
//     let matchId = req.params.id;
//     let matchResult = req.body;
//     let matchResultJson = {
//         id: matchResult.id,
//         team_local_goals: matchResult.teamLocalGoals,
//         team_visitor_goals: matchResult.teamVisitorGoals 
//     };

//     Match.editMatch()
// })

module.exports = router;