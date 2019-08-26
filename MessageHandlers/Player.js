const { normalizeVector } = require('../util/methods');

module.exports = {
    updatePlayerDirection: (msg, boards) => {
        console.log('Update Player direction');

        const { id, boardId, direction } = msg;
        
        // Get board and player
        const playerBoard = boards[boardId];
        const newPlayer = playerBoard.players[id];
        newPlayer.direction = normalizeVector(direction);

        playerBoard.players[id] = newPlayer;
    },
    
}