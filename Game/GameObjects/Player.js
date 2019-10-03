const Circle = require('./Circle');

const Player = class extends Circle {
    constructor(socket) {
        super();

        this.socket = socket;
        this.isProvisional = true;
    }

    // Udp unreliable; may take several connection attempts
    // Upon receiving successful udp message from user, Router forawarding (NAT) will be set up
    // Can now communicate with Player
    // So initialize Player
    connect(ip, port, xPos, yPos, xDir, yDir, radius, team) {

        this.isProvisional = false;

        this.ip = ip;
        this.port = port;

        this.pos = {
            x: xPos,
            y: yPos
        };
        this.direction = {
            x: xDir,
            y: yDir
        };

        this.radius = radius;
        this.team = team;
    }
}

module.exports = Player;