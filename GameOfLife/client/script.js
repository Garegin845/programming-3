let socket = io();


let side = 30;


function setup() {
  frameRate(15);
  createCanvas(30* side, 30 * side);

}

function drawGame(matrix) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      var toLot = side - side * 0.2;
      textSize(toLot);
      if (matrix[y][x] == 1) {
        fill("green");
        rect(x * side, y * side, side, side);
        text("☘️", x * side, y * side + toLot);
      } else if (matrix[y][x] == 2) {
        fill("brown");
        rect(x * side, y * side, side, side);
        text("🐄", x * side, y * side + toLot);
      } else if (matrix[y][x] == 3) {
        fill("orange");
        rect(x * side, y * side, side, side);
        text("🐕‍🦺", x * side, y * side + toLot);
      } else if (matrix[y][x] == 4) {
        fill("black");
        rect(x * side, y * side, side, side);
        text("🦕", x * side, y * side + toLot);
      } else if (matrix[y][x] == 5) {
        fill("white");
        rect(x * side, y * side, side, side);
        text("💣", x * side, y * side + toLot);
      } else if (matrix[y][x] == 6) {
        fill("aqua");
        rect(x * side, y * side, side, side);
        text("🦸‍♀️", x * side, y * side + toLot);
      } else {
        fill("#14CD6B");
        rect(x * side, y * side, side, side);
      }
    }
  }

}

setInterval(
  function () {
  socket.on('send matrix', drawGame)
  },1000
)