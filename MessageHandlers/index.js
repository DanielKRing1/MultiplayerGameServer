const Queue = require('../Queue');

const { updatePlayerDirection } = require('./Player');

module.exports = {
    init: () => {

        this.messageQueue = new Queue();

        return module.exports;
    
    },

    queueMessage: (msg) => {
    
        this.messageQueue.enqueue(msg);
    
        setImmediate(parseMessages);
    },

    handleMessage: (msg) => {

        const { eventType } = msg;

        switch(eventType) {
            case 'update-direction':

                updatePlayerDirection(msg);
                break;

            case 'collision-player':
                console.log('B');
                break;

            case 'collision-food':
                console.log('C');
                break;
        }
    }
}

const parseMessages = () => {
    while(!this.messageQueue.isEmpty()) {

        const msg = this.messageQueue.dequeue();
        const jsonMsg = JSON.parse(msg);
        
        handleMessage(jsonMsg);
    }
}