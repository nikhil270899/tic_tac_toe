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
let obj = {
    'X': [],
    'O': [],
}
const cells = document.querySelectorAll('.cell')
const playerElement = document.querySelector('#status')
const resetButton = document.querySelector('#reset-btn')

resetButton.addEventListener('click', () =>resetGame())

cells.forEach(cell =>{
    cell.addEventListener('click', (e) => handleClick(+e.target.id))
})


function handleClick(cellId) {
    if (obj[currentPlayer].includes(cellId)) return

    document.getElementById(cellId).innerText = currentPlayer
    obj[currentPlayer].push(cellId)

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
    obj['X'] = []
    obj['O'] = []
    currentPlayer = 'X'
    playerElement.innerText = `Player ${currentPlayer}'s Turn`

}

function checkPatternMatch() {
    for (let pattern of winningPaterns) {

      let filteredArr = pattern.filter(num => obj[currentPlayer].includes(num));
      return filteredArr.length === 3;
    }
    return false;
  }

function checkDraw() {
    return obj['X'].length + obj['O'].length === 9
}