const { connectToUdpServer } = require('./Player');
const { updatePlayerDirection } = require('./Movement');

module.exports = {
    handleMessage: (msg, remote) => {
        const { eventType } = msg;

        switch(eventType) {
            case 'connect-to-udp-server':
                connectToUdpServer(msg, remote);
                break;

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