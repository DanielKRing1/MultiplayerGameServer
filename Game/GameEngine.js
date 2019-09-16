const uuidv1 = require('uuid/v1');

const { sendMessage } = require('../UdpSocket/Sender');
const { updateFPS } = require('../util/constants');

const Board = require('./GameObjects/Board');


const { addPlayerToBoard, getCurrentBoardId } = require('../Game/State/BoardManager').init();

let GameEngine = class {
    constructor() {
        this.id = uuidv1();
        this.intervalPointer = undefined;
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
