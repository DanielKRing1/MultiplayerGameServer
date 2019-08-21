const uuidv1 = require('uuid/v1');

const Player = require('./Player');
const { randInt } = require('../util/methods');
const { boardWidth, boardHeight, playersPerBoard } = require('../util/constants');

// const testRandInt = () => {
//     let percentResults = [];

//     const totalRandoms = 1000;
//     let results = new Array(high - low + 1).fill(0);
    
//     for(let i = 0; i < totalRandoms; i++){
//         const val = randInt(low, high);
//         const index = val - low;
//         results[index]++;
//     }
    
//     results.forEach((index, i) => percentResults[i] = (index / totalRandoms));

//     return percentResults;
// }

// const iterations = 1000;
// const low = 1;
// const high = 10;

// let totalPercentages = new Array(high - low + 1).fill(0);
// for(let i = 0; i < iterations; i++) {
//     const percentResults = testRandInt();
//     percentResults.forEach((percent, i) => totalPercentages[i] += percent);
// }

// totalPercentages.forEach(percentage => console.log(`${percentage / iterations * 100} %`));


const Board = class {

    constructor() {
        this.id = uuidv1();
        this.height = boardHeight;
        this.width = boardWidth;  
        
        this.players = {};
        this.playerCount = 0;
    }

    addPlayer(playerId) {
        const xPos = randInt(0, this.width);
        const yPos = randInt(0, this.height);
        const newPlayer = new Player(playerId, xPos, yPos, 1, 'a');

        this.players[playerId] = newPlayer;
        this.playerCount++;
    }

    isFull() {
        return this.playerCount >= playersPerBoard;
    }
}

module.exports = Board;