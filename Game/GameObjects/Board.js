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

        return this.createProvisionalPlayer(socket);
    }
    completeProvisionalPlayer(id, ip, port) {
        const player = this.provisionalPlayers[id];

        this.trackPlayer(player, ip, port);
        this.removeProvisionalPlayer(player);
        
        return player;
    }
    removePlayer(id){
        delete this.players[id];
        this.playerCount--;
        console.log("Removed Player");
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
    getPublicPlayerData(){
        let publicPlayerData = [];

        Object.keys(this.players).forEach(playerId => {
            const player = this.players[playerId];

            const publicData = player.getPublicData();
            publicPlayerData.push(publicData);
        });

        return publicPlayerData;
    }
    getPlayerList(){
        let playerList = [];

        Object.keys(this.players).forEach(key => {
            const player = this.players[key];
            playerList.push(player);
        });

        return playerList;
    }


    createProvisionalPlayer(socket) {
        const xPos = randInt(0, this.width);
        const yPos = randInt(0, this.height);
    
        const player = new Player(socket, xPos, yPos, 0, 0, 1, 'test');
    
        const id = player.id;
        this.provisionalPlayers[id] = player;
        this.provisionalPlayerCount++;
    
        return player;
    }
    trackPlayer(player, ip, port) {
        player.addUdpAddress(ip, port);
    
        const id = player.id;
        this.players[id] = player;
        this.playerCount++;
    }
    removeProvisionalPlayer(player) {
        const id = player.id;
        delete this.provisionalPlayers[id];
        this.provisionalPlayerCount--;
    }
}



// Static
// Board.players = getClient();

module.exports = Board;