const Circle = require('./Circle');

const Player = class extends Circle {
    constructor(socket, xPos, yPos, xDir, yDir, radius, team) {
        super(xPos, yPos, radius);
        console.log(this.pos);


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

    updateData(update){
        console.log(update);
        Object.assign(this, update);
    }

    updateDirection(direction){
        console.log("Updated Direction");
        this.direction = direction;
    }

    updatePosition(elapsedTime){
        const delta = {
            x: elapsedTime * this.direction.x,
            y: elapsedTime * this.direction.y
        }


        // console.log("Pos")
        // console.log(this.pos)
        // console.log("Elapsed Time")
        // console.log(elapsedTime)
        // console.log("Delta")
        // console.log(delta)

        this.pos.x += delta.x;
        this.pos.y += delta.y;
    }

    getPublicData(){
        return {
            pos: this.pos,
            direction: this.direction,
            radius: this.radius,
            team: this.team
        }
    }
}

module.exports = Player;