const GameObject = class {
    constructor(id, xPos, yPos) {
        this.id = id;
        this.pos = {
            x: xPos,
            y: yPos
        };
    }
}

module.exports = GameObject;