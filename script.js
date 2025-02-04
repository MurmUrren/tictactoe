
const gameBoard = (function () {
    let board = new Array(9).fill(null);
    let currentPlayer = "X";
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
            addEventListeners();
        } else {
            console.log("reset board");
            resetBoard();
        }
    }

    const addEventListeners = () => {
        const squares = document.querySelectorAll(".board-square");
        squares.forEach((square, index) => {
            square.addEventListener("click", () => handleSquareClick(index));
        });
    };

    const handleSquareClick = (index) => {
        const moveSuccessful = makeMove(index, currentPlayer);  
        if (moveSuccessful) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
        }
    };

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
            return true;
        } else {
            console.log("Square already taken!");
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
    const squares = document.querySelectorAll(".board-square");
        squares.forEach((square, index) => {
            square.addEventListener("click", () => handleSquareClick(index));
        });

    const handleSquareClick = (index) => {
        const moveSuccessful = makeMove(index, currentPlayer);  
        if (moveSuccessful) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
        }
    };

    return {name, letter};
};

const initGameButton = document.querySelector(".newgame-btn");
initGameButton.addEventListener("click", () => {
    gameBoard.initBoard();
    const pXName = document.getElementById("playerX_name");
    const pYName = document.getElementById("playerY_name")
    const playerX = Player(pXName.textContent, 'X');
    const playerO = Player(pYName.textContent, 'O');
})

//gameBoard.initBoard();


