let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let fs = require("fs");

app.use(express.static("../client"));

app.get('/', function (req, res) {
  res.redirect('index.html');
});
server.listen(3000, () => {
  console.log('connected');
});


function matrixGenerator(
  matrixSize,
  grass,
  grassEater,
  superdog,
  predator,
  bomb,
  superman
) {
  var matrix = [];

  for (let i = 0; i < matrixSize; i++) {
    matrix.push([]);
    for (let j = 0; j < matrixSize; j++) {
      matrix[i].push(0);
    }
  }

  for (let i = 0; i < grass; i++) {
    let x = Math.floor(Math.random() * matrixSize);
    let y = Math.floor(Math.random() * matrixSize);
    matrix[y][x] = 1;
  }

  for (let i = 0; i < grassEater; i++) {
    let x = Math.floor(Math.random() * matrixSize);
    let y = Math.floor(Math.random() * matrixSize);
    matrix[y][x] = 2;
  }

  for (let i = 0; i < superdog; i++) {
    let x = Math.floor(Math.random() * matrixSize);
    let y = Math.floor(Math.random() * matrixSize);
    matrix[y][x] = 3;
  }

  for (let i = 0; i < predator; i++) {
    let x = Math.floor(Math.random() * matrixSize);
    let y = Math.floor(Math.random() * matrixSize);
    matrix[y][x] = 4;
  }

  for (let i = 0; i < bomb; i++) {
    let x = Math.floor(Math.random() * matrixSize);
    let y = Math.floor(Math.random() * matrixSize);
    matrix[y][x] = 5;
  }

  for (let i = 0; i < superman; i++) {
    let x = Math.floor(Math.random() * matrixSize);
    let y = Math.floor(Math.random() * matrixSize);
    matrix[y][x] = 6;
  }

  return matrix;
}

matrix = matrixGenerator(30, 17, 40, 20, 30, 2, 20, 20);

io.sockets.emit('send matrix', matrix)

grassArr = [];
grassEaterArr = []
predatorArr = []
superdogArr = [] 
supermanArr = []
bombArr = []


Grass = require("./Grass")
GrassEater = require("./GrassEater")
predator = require("./predator")
superdog = require("./superdog")
superman = require("./superman")
bombArr = require("./bomb")

function createObject(matrix) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        let grass = new Grass(x, y);
        grassArr.push(grass);
      } else if (matrix[y][x] == 2) {
        let grEat = new GrassEater(x, y);
        grassEaterArr.push(grEat);
      } else if (matrix[y][x] == 3) {
        let spd = new Superdog(x, y);
        superdogArr.push(spd);
      } else if (matrix[y][x] == 4) {
        let pred = new Predator(x, y);
        predatorArr.push(pred);
      } else if (matrix[y][x] == 5) {
        let bomb = new Bomb(x, y);
        bombArr.push(bomb);
      } else if (matrix[y][x] == 6) {
        let spm = new Superman(x, y);
        supermanArr.push(spm);
      }
    }
  }
  io.sockets.emit('send matrix', matrix)
}

function game() {
  for (let i in grassArr) {
    grassArr[i].mul();
  }

  for (let i in grassEaterArr) {
    grassEaterArr[i].eat();
  }

  for (let i in superdogArr) {
    superdogArr[i].eat();
  }

  for (let i in predatorArr) {
    predatorArr[i].eat();
  }

  for (let i in supermanArr) {
    supermanArr[i].demine();
  }
}
setInterval(game, 1000)

io.on('connection', function () {
  createObject(matrix)
})
