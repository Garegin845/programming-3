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
  
  let matrix = matrixGenerator(30, 17, 40, 20, 30, 2, 20, 20);