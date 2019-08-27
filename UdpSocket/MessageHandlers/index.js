const { updatePlayerDirection } = require('./Movement');

module.exports = {
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