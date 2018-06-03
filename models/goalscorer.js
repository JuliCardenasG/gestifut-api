const connection = require('./dbconfig');

module.exports = class Goalscorer {
    constructor (goalscorerJson) {
        this.id = goalscorerJson.id;
        this.match_id = goalscorerJson.match_id;
        this.team_id = goalscorerJson.team_id;
        this.player_id = goalscorerJson.player_id;
        this.goals = goalScorerJson.goals;
    }

    static getGoalsScoredFromPlayer(playerId) {
        return new Promise ((resolve, reject) => {
            connection.query('SELECT COUNT(*) AS goals FROM goalscorers WHERE player_id = ?',
            (error, result, fields) => {
                if (error)
                    reject (error)
                else {
                    resolve(result);
                }
            })
        })
    }

    static setGoalScorers(goalScorerJson){
        return new Promise ((resolve, reject) => {
            connection.query('INSERT INTO goalscorers SET ?', [goalScorerJson], 
            (error, result, fields) => {
                if (error)
                    reject (error);
                else {
                    resolve(result.insertId);
                }
            })
        })
    }

    static getMatchGoalScorers(matchId) {
        connection.query('SELECT (SELECT name FROM players WHERE id = player_id) AS name, (SELECT name FROM teams WHERE id = team_id) AS team, goals FROM goalscorers WHERE match_id = ? GROUP BY name',
        [matchId], (error, result, fields) => {
            if (error) {
                reject (error)
            }
            else {
                let goalScorers = result.map(goalscorer => {
                    let goalScorer = {
                        name: goalscorer.name,
                        team: goalscorer.team,
                        goals: goalscorer.goals
                    };
                    return goalScorer;
                })
                resolve (goalScorers)
            }
        })
    }

    //SELECT (SELECT name FROM players WHERE id = player_id) AS name, (SELECT name FROM teams WHERE id = team_id) AS team, goals FROM goalscorers WHERE match_id IN (SELECT id FROM matches WHERE matchday_id IN (SELECT id FROM matchdays WHERE tournament_id = 44)) GROUP BY name

    static getTournamentGoalScorers(tournamentId) {
        return new Promise ((resolve, reject) => {
            connection.query('SELECT (SELECT name FROM players WHERE id = player_id) AS name, (SELECT name FROM teams WHERE id = team_id) AS team, SUM(goals) as goals FROM goalscorers WHERE match_id IN (SELECT id FROM matches WHERE matchday_id IN (SELECT id FROM matchdays WHERE tournament_id = ?)) GROUP BY name ORDER BY goals DESC',
            [tournamentId], (error, result, fields) => {
                if (error)
                    reject (error)
                else {
                    let goalScorers = result.map(goalscorer => {
                        let goalScorer = {
                            name: goalscorer.name,
                            team: goalscorer.team,
                            goals: goalscorer.goals
                        };
                        return goalScorer;
                    })
                    resolve (goalScorers) 
                }
            })
        })
    }
}