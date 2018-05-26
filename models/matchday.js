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
}