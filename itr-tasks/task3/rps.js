const prompt = require("prompt-sync")({ sigint: true });
const asciiTable = require('ascii-table');
const crypto = require('crypto');

class GameRules {
    constructor(moves) {
        this.moves = moves;
    }

    determineOutcome(i, j) {
        const n = this.moves.length;

        const half = Math.floor(n / 2);

        let winMoves = [];
        let loseMoves = [];

        for (let k = 1; k <= half; k++) {
            winMoves.push(this.moves[(j + k) % n]);
            loseMoves.push(this.moves[(j - k + n) % n]);
        } 

        if (winMoves.includes(this.moves[i])) return "win";
        else if (loseMoves.includes(this.moves[i])) return "lose";
        else return "draw";
    }
}

class TableGenerator {
    constructor(moves) {
        this.moves = moves;
        this.rules = new GameRules(moves) 
    }

    generateTable() {
        const table = new asciiTable();

        table.setHeading("PC \\ Player -> ", ...this.moves);

        for (let i = 0; i < this.moves.length; i++) {
            const row = [this.moves[i]];

            for (let j = 0; j < this.moves.length; j++)
                row.push(this.rules.determineOutcome(j, i));

            table.addRow(row);
        }

        return (table + "\n").toString();
    }
}

class HMACGenerator {
    static generateHMAC(key, data) {
        return crypto.createHmac('sha256', key).update(data).digest('hex');
    }

    static generateKey() {
        return crypto.randomBytes(32).toString('hex');
    }
}

class Game {
    constructor(moves) {
        this.moves = moves;
        this.rules = new GameRules(moves);
        this.table = new TableGenerator(moves);
    }

    play() {
        while (true) {
            if (this.moves.length < 3 || this.moves.length % 2 === 0 || new Set(this.moves).size !== this.moves.length) {
                console.error("Invalid arguments. Please provide an odd number (<1) of non-repeating strings.");
                console.log("Example: node rps.js rock paper scissors");
                break;
            }

            const hmacKey = HMACGenerator.generateKey()
            const computerMove = this.getRandomMove();
            const hmac = HMACGenerator.generateHMAC(hmacKey, computerMove.toString());

            console.log(`HMAC: ${hmac}`);
            this.displayMenu();

            const playerMove = prompt("Enter your move: ");

            if (this.isPlayerInputCorrect(playerMove)) {
                if (playerMove === "0") break;
                else if (playerMove === "?") console.log("\n", this.table.generateTable());
                else {
                    console.log(`Your move: ${this.moves[parseInt(playerMove)-1]}`);
                    console.log(`Computer move: ${this.moves[computerMove-1]}`);
                    console.log(`You ${this.rules.determineOutcome(parseInt(playerMove)-1, computerMove-1)}`);
                    console.log(`HMAC key: ${hmacKey}\n`);
                }
            } else {
                console.error("Invalid input. Please enter a valid move.\n");
                continue;
            }
        }
    }

    displayMenu() {
        console.log("Available moves:");
        this.moves.forEach((move, index) => console.log(`${index + 1} - ${move}`));
        console.log("0 - exit");
        console.log("? - help");
    }

    isPlayerInputCorrect(playerMove) {
        if (this.moves[playerMove-1] || playerMove == "0" || playerMove == "?") return true;
        else return false;
    }

    getRandomMove() {
        return Math.ceil(Math.random() * this.moves.length);
    }
}

const moves = process.argv.slice(2);
const game = new Game(moves);

game.play();