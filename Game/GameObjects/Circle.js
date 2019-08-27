const GameObject = require('./GameObject');

const Circle = class extends GameObject{
    constructor(id, xPos, yPos, radius) {
        super(id, xPos, yPos);

        this.radius = radius;
    }
}

module.exports = Circle;