// SOCKET
require('../UdpSocket');
require('../UdpSocket/Listener');
const a = require('../UdpSocket/Sender');

const { addPlayerToBoard, getCurrentBoardId } = require('../Game/BoardManager').init();
const { createAndSendToken } = require('../util/jwt');

module.exports = {
    init: () => {
        // init

        return module.exports;
    },

    // Create JWT for user to 
    addPlayer: async (req, res) => {

        const playerIp = req.ip;
        console.log('Called addPlayer()');

        // ADD PLAYER TO BOARD
        addPlayerToBoard(playerIp);

        // RETURN JWT TO USER
        try{
            const payload = {
                id: playerIp,
                boardId: getCurrentBoardId()
            };
            
            // Once added, send encrypted playerIp and boardId to user
            await createAndSendToken(payload, res);

        }catch(err){
            console.log(err);
            res.send(err);
        }
    },
}