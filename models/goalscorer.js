const connection = require('./dbconfig');

module.exports = class Goalscorer {
    constructor (goalscorerJson) {
        this.id = goalscorerJson.id;
        this.match_id = goalscorerJson.match_id;
        this.team_id = goalscorerJson.team_id;
        this.player_id = goalscorerJson.player_id;
    }
}