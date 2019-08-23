const { createAndSendToken } = require('../util/jwt');
const Board = require('../GameElements/Board');

let boards = {};
let currentBoardId;

module.exports = {
    init: () => {
        initBoards();

        return module.exports;
    },

    // Create JWT for user to 
    addPlayer: async (req, res) => {

        const playerIp = req.ip;
        console.log('Called addPlayer()');

        // Add Player to Board
        const currentBoard = getCurrentBoard();
        currentBoard.addPlayer(playerIp);

        try{
        
            const payload = {
                playerIp,
                boardId: currentBoard.id
            };
            
            // Once added, send encrypted playerIp and boardId to user
            await createAndSendToken(payload, res);

        }catch(err){
            console.log(err);
            res.send(err);
        }
    },
}

const initBoards = () => {
    console.log('Called INIT BOARDS------------');
    // Init boards with first board
    firstBoard = new Board();

    boards[firstBoard.id] = firstBoard;
    currentBoardId = firstBoard.id;
}

const getCurrentBoard = () => {
    const currentBoard = boards[currentBoardId];

    if(currentBoard.isFull()) return createNewBoard();
    else return currentBoard;
}
const createNewBoard = () => {
    let newBoard = new Board();
    // Add to list
    boards[newBoard.id] = newBoard;
    currentBoardId = newBoard.id;

    return newBoard;
}