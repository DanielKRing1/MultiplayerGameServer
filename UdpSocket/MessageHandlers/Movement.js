const { normalizeVector } = require('../../util/methods');
const { getBoards } = require('../../Game/State/BoardManager');

module.exports = {
    updatePlayerDirection: (msg) => {
        console.log('Update Player direction');

        const { direction } = msg;
        const { id, boardId } = msg.jwt;
        
        // Get board and player
        const boardSet = getBoards();
        const playerBoard = boardSet[boardId];
        const newPlayer = playerBoard.players[id];
        newPlayer.direction = normalizeVector(direction);

        playerBoard.players[id] = newPlayer;
    },
    
}