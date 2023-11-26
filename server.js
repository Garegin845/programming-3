let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let fs = require("fs");
const Predator = require('./predator');

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
Predator = require("./predator")
Superdog = require("./superdog")
Superman = require("./superman")
Bomb = require("./bomb")

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

function kill() {
  GrassArr = [];
  GrassEaterArr = [];
  PredatorArr = [];
  SupermanArr = [];
  SuperdogArr = [];
  BombArr = [];
  for (var y = 0; y < matrix.length; y++) {
      for (var x = 0; x < matrix[y].length; x++) {
          matrix[y][x] = 0;
      }
  }
}
function addGrass() {
  for (var i = 0; i < 7; i++) {
      var x = Math.floor(Math.random() * matrix[0].length)
      var y = Math.floor(Math.random() * matrix.length)
      if (matrix[y][x] == 0) {
          matrix[y][x] = 1
          var gr = new Grass(x, y, 1)
          GrassArr.push(gr)
      }
  }
}
function addGrassEater() {
  for (var i = 0; i < 7; i++) {
      var x = Math.floor(Math.random() * matrix[0].length)
      var y = Math.floor(Math.random() * matrix.length)
      if (matrix[y][x] == 0) {
          matrix[y][x] = 2
          GrassEaterArr.push(new GrassEater(x, y, 2))
      }
  }
}


function addPredator() {
  for (var i = 0; i < 7; i++) {
      var x = Math.floor(Math.random() * matrix[0].length)
      var y = Math.floor(Math.random() * matrix.length)
      if (matrix[y][x] == 0) {
          matrix[y][x] = 3
          PredatorArr.push(new Predator(x, y, 3))
      }
  }
}
function addSuperman() {
  for (var i = 0; i < 7; i++) {
      var x = Math.floor(Math.random() * matrix[0].length)
      var y = Math.floor(Math.random() * matrix.length)
      if (matrix[y][x] == 0) {
          matrix[y][x] = 4
          SupermanArr.push(new Superman(x, y, 4))
      }
  }
}
function addSuperdog() {
  for (var i = 0; i < 7; i++) {
      var x = Math.floor(Math.random() * matrix[0].length)
      var y = Math.floor(Math.random() * matrix.length)
      if (matrix[y][x] == 0) {
          matrix[y][x] = 5
          SupermanArr.push(new Superman(x, y, 5))
      }
  }
}



function weather() {
  if (weath == "winter") {
      weath = "spring"
  }
  else if (weath == "spring") {
      weath = "summer"
  }
  else if (weath == "summer") {
      weath = "autumn"
  }
  else if (weath == "autumn") {
      weath = "winter"
  }
  io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);


////

io.on('connection', function (socket) {
  createObject();
  socket.on("kill", kill);
  socket.on("add grass", addGrass);
  socket.on("add grassEater", addGrassEater);
  socket.on("add Predator", addPredator);
  socket.on("add Superman", addSuperman);
  socket.on("add Superdog", addSuperdog);

});


var statistics = {};

setInterval(function () {
  statistics.Grass = GrassArr.length;
  statistics.GrassEater = GrassEaterArr.length;
  statistics.Predator = PredatorArr.length;
  statistics.Superman = SupermanArr.length;
  statistics.Superdog = SuperdogArr.length;

  fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
      console.log("send")
  })
}, 1000)
setInterval(game, 1000)

io.on('connection', function () {
  createObject(matrix)
})

