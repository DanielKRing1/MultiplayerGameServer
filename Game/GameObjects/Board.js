const uuidv1 = require('uuid/v1');
const { getClient } = require('../../Redis');

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
    }

    addPlayer(playerIp) {

        const xPos = randInt(0, this.width);
        const yPos = randInt(0, this.height);

        const newPlayer = new Player(playerIp, xPos, yPos, 0, 0, 1, 'a');

        this.players[playerIp] = newPlayer;
        this.playerCount++;
    }

    isFull() {
        return this.playerCount >= playersPerBoard;
    }
}

// Static
// Board.players = getClient();

module.exports = Board;