const connection = require('./dbconfig');

module.exports = class Tournament {
    constructor(tournamentJson) {
        this.id = tournamentJson.id;
        this.admin_id = tournamentJson.admin_id;
        this.name = tournamentJson.name;
        this.teams_number = tournamentJson.teams_number;
        this.is_public = tournamentJson.is_public;
        this.image = tournamentJson.image;
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

    static searchTournament(searchTerm) {
        let searchPrepared = '%' + searchTerm + '%';
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM tournaments WHERE name LIKE ?', [searchPrepared], 
            (error, result, fields) => {
                if (error)
                    return reject(error);
                else
                if (result.length > 0) {
                    let tournaments = result.map(tournament => new Tournament(tournament));
                    resolve (tournaments);
                }
                else {
                    let tournaments = [];
                    resolve(tournaments)
                }
            })
        })
    }

    static updateTournament(tournamentJson) {
        return new Promise ((resolve, reject) => {
            connection.query('UPDATE tournaments SET ? WHERE id = ?', [tournamentJson, tournamentJson.id],
            (error, result, fields) => {
                if (error) {
                    return reject (error);
                }
                else {
                    resolve (result.affectedRows);
                }
            })
        })
    }

    static deleteTournament(tournamentId) {
        return new Promise ((resolve, reject) => {
            connection.query('DELETE FROM tournaments WHERE id = ?', [tournamentId],
            (error, result, fields) => {
                if (error)
                    return reject (error);
                else
                    resolve(result.affectedRows);
            })
        })
    }
}