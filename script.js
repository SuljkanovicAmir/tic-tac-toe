const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const titleMessage = document.querySelector('.title-message');
const resultMessage = document.querySelector('.result-message');
const restartBtn = document.querySelector('.rst-btn');
const playerX = document.querySelector('.x');
const playerCircle = document.querySelector('.circle');
const X_class = 'x'
const CIRCLE_class = 'circle';
let circleTurn;
const playerOne = document.querySelector('.player1');
const playerTwo = document.querySelector('.player2');
const addBtn = document.querySelector('.add-button');
const inputs = document.querySelector('.input-div')
const resultDiv = document.querySelector('.result')


startGame();


addBtn.addEventListener('click', function(e) {
    e.preventDefault();
    setMessageElement();
    inputs.classList.add('hide');
})


function startGame () {    
    circleTurn = false;
    cells.forEach(cell => {
        cell.addEventListener('click', handleGame, {once: true});
    }); 
    setBoardHover();
}


  


restartBtn.addEventListener('click', handleRestart);




const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function handleGame (e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_class : X_class;
    placeMark (cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
    swapTurns()
    setBoardHover()
    setMessageElement();
    inputs.classList.add('hide');
}
}



function endGame (draw) {
    if (draw) {
        resultMessage.innerText = "It's a draw"
        cells.forEach(cell => {
            cell.removeEventListener('click', handleGame);
        }); 
    } else {
        if ((playerTwo.value === "") && (playerOne.value === "")) {
            resultMessage.innerText = `${circleTurn ? `Player 2 is the Winner` : `Player 1 is the Winner`} `;
        } else if (playerTwo.value === "") {
            resultMessage.innerText = `${circleTurn ? `Player 2 is the Winner` : `${playerOne.value} is the Winner`} `;
        } else if (playerOne.value === "") {
            resultMessage.innerText = `${circleTurn ? `${playerTwo.value} is the Winner` : `Player 2 is the Winner`} `;
        } else {
            resultMessage.innerText = `${circleTurn ? `${playerTwo.value} is the Winner` : `${playerOne.value} is the Winner`} `;
        }
        cells.forEach(cell => {
            cell.removeEventListener('click', handleGame);
        }); 
    }
    resultMessage.classList.add('show')
    resultDiv.classList.remove('hide');
}


function isDraw() {
    return [...cells].every(cell => {
        return  cell.classList.contains(X_class) ||
                cell.classList.contains(CIRCLE_class)
    })
}

function placeMark (cell, currentClass) {
    cell.classList.add(currentClass)
}

function checkWin(currentClass) {
    return winningLines.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass)
        })
    })
}

function handleRestart () {
    cells.forEach(item => item.classList.remove('x', 'circle'));
    resultMessage.classList.remove('show')
    inputs.classList.remove('hide');
    resultDiv.classList.add('hide');
    startGame();
 
}

function swapTurns () {
    circleTurn = !circleTurn;
}


function setBoardHover() {
    board.classList.remove(CIRCLE_class);
    board.classList.remove(X_class);
    if (circleTurn) {
        board.classList.add(CIRCLE_class);
    } else {
        board.classList.add(X_class)
    };
}


function setMessageElement() {
    if (circleTurn) {
       titleMessage.textContent = `${playerTwo.value}(O)'s turn`;
            if (playerTwo.value === "") titleMessage.textContent =`Player 2's turn`
    } else {
        titleMessage.textContent = `${playerOne.value}(X)'s turn`;
        if (playerOne.value === "") titleMessage.textContent =`Player 1's turn`
    }
  };
  
setMessageElement();