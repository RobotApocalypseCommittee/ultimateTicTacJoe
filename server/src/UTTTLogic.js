
function validateMove(board, criteria, move) {
  if (move.hasOwnProperty("playerIndex") && move.playerIndex !== criteria.playerIndex){
    return false
  }
  return (// Player placed in correct main square
    (move.mainIndex === criteria.mainIndex || criteria.mainIndex === -1) &&
    // Square was available for placement
    (board.subGrids[move.mainIndex][move.subIndex] === -1)
  );
}

function getSubWin(subBoard){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (subBoard[a] === subBoard[b] && subBoard[a] === subBoard[c] && subBoard[a] !== -1) {
      return {winner: subBoard[a], line: lines[i]};
    }
  }
  return null;
}

function checkSubWin(subBoard){
  return getSubWin(subBoard) !== null;
}

function updateBoardWins(board) {
  for (let i = 0; i < board.grid.length; i++) {
    if (board.grid[i] === -1) {
      let win = getSubWin(board.subGrids[i]);
      board.grid[i] = win !== null ? win.winner : -1
    }
  }
  return board
}

function getWin(board) {
  return getSubWin(board.grid);
}

function checkWin(board) {
  return getWin(board) !== null;
}


function getCalculateNextCriteria(gridLockState) {
  if (gridLockState === 0) {
    return function(board, lastMove) {
      let criteria = {};
      // Swap indexes
      criteria.playerIndex = lastMove.playerIndex ? 0 : 1;
      criteria.mainIndex = lastMove.subIndex;
      if (board.subGrids[criteria.mainIndex].indexOf(-1) === -1) {
        // If square full, user can select any square(-1)
        criteria.mainIndex = -1;
      }
      return criteria;
    }
  } else {
    return function(board, lastMove) {
      let criteria = {};
      // Swap indexes
      criteria.playerIndex = lastMove.playerIndex ? 0 : 1;
      criteria.mainIndex = lastMove.subIndex;
      if (board.subGrids[criteria.mainIndex].indexOf(-1) === -1 || checkSubWin(board.subGrids[criteria.mainIndex])) {
        // If square won(or full), user can select any square(-1)
        criteria.mainIndex = -1;
      }
      return criteria;
    }
  }
}

function generateEmptyBoard() {
  let x = [];
  for (let i = 0; i < 9; i++){
    let y = [];
    for (let j = 0; j < 9; j++) {
      y.push(-1)
    }
    x.push(y)
  }
  let z = [];
  for (let i = 0; i<9; i++){
    z.push(-1);
  }
  return {
    subGrids: x,
    grid: z
  }
}

module.exports = {getCalculateNextCriteria, checkSubWin, checkWin, getSubWin, getWin, validateMove, generateEmptyBoard, updateBoardWins};


