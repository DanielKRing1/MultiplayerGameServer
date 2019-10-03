const { connectPlayerToGame } = require('../../controllers/gameCtrl');

module.exports = {
    connectToUdpServer: (msg, remote) => {
        const { id, gameId } = msg.jwt;
        const { address: ip, port } = remote;

        connectPlayerToGame(id, gameId, ip, port);
    }
}