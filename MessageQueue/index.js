const Queue = require('../Queue');

const { movePlayer } = require('./MessageHandlers/Player');

module.exports = {
    messageQueue: new Queue(),

    init: () => {

        parseMessages();

        return module.exports;
    
    },
    queueMessage: (msg) => {
    
        this.messageQueue.enqueue(msg);
    
        setImmediate(parseMessages);
    }
}

const parseMessages = () => {
    while(!module.exports.messageQueue.isEmpty()) {

        const msg = this.messageQueue.dequeue();

        switch(msg.type) {
            case 'move-player':
                movePlayer();
                break;

            case 'B':
                console.log('B');
                break;

            case 'C':
                console.log('C');
                break;
        }
    }
}