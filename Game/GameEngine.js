const uuidv1 = require('uuid/v1');

const { sendMessage } = require('../UdpSocket/Sender');
const { updateFPS } = require('../util/constants');

const Board = require('./GameObjects/Board');


const { addPlayerToBoard, getCurrentBoardId } = require('../Game/State/BoardManager').init();

let GameEngine = class {
    constructor() {
        this.id = uuidv1();
        this.intervalPointer = undefined;

        this.board = new Board();
    }


    isBoardFull() {
        return this.board.isFull();
    }

    addNewPlayer(socket) {
        return this.board.addNewPlayer(socket);
    }
    connectProvisionalPlayer(playerId, ip, port) {
        this.board.connectProvisionalPlayer(playerId, ip, port);
    }


    start() {
        intervalPointer = setInterval(update, updateFPS);
    }

    stop() {
        if(intervalPointer) {
            clearInterval(intervalPointer);
            intervalPointer = undefined;
        }
    }

    isRunning(){
        return !!intervalPointer;
    }

}

module.exports = GameEngine;

const update = () => {

}