
function validateMove(board, criteria, move) {
  if (move.hasOwnProperty("playerIndex") && move.playerIndex !== criteria.playerIndex){
    return false
  }
  return (// Player placed in correct main square
    (move.mainIndex === criteria.mainIndex || criteria.mainIndex === -1) &&
    // Square was available for placement
    (board[move.mainIndex][move.subIndex] === -1)
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
    if (subBoard[a] && subBoard[a] === subBoard[b] && subBoard[a] === subBoard[c] && subBoard[a] !== -1) {
      return {winner:subBoard[a], line:lines[i]};
    }
  }
  return null;
}

function checkSubWin(subBoard){
  return getSubWin(subBoard) !== null;
}

function getWin(board) {
  let tempBoard = board.map(subBoard=>{
    let winner = getSubWin(subBoard);
    if (winner === null) {
      return -1;
    }
    return winner
  });
  return getSubWin(tempBoard)
}

function checkWin(board) {
  return getWin(board) !== null;
}

function calculateNextCriteria(board, lastMove) {
  let criteria = {};
  // Swap indexes
  criteria.playerIndex = lastMove.playerIndex ? 0 : 1;
  criteria.mainIndex = lastMove.subIndex;
  if (board[criteria.mainIndex].indexOf("-") === -1) {
    // If square full, user can select any square(-1)
    criteria.mainIndex = -1;
  }
  return criteria;
}

function generateEmptyBoard() {
  let x = [];
  for (let i = 0; i < 9; i++) {
    let y = [];
    for (let j = 0; j < 9; j++){
      y.push(-1);
    }
    x.push(y);
  }
  return x;
}

module.exports = {calculateNextCriteria, checkSubWin, checkWin, getSubWin, getWin, validateMove, generateEmptyBoard};


