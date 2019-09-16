const GameEngine = require('../Game/GameEngine');
const { createAndSendToken } = require('../util/jwt');

let games = [];
let currentGameId;

module.exports = {
    init: () => {
        // init
        const newGame = new GameEngine();
        games.push(newGame);

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
                ip: playerIp,
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