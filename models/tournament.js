const connection = require('./dbconfig');

module.exports = class Tournament {
    constructor(tournamentJson) {
        this.id = tournamentJson.id;
        this.tournament_type_id = tournamentJson.tournament_type_id;
        this.sport_id = tournamentJson.sport_id;
        this.admin_id = tournamentJson.admin_id;
        this.name = tournamentJson.name;
        this.teams_number = tournamentJson.teams_number;
        this.description = tournamentJson.description;
    }

    static getTournament(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM tournaments WHERE id = ?', [id],
                (error, result, fields) => {
                    if (error)
                        reject(error)
                    else {
                        if (result.length > 0) {
                            let tournament = new Tournament(result[0]);
                            resolve(tournament);
                        }
                        let error = {
                            message: 'No hay torneos'
                        }
                        resolve(error)
                    }
                })
        })
    }

    static getTournaments() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM tournaments', [id],
                (error, result, fields) => {
                    if (error)
                        reject(error)
                    else {
                        if (result.length > 0) {
                            let tournaments = result.map(tournament => new Tournament(tournament));
                            resolve(tournaments);
                        }
                        let error = {
                            message: 'No se ha podido encontrar el torneo'
                        }
                        resolve(error)
                    }
                })
        })
    }

    static getTournamentsCreatedByUser(userId) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM tournaments WHERE admin_id = ?', [userId],
            (error, result, fields) => {
                if (error)
                    reject(error)
                else {
                    if (result.length > 0) {
                        let tournaments = result.map(tournament => new Tournament(tournament));
                        resolve (tournaments);
                    }
                    let error = {
                        message: 'No hay torneos creados por este usuario'
                    }
                    resolve(error)
                }
            })
        })
    }

    static createTournament(tournamentJson) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO tournaments SET ?', [tournamentJson],
                (error, result, fields) => {
                    if (error)
                        return reject(error);
                    else
                        resolve(result.insertId);
                })
        })
    }
}