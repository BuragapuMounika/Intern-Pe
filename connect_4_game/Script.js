const ROWS = 6;
const COLS = 7;
let board = [];
let currentPlayer = 'red';
let gameOver = false;

const boardElement = document.getElementById('board');
const message = document.getElementById('message');
const currentPlayerText = document.getElementById('current-player');

function createBoard() {
  boardElement.innerHTML = '';
  board = Array.from({ length: ROWS }, () => Array(COLS).fill(''));

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener('click', () => handleMove(c));
      boardElement.appendChild(cell);
    }
  }
}

function handleMove(col) {
  if (gameOver) return;

  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === '') {
      board[row][col] = currentPlayer;
      updateUI();
      if (checkWinner(row, col)) {
        message.textContent = `Player ${currentPlayer === 'red' ? 'Red 🔴' : 'Yellow 🟡'} wins!`;
        gameOver = true;
      } else {
        currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
        currentPlayerText.textContent = currentPlayer === 'red' ? 'Red 🔴' : 'Yellow 🟡';
      }
      return;
    }
  }
}

function updateUI() {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const index = r * COLS + c;
      const cell = boardElement.children[index];
      cell.classList.remove('red', 'yellow');
      if (board[r][c]) {
        cell.classList.add(board[r][c]);
      }
    }
  }
}

function checkWinner(row, col) {
  const directions = [
    [[0, 1], [0, -1]],
    [[1, 0], [-1, 0]],
    [[1, 1], [-1, -1]],
    [[1, -1], [-1, 1]]
  ];

  for (let [dir1, dir2] of directions) {
    let count = 1;
    count += countInDirection(row, col, dir1[0], dir1[1]);
    count += countInDirection(row, col, dir2[0], dir2[1]);
    if (count >= 4) return true;
  }

  return false;
}

function countInDirection(row, col, rowDir, colDir) {
  let r = row + rowDir;
  let c = col + colDir;
  let count = 0;

  while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
    count++;
    r += rowDir;
    c += colDir;
  }

  return count;
}

function resetGame() {
  currentPlayer = 'red';
  gameOver = false;
  currentPlayerText.textContent = 'Red 🔴';
  message.textContent = `Player Red 🔴's turn`;
  createBoard();
}

createBoard();
