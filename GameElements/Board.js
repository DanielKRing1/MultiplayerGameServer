const uuidv1 = require('uuid/v1');
const { getClient } = require('../Databases/redis');

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
        
        this.playerCount = 0;
    }

    async addPlayer(playerIp) {

        let obj = {};

        console.time('JS Object');
        for(let i = 0; i < 50000; i++) {
            obj[i]= {
                a: i,
                b: i,
                c: i,
                d: i,
                e: i,
                f: i,
                g: i,
                h: i,
                i: i,
                j: i,
                k: i,
            };
        }
        console.timeEnd('JS Object');
        console.log('Done ^')
        console.log();

        let client = Board.players;
        console.time('Redis');
        for(let i = 0; i < 50000; i++) {
            client.hmset(i,
                'a', i,
                'b', i,
                'c', i,
                'd', i,
                'e', i,
                'f', i,
                'g', i,
                'h', i,
                'i', i,
                'j', i,
                'k', i,
                );
        }
        console.timeEnd('Redis');
        console.log('Done ^')
        console.log();

        const xPos = randInt(0, this.width);
        const yPos = randInt(0, this.height);

        // Store in Redis
        Board.players.hmset(playerIp, [
            'position', `${xPos} ${yPos}`,
            'radius', '1',

        ]);

        //const newPlayer = new Player(playerIp, xPos, yPos, 1, 'a');

        try {

            const obj = await Board.players.hgetallAsync(playerIp);
            console.log('Player Redis data');
            console.log(obj);

        }catch(err) {
            console.log(err);
        }

        this.players[playerIp] = newPlayer;
        this.playerCount++;
    }

    isFull() {
        return this.playerCount >= playersPerBoard;
    }
}

// Static
Board.players = getClient();

module.exports = Board;