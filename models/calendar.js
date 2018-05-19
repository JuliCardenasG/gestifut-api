const connection = require('./dbconfig');

module.exports = class Calendar {
    constructor (calendarJson) {
        this.id = calendarJson.id;
        this.tournament_id = calendarJson.tournament_id;
        this.matchday_id = calendarJson.matchday_id;
    }

    static getCalendars() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM calendars',
            (error, result, fields) => {
                if (error) {
                    return reject (error);
                }
                else {
                    if (result.length > 0) {
                        let calendars = result.map(calendar => new Calendar(calendar));
                        resolve (calendars);
                    }
                    else {
                        let error = {
                            message: 'No se han encontrado calendarios'
                        };
                        resolve (error);
                    }
                }
            })
        })
    }

    static getTournamentCalendar(tournamentId) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM calendars WHERE tournament_id = ?', [tournamentId],
            (error, result, fields) => {
                if (error) {
                    return reject (error);
                }
                else {
                    if (result.length > 0) {
                        let calendars = result.map(calendar => new Calendar(calendar));
                        resolve (calendars);
                    }
                    else {
                        let error = {
                            message: 'No se han encontrado calendarios'
                        };
                        resolve (error);
                    }
                }
            })
        })
    }

    static createCalendar(calendarJson) {
        return new Promise ((resolve, reject) => {
            connection.query('INSERT INTO calendar SET ?', [calendarJson], 
            (error, result, fields) => {
                if (error)
                    return reject(error)
                else
                    resolve(result.insertId);
            })
        })
    }
}