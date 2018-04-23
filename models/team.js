const connection = require('./dbconfig');

module.exports = class Team {
    constructor(teamJson) {
        this.id = teamJson.id;
        this.team_composition_id = teamJson.team_composition_id;
        this.sport_id = teamJson.sport_id;
        this.name = teamJson.name;
    }

    static createTeam(teamJson) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO teams SET ?', teamJson,
            (error, result, fields) => {
                if (error)
                    return reject(error);
                else
                    resolve (result.insertId);
            })
        })
    }

    static getTeam() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM teams WHERE id = ?', id,
                (error, result, fields) => {
                    if (error)
                        reject(error)
                    else {
                        if (result.length > 0) {
                            let team = new Team(result[0])
                            resolve(team);
                        }
                        let error = {
                            message: 'No se ha podido encontrar el equipo'
                        }
                        return reject(error);
                    }
                })
        })
    }
}