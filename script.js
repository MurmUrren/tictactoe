
const gameBoard = (function () {
    let board = new Array(9).fill(null);

    const gameBoardContainer = document.createElement("div");
    gameBoardContainer.className = "board-container";
    
    const resetBoard = () => {
        console.log("hehe boaaaaa")
        const boardSquares = document.querySelectorAll(".board-square > p");
        boardSquares.forEach(square => {
            square.textContent = "";
        });
        board = new Array(9).fill(null);
        board.forEach(element => {
            console.log(element);
        });
    };

    const initBoard = () => {
        if (!gameBoardContainer.hasChildNodes()) {
            document.body.appendChild(gameBoardContainer);
            drawBoard();
        } else {
            console.log("reset board");
            resetBoard();
        }
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
            //checkWin(choice);
            return true;
        } else {
            return false;
        }
    }

    const checkWin = (player) => {

        console.log(`hehe player ${player}`)
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]

        ]
        
        return winPatterns.some((pattern) => {
            console.log(pattern);
            if (board[pattern[0]] === player && board[pattern[1]] === player && board[pattern[2]] === player) {
                return true;
            }
            return false;
        });
    }

    const isDraw = () => {
        let full = true;
        board.forEach(element => {
            if (element === null) {
                full = false;
            }
        });

        return full;
    }
    

    return { initBoard, makeMove, checkWin, isDraw, resetBoard};
})();


function Player(name, letter) {
    const makeMove = (index) => {
        if (gameBoard.makeMove(index, letter)) {
            if (gameBoard.checkWin(letter)) {
                alert(`${name} wins!`);
                gameController.endGame();
            } else if (gameBoard.isDraw()) {
                alert("It's a draw!");
                gameController.endGame();
            } else {
                gameController.switchPlayer();
            }
        } else {
            console.log("Square already taken!");
        }
    }
 
    return {name, letter, makeMove};
};

const gameController = (function () {
    let playerX, playerO, currentPlayer;

    const startGame = () => {
        const pXName = document.getElementById("playerX_name").textContent || "Player X";
        const pOName = document.getElementById("playerY_name").textContent || "Player O";

        playerX = Player(pXName, 'X');
        playerO = Player(pOName, 'O');
        currentPlayer = playerX;

        gameBoard.initBoard();
        addEventListeners();
    };

    const addEventListeners = () => {
        const squares = document.querySelectorAll(".board-square");
        squares.forEach((square, index) => {
            square.addEventListener("click", () => currentPlayer.makeMove(index));
        });
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
    };

    const endGame = () => {
        setTimeout(() => {
            alert("Restarting game...");
            gameBoard.resetBoard();
        }, 1000);
    };

    return { startGame, switchPlayer, endGame };
})();


const initGameButton = document.querySelector(".newgame-btn");
initGameButton.addEventListener("click", () => {
    gameController.startGame();
})

//gameBoard.initBoard();


