const connection = require('./dbconfig');

module.exports = class Clasification {
    constructor (clasificationJson) {
        this.id = clasificationJson.id;
        this.tournament_id = clasificationJson.tournament_id;
        this.team_id = clasificationJson.team_id;
        this.goals_scored = clasificationJson.goals_scored;
        this.goals_against = clasificationJson.goals_against;
        this.points = clasificationJson.points;
    }

    static createClasification(clasificationJson) {
        return new Promise ((resolve, reject) => {
            connection.query('INSERT INTO clasifications SET ?', [clasificationJson],
            (error, result, fields) => {
                if (error)
                    reject (error);
                else {
                    resolve (result.insertId);
                }
            })
        })
    }

    static getClasification(clasificationId) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM clasifications WHERE id = ?', [clasificationId],
            (error, result, id) => {
                if (error)
                    reject (error)
                else {

                }
            })
        })
    }
}