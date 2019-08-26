const { normalizeVector } = require('../util/methods');

module.exports = {
    updatePlayerDirection: (msg, boards) => {
        console.log('Update Player direction');

        const { direction } = msg;
        const { id, boardId } = msg.jwt;
        
        // Get board and player
        const playerBoard = boards[boardId];
        const newPlayer = playerBoard.players[id];
        newPlayer.direction = normalizeVector(direction);

        playerBoard.players[id] = newPlayer;
    },
    
}