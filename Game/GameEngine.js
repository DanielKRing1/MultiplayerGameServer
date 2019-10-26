const uuidv1 = require('uuid/v1');


const { sendMessage } = require('../UdpSocket/Sender');
const { updateFPS } = require('../util/constants');

const Board = require('./GameObjects/Board');

let lastUpdate;

let GameEngine = class {
    constructor() {
        this.id = uuidv1();
        this.updatePointer = undefined;

        this.board = new Board();
    }

    isBoardFull() {
        return this.board.isFull();
    }

    addPlayer(ip, port, socket) {
        return this.board.addPlayer(ip, port, socket);
    }

    updatePlayerDirection(id, direction){
        this.board.players[id].updateDirection(direction);
    }

    start() {
        console.log("Start");
        lastUpdate = new Date();
        this.updatePointer = setInterval(() => update(this.board), 1000 / updateFPS);
    }

    stop() {
        if(this.updatePointer) {
            clearInterval(this.updatePointer);
            this.updatePointer = undefined;
        }
    }

    isRunning(){
        return !!updatePointer;
    }

}

module.exports = GameEngine;

const update = (board) => {
    const players = board.getPlayers();

    updatePlayerPositions(players);
    sendPlayersToClients(players, board);
}
const updatePlayerPositions = (players) => {
    const now = new Date();
    const elapsedTime = now - lastUpdate;
    
    Object.keys(players).forEach(key => {
        console.log(elapsedTime);
        const player = players[key];
        player.updatePosition(elapsedTime)
    });
    setLastUpdate();
}
const setLastUpdate = () => {
    console.log("Set Last Update");
    lastUpdate = new Date();
}
const sendPlayersToClients = (players, board) => {
    // const bufferData = Buffer.from(this.board);

    Object.keys(players).forEach(key => {
        const publicPlayerData = board.getPublicPlayerData();
        const msg = {
            eventType: 'receive-board',
            players: publicPlayerData
        }

        const player = players[key];
        sendMessage(player.ip, player.port, msg);
    });
    // players.forEach(player => {
    //     player.socket.write(bufferData);
    // });  
}