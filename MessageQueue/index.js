const Queue = require('../Queue');

const { movePlayer } = require('./MessageHandlers/Player');

module.exports = {
    messageQueue: new Queue(),

    init: () => {
        console.log('Init message Handlers');
        
        parseMessages();

        return this;
    
    },
    queueMessage: (msg) => {
    
        this.messageQueue.enqueue(msg);
    
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

    setImmediate(parseMessages);
}