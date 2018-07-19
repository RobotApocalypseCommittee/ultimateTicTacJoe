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

export function checkWin(board) {

  var checkLine = function(temp) {
    if (temp[0]==-1) {
      return null;
    } else if (temp[0]==temp[1] && temp[0] == temp[2]) {
      return temp[0];
    }
  }
  
  var checkWin = function (grid) {
    //Check Rows
    for (var row = 0; row < 3; row++) {
      var temp = [];
      for (var square = 0; square < 3; square++) {
        temp.push(grid[square + 3*row]);
      }
      if (checkLine(temp) != null) {
        return checkLine(temp);
      }
    }
    //Check Columns
    for (var col = 0; col < 3; col++) {
      var temp = [];
      for (var square = 0; square < 3; square++) {
        temp.push(grid[square]);
      }
      if (checkLine(temp) != null) {
        return checkLine(temp);
      }
    }
    //Check Diags
    var diags = [[0, 4, 8],[2, 4, 6]]
    for (var i = 0; i < 2; i++) {
      var temp = [];
      for (var j = 0; j < 3; j++) {
          temp.push(grid[j]);
      }
      if (checkLine(temp) != null) {
        return checkLine(temp);
      }
    }

    return False;
  }
  // yo throw some tests at this pls


  for (var subGrid = 0; subGrid < 9; subGrid++) {
      checkWin(board[subGrid]);
      //Some other stuff which I'll write later

  }
}