const connection = require('./dbconfig');

module.exports = class Tournament {
    constructor(tournamentJson) {
        this.id = tournamentJson.id;
        this.tournament_type_id = tournamentJson.tournament_type_id;
        this.sport_id = tournamentJson.sport_id;
        this.admin_id = tournamentJson.admin_id;
        this.name = tournamentJson.name;
        this.teams_number = tournamentJson.teams_number;
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
<<<<<<< HEAD
                        resolve(error)
=======
                        return reject(error)
>>>>>>> 49831d0cc9540e1ecc96c3796bf7180ef6b02504
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
                            resolve(tournament);
                        }
                        let error = {
<<<<<<< HEAD
                            message: 'No se ha podido encontrar el torneo'
                        }
                        resolve(error)
=======
                            message: 'No se ha podido encontrar el usuario'
                        }
                        return reject(error)
>>>>>>> 49831d0cc9540e1ecc96c3796bf7180ef6b02504
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