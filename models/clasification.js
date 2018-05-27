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

    static updateClasification (clasificationJson){
        return new Promise((resolve, reject) => {
            connection.query('UPDATE clasifications SET ? WHERE team_id = ?', [clasificationJson, clasificationJson.team_id],
            (error, result, fields) => {
                if (error)
                    reject (error)
                else {
                    resolve(result.affectedRows);
                }
            })
        })
    }

    static getClasification(clasificationId) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM clasifications WHERE id = ?', [clasificationId],
            (error, result, fields) => {
                if (error)
                    reject (error)
                else {
                    let clasification = new Clasification(result[0]);
                    resolve(clasification);
                }
            })
        })
    }

    static getTournamentClasification(tournamentId) {
        return new Promise ((resolve, reject) => {
            connection.query('SELECT * FROM clasifications WHERE tournament_id = ? ORDER BY points DESC', [tournamentId],
            (error, result, fields) => {
                if (error)
                    reject (error)
                else {
                    let clasifications = result.map(clasification => new Clasification(clasification));
                    resolve(clasifications);
                }
            })
        })
    }
}