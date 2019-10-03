const uuidv1 = require('uuid/v1');
const Player = require('./Player');

const ProvisionalBoard = class {

    constructor() {
        this.id = uuidv1();
        
        this.players = {};
        this.playerCount = 0;
    }

    createNewPlayer(socket) {
        const newPlayer = new Player(socket);

        const id = newPlayer.id;
        this.players[id] = newPlayer;
        this.playerCount++;

        return newPlayer;
    }


    removePlayer(playerId) {
        const player = this.players[playerId];
        
        delete this.players[playerId];
        this.playercount--;

        return player;
    }
}

// Static
// Board.players = getClient();

module.exports = ProvisionalBoard;