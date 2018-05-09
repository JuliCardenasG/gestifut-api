const connection = require('./dbconfig');

module.exports = class Sport {
    constructor(sportJson) {
        this.id = sportJson.id;
        this.name = sportJson.name;
    }

    static getSport(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM sports WHERE id = ?', [id], (error, result, fields) => {
                if (error)
                    reject(error)
                else {
                    if (result.length > 0) {
                        let sport = new Sport(result[0])
                        resolve(sport);
                    }
                    let error = {
                        message: 'No se ha podido encontrar el equipo'
                    }
                    resolve(error)
                }
            })
        })
    }

    static getSports() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM sports', (error, result, fields) => {
                if (error)
                    reject(error)
                else {
                    if (result.length > 0) {
                        let sports = result.map(sport => new Sport(sport))
                        resolve(sports);
                    }
                    let error = {
                        message: 'No se ha podido encontrar el equipo'
                    }
                    resolve(error);
                }
            })
        })
    }
}