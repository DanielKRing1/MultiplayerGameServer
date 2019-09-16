const Circle = require('./Circle');

const Player = class extends Circle {
    constructor(ip, port, xPos, yPos, xDir, yDir, radius, team) {
        const id = "" + ip + port;
        super(id, xPos, yPos, radius);

        this.ip = ip;
        this.port = port;
        this.team = team;
        this.direction = {
            x: xDir,
            y: yDir
        };
    }
}

module.exports = Player;