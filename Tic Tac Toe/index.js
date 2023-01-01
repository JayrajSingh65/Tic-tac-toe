const xClass = "x";
const circleclass = "circle";

const winning_Combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

]



const cellElement = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageText = document.querySelector('[data-winning-text]');
const restartButton = document.getElementById('restart');


let circleTurn
startGame()

restartButton.addEventListener('click', startGame)
function startGame(){
    circleTurn = false
    cellElement.forEach(cell => {
        cell.classList.remove(xClass)
        cell.classList.remove(circleclass)
        cell.removeEventListener('click', handleclick)
    
        cell.addEventListener('click', handleclick, {once: true})
    
    })
    setHoverBoardClass()
    winningMessageElement.classList.remove('show')
    
}

function handleclick(e){
    const cell = e.target;
    const currentCell = circleTurn ? circleclass : xClass
    placeMark(cell, currentCell)
    if(checkWin(currentCell)){
        endGame(false)

    } else if(isDraw()) {
        endGame(true)
        
    }else {
        swapTurn()
        setHoverBoardClass()
    }
   
   
}
 

// To end our game
function endGame(draw){
    if(draw){
        winningMessageText.innerText = 'Draw'

    }
    else{
     winningMessageText.innerText = `${circleTurn ? "O" :
    "X"} is winner!`
    }
  winningMessageElement.classList.add('show')
}

function isDraw(){
    return [...cellElement].every(cell => {
        return cell.classList.contains(xClass) ||
        cell.classList.contains(circleclass) 
        
    })
}
// To place mark
function placeMark(cell, currentCell){
    cell.classList.add(currentCell)
    
}

function swapTurn(){
    circleTurn = !circleTurn
}

function setHoverBoardClass(){
    board.classList.remove(xClass)
    board.classList.remove(circleclass)
    if(circleTurn){
        board.classList.add(circleclass)
    }else{
        board.classList.add(xClass)
    }

}

function checkWin(currentCell){
    return winning_Combinations.some(combination => {
        return combination.every(index => {
            return cellElement[index].classList.contains(currentCell)
        })
    })
}