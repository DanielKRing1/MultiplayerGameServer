const Circle = require('./Circle');

const Player = class extends Circle {
    constructor(id, xPos, yPos, radius, team) {
        super(id, xPos, yPos, radius);

        this.team = team;
    }
}

module.exports = Player;