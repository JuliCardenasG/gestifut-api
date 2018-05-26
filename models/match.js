const connection = require('./dbconfig');

module.exports = class Match {
    constructor(matchJson) {
        this.id = matchJson.id;
        this.matchday_id = matchJson.matchday_id;
        this.team_local_id = matchJson.team_local_id;
        this.team_visitor_id = matchJson.team_visitor_id;
        this.team_local_goals = matchJson.team_local_goals;
        this.team_visitor_goals = matchJson.team_visitor_goals;
        this.date = matchJson.date;
    }

    static createMatch (matchJson) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO matches SET ?', [matchJson],
                (error, result, fields) => {
                    if (error)
                        return reject(error);
                    else
                        resolve(result.insertId);
                })
        })
    }
    

    static getTournamentMatches (tournamentId) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM matches WHERE matchday_id IN (SELECT id FROM matchdays WHERE tournament_id = ?)', 
            [tournamentId], (error, result, fields) => {
                if (error)
                    return reject(error);
                else {
                    let matches = result.map(match => new Match (match));
                    resolve(matches);
                }
            })
        })
    }

    static editMatch (matchJson) {
        return new Promise ((resolve, reject) => {
            connection.query('UPDATE matches SET ? WHERE id = ?', [matchJson, matchJson.id],
            (error, result, fields) => {
                if (error)
                    return reject(error);
                else {
                    resolve(matchJson)
                }
            })
        })
    }
}