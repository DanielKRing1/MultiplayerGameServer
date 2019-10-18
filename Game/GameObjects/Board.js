const uuidv1 = require('uuid/v1');
// const { getClient } = require('../../Redis');

const Player = require('./Player');
const { randInt } = require('../../util/methods');
const { boardWidth, boardHeight, playersPerBoard } = require('../../util/constants');

const Board = class {

    constructor() {
        this.id = uuidv1();
        this.height = boardHeight;
        this.width = boardWidth;
        
        this.players = {};
        this.provisionalPlayers = {};
        this.playerCount = 0;
        this.provisionalPlayerCount = 0;
    }

    addProvisionalPlayer(socket) {
        return createProvisionalPlayer(socket);
    }
    completeProvisionalPlayer(id, ip, port) {
        const player = this.provisionalPlayers[id];

        trackPlayer(player, ip, port);
        removeProvisionalPlayer(player);
        
        return player;
    }
    removePlayer(id){
        delete this.players[id];
        this.playerCount--;
    }

    isFull() {
        return this.playerCount + this.provisionalPlayerCount >= playersPerBoard;
    }

    getPlayer(id) {
        return this.players[id];
    }
    getPlayers() {
        return this.players;
    }
    getPlayerList(){
        let playerList = [];

        const playerKeys = this.players.keys();
        playerKeys.forEach(key => {
            const player = this.players[key];
            playerList.push(player);
        });

        return playerList;
    }
}

const createProvisionalPlayer = (socket) => {
    const xPos = randInt(0, this.width);
    const yPos = randInt(0, this.height);

    const player = new Player(socket, xPos, yPos, 0, 0, 1, 'test');

    const id = player.id;
    this.provisionalPlayers[id] = player;
    this.provisionalPlayerCount++;

    return player;
}
const trackPlayer = (player, ip, port) => {
    player.addUdpAddress(ip, port);

    const id = player.id;
    this.players[id] = player;
    this.playerCount++;
}
const removeProvisionalPlayer = (player) => {
    const id = player.id;
    delete this.provisionalPlayers[id];
    this.provisionalPlayerCount--;
}

// Static
// Board.players = getClient();

module.exports = Board;