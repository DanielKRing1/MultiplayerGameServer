const { createAndSendToken } = require('../util/jwt');
const Board = require('../GameElements/Board');

const { updatePlayerDirection } = require('../MessageHandlers/Player');

let boards = {};
let currentBoardId;

module.exports = {
    init: () => {
        initBoards();

        init

        return module.exports;
    },

    // Create JWT for user to 
    addPlayer: async (req, res) => {

        const playerIp = req.ip;
        console.log('Called addPlayer()');

        // ADD PLAYER TO BOARD
        const currentBoard = getCurrentBoard();
        currentBoard.addPlayer(playerIp);

        // RETURN JWT TO USER
        try{
            const payload = {
                id: playerIp,
                boardId: currentBoard.id
            };
            
            // Once added, send encrypted playerIp and boardId to user
            await createAndSendToken(payload, res);

        }catch(err){
            console.log(err);
            res.send(err);
        }
    },

    handleMessage: (msg) => {
        const { eventType } = msg;

        switch(eventType) {
            case 'update-direction':

                updatePlayerDirection(msg, boards);
                break;

            case 'collision-player':
                console.log('B');
                break;

            case 'collision-food':
                console.log('C');
                break;
        }
    }
}


// GAME BOARD
const initBoards = () => {
    console.log('Called INIT BOARDS------------');
    // Init boards with first board
    const firstBoard = new Board();

    boards[firstBoard.id] = firstBoard;
    currentBoardId = firstBoard.id;
}

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