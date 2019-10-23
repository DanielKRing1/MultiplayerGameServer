const Circle = require('./Circle');

const Player = class extends Circle {
    constructor(socket, xPos, yPos, xDir, yDir, radius, team) {
        super(xPos, yPos, radius);

        this.socket = socket;

        this.direction = {
            x: xDir,
            y: yDir
        };

        this.team = team;
    }

    addUdpAddress(ip, port){
        this.ip = ip;
        this.port = port;
    }

    updatePosition(elapsedTime){
        const delta = {
            x: elapsedTime * this.xDir,
            y: elapsedTime * this.yDir
        }


        this.pos.x += delta.x;
        this.pos.y += delta.y;
    }
}

module.exports = Player;