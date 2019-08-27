const Circle = require('./Circle');

const Player = class extends Circle {
    constructor(id, xPos, yPos, xDir, yDir, radius, team) {
        super(id, xPos, yPos, radius);

        this.team = team;
        this.direction = {
            x: xDir,
            y: yDir
        };
    }
}

module.exports = Player;