// constants
let currentPlayer = 'X'
const winningPaterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let choices = {
    'X': [],
    'O': [],
}
const TOTAL_CELLS = 9
const COUNT_TO_WIN = 3
let hasGameStarted = false

// dom elements
const cells = document.querySelectorAll('.cell')
const playerElement = document.querySelector('#status')
const startButton = document.querySelector('#start-btn')
const resetButton = document.querySelector('#reset-btn')
const timer = document.querySelector('#timer')



// define event listeners
startButton.addEventListener('click', handleTimer)
resetButton.addEventListener('click', resetGame)
cells.forEach(cell => cell.addEventListener('click', (e) => handleClick(e)))

// handle start button
function handleStart() {
    hasGameStarted = true
    playerElement.style.display = 'block'
    playerElement.innerText = `Player ${currentPlayer}'s Turn`
    resetButton.disabled = false
    timer.style.display = 'none'
    timer.innerText = ''
}

// handle timer
function handleTimer() {
    timer.style.display = 'block'

    let timerCount = 3
    let timerInterval = setInterval(() => {
        if (timerCount < 0) {
            clearInterval(timerInterval)
            handleStart()
            return
        }
        resetButton.disabled = true
        startButton.disabled = true
        timer.innerText = timerCount
        timerCount--
    }, 1000)

}

// handle events
function handleClick(cellElement) {
    const cellId = +cellElement.target.id
    if (choices[currentPlayer].includes(cellId) ||cellElement.target.innerText!== ''  || !hasGameStarted) return

    cellElement.target.innerText = currentPlayer
    choices[currentPlayer].push(cellId)

    const isGameOver = checkPatternMatch()
    if (isGameOver) {
        alert(`${currentPlayer} wins!`)
        resetGame()
        return
    }

    const isGameDraw = checkDraw()
    if (isGameDraw) {
        alert('Draw Match!')
        resetGame()
        return
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    playerElement.innerText = `Player ${currentPlayer}'s Turn`
}
function resetGame() {
    cells.forEach(cell => {
        cell.innerText = ''
    })
    choices['X'] = []
    choices['O'] = []
    currentPlayer = 'X'
    playerElement.style.display = 'none'
    resetButton.disabled = false
    startButton.disabled = false
    hasGameStarted = false
}
function checkPatternMatch() {
    for (let pattern of winningPaterns) {

      let filteredArrLength = pattern.filter(num => choices[currentPlayer].includes(num)).length;
      if(filteredArrLength === COUNT_TO_WIN)  return true;
    }
    return false;
}
function checkDraw() {
    return choices['X'].length + choices['O'].length === TOTAL_CELLS
}