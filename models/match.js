const connection = require('./dbconfig');

module.exports = class Match {
    constructor (matchJson) {
        this.id = matchJson.id;
        this.team_local_id = matchJson.team_local_id;
        this.team_visitor_id = matchJson.team_visitor_id;
        this.team_local_goals = matchJson.team_local_goals;
        this.team_visitor_goals = matchJson.team_visitor_goals;
        this.date = matchJson.date;
    }
}