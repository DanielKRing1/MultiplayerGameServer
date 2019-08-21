const Circle = require('./Circle');

const Player = class extends Circle {
    constructor(id, xPos, yPos, radius, type) {
        super(id, xPos, yPos, radius);

        this.type = type;
    }
}

module.exports = Player;