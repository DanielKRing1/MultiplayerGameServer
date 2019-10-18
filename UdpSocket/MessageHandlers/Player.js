const { onCompletePlayer } = require('../../controllers/gameCtrl');

module.exports = {
    completePlayer: (msg, remote) => {
        const { id, gameId } = msg.user;
        const { address: ip, port } = remote;

        const player = onCompletePlayer(id, gameId, ip, port);

        const socket = player.socket;
        const data = {
            eventType: 'connected-main-udp'
        }
        const bufferData = Buffer.from(JSON.stringify(data));
        socket.write(bufferData);
    }
}