export function generateEmptyBoard() {
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

export function getSubWin(subBoard){
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

export function checkSubWin(subBoard){
  return getSubWin(subBoard) !== null;
}

export function getWin(board) {
  let tempBoard = board.map(subBoard=>{
    let winner = getSubWin(subBoard);
    if (winner === null) {
      return -1;
    }
    return winner
  });
  return getSubWin(tempBoard)
}

export function checkWin(board) {
  return getWin(board) !== null;
}

export function areEqualShallow(a, b) {
  for(var key in a) {
    if(!(key in b) || a[key] !== b[key]) {
      return false;
    }
  }
  for(var key in b) {
    if(!(key in a) || a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}