const GameObject = require('./GameObject');

const Circle = class extends GameObject{
    constructor(xPos, yPos, radius) {
        super(xPos, yPos);

        this.radius = radius;
    }
}

module.exports = Circle;