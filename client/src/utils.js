export function generateEmptyBoard(){
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