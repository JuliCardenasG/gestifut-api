const connection = require('./dbconfig');

module.exports = class Matchday {
    constructor (matchdayJson) {
        this.id = matchdayJson.id;
        this.tournament_id = matchdayJson.tournament_id;
        this.matchday_number = matchdayJson.matchday_number;
    }

    static createMatchday(matchdayJson) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO matchdays SET ?', [matchdayJson],
            (error, result, fields) => {
                if (error){
                    return reject (error)
                }
                else {
                    resolve(result.insertId)
                }
            })
        })
    }

    static getMatchdaysByTournament(tournamentId) {
        return new Promise ((resolve, reject) => {
            connection.query('SELECT * FROM matchdays WHERE tournament_id = ?', [tournamentId],
            (error, result, fields) => {
                if (error) {
                    return reject (error);
                }
                else {
                    let matchdays = result.map(matchday => new Matchday (matchday));
                    resolve (matchdays);
                }
            })
        })
    }

    static getMatchesFromMatchday(matchdayNumber, tournamentId){
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM matches WHERE matchday_id IN (SELECT id FROM matchdays WHERE tournament_id = ? AND matchday_number = ?)',
            [tournamentId, matchdayNumber], (error, result, fields) => {
                if (error) {
                    return reject (error)
                }
                else {
                    let matches = result.map(match => new Match(match));
                    resolve(matches);
                }
            })
        })
    }
}