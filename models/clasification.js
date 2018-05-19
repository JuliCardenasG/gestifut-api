const connection = require('./dbconfig');

module.exports = class Clasification {
    constructor (clasificationJson) {
        this.id = clasificationJson.id;
        this.tournament_id = clasificationJson.tournament_id;
        this.team_id = clasificationJson.team_id;
        this.goals_scored = clasificationJson.goals_scored;
        this.goals_against = clasificationJson.goals_against;
        this.points = clasificationJson.points;
    }
}