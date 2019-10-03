const GameEngine = require('../Game/GameEngine');
const { getToken } = require('../util/jwt');

let games = {};
let currentGameId;

module.exports = {
    init: () => {
        // init
        createNewGame();

        return module.exports;
    },

    // Return JWT token to TCP, to send to user
    initUser: async(socket) => {
        const game = getNextOpenGame();

        const player = game.board.addNewPlayer(socket);
        const playerData = {
            id: player.id,
            gameId: game.id
        }
        socket.player = playerData;

        // RETURN JWT TO USER
        try{
            const payload = playerData;
            
            // Once added, send encrypted playerIp and boardId to user
            const token = await getToken(payload, res);
            return token;
            
        }catch(err){
            console.log(err);
        }
    },

    // Create JWT for user to 
    connectPlayerToGame: (playerId, gameId, ip, port) => {
        // ADD PLAYER TO BOARD
        const game = this.games[gameId];
        game.connectProvisionalPlayer(playerId, ip, port);
    },
}

const createNewGame = () => {
    const newGame = new GameEngine();
    games[newGame.id] = newGame;
    currentGameId = newGame.id;

    return newGame;
}
const getCurrentGame = () => games[currentGameId];
const isCurrentGameFull = () => getCurrentGame().isBoardFull();

const getAllOpenGames = () => {
    let openGames = [];
    this.games.foreach(game => {
        if(!game.isBoardFull()) openGames.push(game);
    });

    // None open
    if(openGames.length === 0) openGames = undefined;

    return openGames;
}

// Faster
// Returns current or new game
const getNextOpenGame = () => {
    return isCurrentGameFull() ? createNewGame() : getCurrentGame();
}
// Checks older game, perhaps users have disconnected
// Returns any open or a new game
const getFirstOpenGame = () => {
    const openGames = getAllOpenGames();

    return openGames ? openGames[0] : createNewGame();
}