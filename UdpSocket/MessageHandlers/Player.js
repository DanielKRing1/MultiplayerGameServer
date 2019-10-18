const { onCompletePlayer } = require('../../controllers/gameCtrl');

module.exports = {
    completePlayer: (msg, remote) => {
        const { id, gameId } = msg.user;
        const { address: ip, port } = remote;

        const player = onCompletePlayer(id, gameId, ip, port);

        console.log('3. START ---- Connect Udp / Complete Player');
        const socket = player.socket;
        const data = {
            eventType: 'connected-main-udp'
        }
        const bufferData = Buffer.from(JSON.stringify(data));
        console.log('4. END ---- Connect Udp / Respond via Tcp');
        socket.write(bufferData);
    }
}