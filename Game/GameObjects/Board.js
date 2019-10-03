const uuidv1 = require('uuid/v1');
// const { getClient } = require('../../Redis');

const ProvisionalBoard = require('./ProvisionalBoard');


const Player = require('./Player');
const { randInt } = require('../../util/methods');
const { boardWidth, boardHeight, playersPerBoard } = require('../../util/constants');

const Board = class {

    constructor() {
        this.id = uuidv1();
        this.height = boardHeight;
        this.width = boardWidth;
        
        this.players = {};
        this.playerCount = 0;

        this.provisionalBoard = new ProvisionalBoard();
    }

    addNewPlayer(socket) {
        return this.provisionalBoard.createNewPlayer(socket);
    }
    connectProvisionalPlayer(playerId, ip, port) {
        const xPos = randInt(0, this.width);
        const yPos = randInt(0, this.height);

        const player = this.provisionalBoard.removePlayer(playerId);
        player.connect(ip, port, xPos, yPos, 0, 0, 1, 'a');
        addPlayer(player);
    }

    isFull() {
        return this.playerCount + this.provisionalBoard.playerCount >= playersPerBoard;
    }


    getProvisionalPlayer(playerId) {
        return this.provisionalBoard.getPlayer(playerId);
    }
}

const addPlayer = (player) => {
    const id = player.id;
    this.players[id] = player;
    this.playerCount++;
}

// Static
// Board.players = getClient();

module.exports = Board;