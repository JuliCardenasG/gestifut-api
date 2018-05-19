const connection = require('./dbconfig');

module.exports = class Matchday {
    constructor (matchdayJson) {
        this.id = matchdayJson.id;
        this.match_id = matchdayJson.match_id;
        this.matchday_number = matchdayJson.matchday_number;
    }
}