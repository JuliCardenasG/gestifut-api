const connection = require('./dbconfig');

module.exports = class Player {
    constructor (playerJson) {
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
                    if(result.length > 0) {
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
                    resolve(result.insr)
            })
        })
    }

    static getPlayersFromTeam(teamId) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM players WHERE team_id = ?',
            (error, result, fields) => {
                if (error)
                    return reject(error);
                else {
                    if(result.length > 0) {
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
}