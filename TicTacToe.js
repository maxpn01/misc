const prompt = require("prompt-sync")({ sigint: true });
const print = (x) => console.log(x);
const _ = " ",
      x = "X",
      o = "O";
const board = [
    _, _, _,
    _, _, _,
    _, _, _
];
const scores = {
    Draws: 0,
    XWon: 0,
    OWon: 0
};



gameInit();



function gameInit() {
    let turn = x;

    while(true) {
        displayBoards();
        markCell(promptMove(turn), turn);

        if (checkWinners(turn)) {
            displayWinner(turn);
            if (!promptContinueGame()) break;
        }

        turn = turn === x ? o : x;
    }
}

/********* MOVES & DECISIONS *********/

function promptMove(player) {
   while (true) {
        const cellIndex = Number(prompt(`[1-9] ${player.toLowerCase()}: `)) - 1;

        if (isNaN(cellIndex)) { 
            print("Invalid number!"); 
            continue; 
        }
        if (cellIndex > board.length-1 || cellIndex < 0) {
            print("Number exceeds the board boundaries!"); 
            continue;
        }   
        if (board[cellIndex] !== " ") { 
            print("Cell is taken!"); 
            continue; 
        }

        return cellIndex;
   }
}

function promptContinueGame() {
    while (true) {
        const choice = prompt(`Do you wish to continue? (y/n) `);
        
        if (choice == "y") return true;
        else if (choice == "n") return false;
        else {
            print("Invalid choice!")
            continue;
        }
    }
}

function markCell(pMove, pMark) {
    board[pMove] = pMark;
}

/********* BOARD *********/

function printBoard() {
print(`\n| ${board[0]} | ${board[1]} | ${board[2]} |
-------------
| ${board[3]} | ${board[4]} | ${board[5]} |
-------------
| ${board[6]} | ${board[7]} | ${board[8]} |`);
}

function printScoreBoard() {
    print(`x: ${scores.XWon}`);
    print(`draws: ${scores.Draws}`);
    print(`o: ${scores.OWon} \n`);
}

function displayBoards() {
    printBoard();
    printScoreBoard();
}

function clearBoard() {
    for (let i = 0; i < board.length; i++) {
        board[i] = _;
    }
}

/********* END GAME *********/

function displayWinner(player) {
    if (checkWinFor(player)) print(`${player} won!`);
    if (checkBoardFull()) print("It's a draw!");
    displayBoards();
    clearBoard();
}

function checkWinners(player) {
    if (checkWinFor(player)) {
        if (player === "X") scores.XWon++;
        if (player === "O") scores.OWon++;
        return true;
    }
    if (checkBoardFull()) {
        scores.Draws++;
        return true;
    }
}

function checkBoardFull() {
    for (let i = 0; i < board.length; i++) {
        if (board[i] === " ") return false;
    }

    return true;
}

function checkWinFor(player) {
    // Rows
    if (board[0] === player && board[1] === player && board[2] === player) return true;
    if (board[3] === player && board[4] === player && board[5] === player) return true;
    if (board[6] === player && board[7] === player && board[8] === player) return true;

    // Columns
    if (board[0] === player && board[3] === player && board[6] === player) return true;
    if (board[1] === player && board[4] === player && board[7] === player) return true;
    if (board[2] === player && board[5] === player && board[8] === player) return true;

    // Diagonals
    if (board[0] === player && board[4] === player && board[8] === player) return true;
    if (board[2] === player && board[4] === player && board[6] === player) return true;

    return false;
}