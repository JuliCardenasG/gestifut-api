const connection = require('./dbconfig');
const Player = require('./player');

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

    static getTournamentTeamsWithPlayers(tournamentId) {console.log
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM teams WHERE tournament_id = ?', [tournamentId],
            (error, result, fields) => {
                if (error)
                    return reject (error)
                else {
                    if (result.length > 0) {
                        let teams = [];
                        let teamPromises = result.map(team => {
                            let teamResult = new Team(team);
                            return new Promise((resolve2, reject2) => {
                                Player.getPlayersFromTeam(team.id).then(players => {
                                    teamResult.players = players;
                                    teams.push(teamResult);
                                    resolve2(teamResult);
                                })
                            })
                        });
                        Promise.all(teamPromises).then(() => {
                            resolve(teams);
                        })
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

    static updateTeam(teamJson) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE teams SET ? WHERE id = ?', [teamJson.id, teamJson],
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

    static deleteTeam(teamId) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM teams WHERE id = ?', [teamId],
            (error, result, fields) => {
                if (error) {
                    return reject (error)
                }
                else {
                    resolve (result.affectedRows);
                }
            })
        })
    }
}