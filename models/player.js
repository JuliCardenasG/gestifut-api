const connection = require('./dbconfig');

module.exports = class Player {
    constructor(playerJson) {
        this.id = playerJson.id;
        this.team_id = playerJson.team_id;
        this.name = playerJson.name;
        this.number = playerJson.number;
    }

    static getPlayers() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM players', playerJson,
                (error, result, fields) => {
                    if (error)
                        return reject(error);
                    else {
                        if (result.length > 0) {
                            let players = result.map(player => new Player(player));
                            resolve(players);
                        }
                        else {
                            let error = {
                                message: 'No hay jugadores'
                            }
                            return reject(error);
                        }
                    }
                })
        })
    }

    static createPlayer(playerJson) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO players SET ?', playerJson,
                (error, result, fields) => {
                    if (error)
                        return reject(error)
                    else
                        resolve(result.insertId)
                })
        })
    }

    static getPlayersFromTeam(teamId) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT *, (SELECT SUM(goals) FROM goalscorers WHERE goalscorers.player_id = players.id) AS goals_scored FROM players WHERE team_id = ? ORDER BY goals_Scored DESC', [teamId], 
                (error, result, fields) => {
                    if (error)
                        return reject(error);
                    else {
                        let players = result.map(player => player);
                        resolve(players);
                    }
                })
        })
    }
}