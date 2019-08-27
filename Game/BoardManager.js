const Board = require('../Game/GameObjects/Board');

let boards = {};
let currentBoardId;

module.exports = {
    init: () => {
        console.log('Called INIT BOARDS------------');
        // Init boards with first board
        const firstBoard = new Board();
    
        boards[firstBoard.id] = firstBoard;
        currentBoardId = firstBoard.id;

        return module.exports;
    },

    addPlayerToBoard: (playerIp) => {
        const currentBoard = getCurrentBoard();
        currentBoard.addPlayer(playerIp);
    },

    getBoards: () => boards,
};


// GAME BOARD
const getCurrentBoard = () => {
    const currentBoard = boards[currentBoardId];

    return currentBoard.isFull() ? createNewBoard() : currentBoard;
}
const createNewBoard = () => {
    let newBoard = new Board();
    // Add to list
    boards[newBoard.id] = newBoard;
    currentBoardId = newBoard.id;

    return newBoard;
}