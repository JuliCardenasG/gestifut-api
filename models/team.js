const connection = require('./dbconfig');

module.exports = class Team {
    constructor(teamJson) {
        this.id = teamJson.id;
        this.tournament_id = teamJson.tournament_id;
        this.name = teamJson.name;
        this.image = teamJson.image;
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
                        else {
                            let error = {
                                message: 'No se ha podido encontrar el equipo'
                            }
                            return reject(error);
                        }
                    }
                })
        })
    }

    static getTournamentTeams(tournamentId) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM teams WHERE tournament_id = ?', [tournamentId],
            (error, result, fields) => {
                if (error)
                    return reject (error)
                else {
                    if (result.length > 0) {
                        let teams = result.map(team => new Team(team));
                        resolve(teams);
                    }
                    else {
                        let error = {
                            message: 'No se han encontrado equipos'
                        }
                        resolve (error)
                    }
                }
            })
        })
    }
}