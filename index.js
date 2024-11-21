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

// dom elements
const cells = document.querySelectorAll('.cell')
const playerElement = document.querySelector('#status')
const resetButton = document.querySelector('#reset-btn')

// define event listeners
resetButton.addEventListener('click', () =>resetGame())
cells.forEach(cell => cell.addEventListener('click', (e) => handleClick(+e.target.id)))

// handle events
function handleClick(cellId) {
    if (choices[currentPlayer].includes(cellId)) return

    document.getElementById(cellId).innerText = currentPlayer
    choices[currentPlayer].push(cellId)

    const isGameOver = checkPatternMatch()
    if (isGameOver) {
        alert(`${currentPlayer} wins!`)
        resetGame()
        return
    }

    const isGameDraw = checkDraw()
    if (isGameDraw) {
        alert('It\'s a draw!')
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
    playerElement.innerText = `Player ${currentPlayer}'s Turn`

}
function checkPatternMatch() {
    for (let pattern of winningPaterns) {

      let filteredArr = pattern.filter(num => choices[currentPlayer].includes(num));
      return filteredArr.length === COUNT_TO_WIN;
    }
    return false;
}
function checkDraw() {
    return choices['X'].length + choices['O'].length === TOTAL_CELLS
}