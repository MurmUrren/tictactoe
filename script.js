
const gameBoard = (function () {
    const board = new Array(9).fill(null);
    board[0] = 'X';
    board[4] = 'X';
    const gameBoardContainer = document.createElement("div");
    gameBoardContainer.className = "board-container";

    const resetBoard = () => {
        console.log("hehe boaaaaa")
        const boardSquares = document.querySelectorAll("board-square");
        boardSquares.forEach(square => {
            square.textContent = "";
        });
    };

    const initBoard = () => {
        if (!gameBoardContainer.hasChildNodes()) {
            document.body.appendChild(gameBoardContainer);
            drawBoard();
        }
        resetBoard();
    }

    const drawBoard = () => {
        for(let i = 0; i < 9; i++){
            console.log(board[i]);
            const boardSquare = document.createElement('div');
            const boardSquareTextContent = document.createElement('p');
            boardSquare.className = "board-square";
            boardSquareTextContent.textContent = board[i];
            boardSquare.appendChild(boardSquareTextContent);
            boardSquareTextContent.id = i;
            gameBoardContainer.appendChild(boardSquare);
        }
    }

    const drawLetter = (index, player) => {
        const boardSquareTextContent = document.getElementById(index);
        boardSquareTextContent.textContent = player;
    }

    const makeMove = (index, choice) => {
        console.log(`${index}, ${choice}`)
        if (board[index] === null) {
            board[index] = choice;
            drawLetter(index, choice);
            checkWin(choice);
        }
    }

    const checkWin = (player) => {

        console.log(`hehe player ${player}`)
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]

        ]
        
        winPatterns.forEach((pattern) => {
            console.log(pattern);
            //console.log(board[pattern[0]])
            if (board[pattern[0]] === player && board[pattern[1]] === player && board[pattern[2]] === player) {
                console.log(`player ${player} wins`);
                initBoard();
            }
        });
    }

    return { initBoard, makeMove, checkWin };
})();


function Player(name, letter) {
    return {name, letter};
};


const playerX = Player('pancho', 'X');
const playerY = Player('pepe', 'O');


gameBoard.initBoard();
gameBoard.makeMove(8, playerX.letter);
