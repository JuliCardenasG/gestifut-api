const connection = require('./dbconfig');

module.exports = class Goalscorer {
    constructor (goalscorerJson) {
        this.id = goalscorerJson.id;
        this.match_id = goalscorerJson.match_id;
        this.team_id = goalscorerJson.team_id;
        this.player_id = goalscorerJson.player_id;
    }

    getGoalsScoredFromPlayer(playerId) {
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

    setGoalScorers(goalScorerJson){
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
}