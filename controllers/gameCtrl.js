const { createAndSendToken } = require('../util/jwt');
const Board = require('../GameElements/Board');

const init = () => {
    // Init boards with first board
    firstBoard = new Board();

    this.boards = {};
    this.boards[firstBoard.id] = firstBoard;

    this.currentBoardId = firstBoard.id;
}
init();


module.exports = {
    // Create JWT for user to 
    addPlayer: async (req, res) => {
        console.log('Called addPlayer()');
        console.log(req.body);


        const playerIp = req.ip;

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


const getCurrentBoard = () => {
    let currentBoard = this.boards[this.currentBoardId];

    if(currentBoard.isFull()) {
        currentBoard = new Board();
        this.boards[currentBoard.id] = currentBoard;
    }

    return currentBoard;
}