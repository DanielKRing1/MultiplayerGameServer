const uuidv1 = require('uuid/v1');

// Every GameObject has an id
const GameObject = class {
    constructor(xPos, yPos) {
        this.id = uuidv1();
        this.pos = {
            x: xPos,
            y: yPos
        };
    }
}

module.exports = GameObject;