const GameEngine = require('../Game/GameEngine');
const { getToken } = require('../util/jwt');

let games = {};
let currentGameId;

module.exports = {
    init: () => {
        // init

        return module.exports;
    },

    // Return JWT token to TCP, to send to user
    onInitPlayer: async(socket) => {
        const game = getNextOpenGame();
        const player = game.board.addProvisionalPlayer(socket);

        const user = {
            id: player.id,
            gameId: game.id
        }
        
        // RETURN JWT TO USER
        try{
            const payload = user;
            
            // Once added, send encrypted playerIp and boardId to user
            const token = await getToken(payload);
            return {
                user,
                jwt: token
            };
            
        }catch(err){
            console.log(err);
        }
    },

    onCompletePlayer: (id, gameId, ip, port) => {
        const game = games[gameId];

        return game.board.completeProvisionalPlayer(id, ip, port);
    },

    onUpdatePlayer: (id, gameId, update) => {
        const game = games[gameId];

        game.board.updatePlayer(id, update);
    },

    onRemovePlayer: async({ id, gameId }) => {
        // Remove Player
        console.log("Removing player...");

        games[gameId].board.removePlayer(id);
    },
}

const createNewGame = () => {
    const newGame = new GameEngine();
    games[newGame.id] = newGame;
    currentGameId = newGame.id;

    console.log("create new game");

    newGame.start();

    return newGame;
}
const getCurrentGame = () => games[currentGameId];
const isCurrentGameFull = () => getCurrentGame() ? getCurrentGame().isBoardFull() : true;

const getAllOpenGames = () => {
    let openGames = [];
    this.games.foreach(game => {
        if(!game.isBoardFull()) openGames.push(game);
    });

    // None open
    // if(openGames.length === 0) openGames = undefined;

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

    return openGames.length > 0 ? openGames[0] : createNewGame();
}