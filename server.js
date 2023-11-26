let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let fs = require("fs");

const Grass = require('./grass');
const GrassEater = require('./grassEater');
const Bomb = require('./bomb');
const Superman = require('./superman');
const Superdog = require('./superdog');
const Predator = require('./predator');

app.use(express.static("../client"));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, () => {
    console.log('connected');
});


function matrixGenerator(
    matrixSize, grassCount, grassEaterCount, preadatorCount, supermanCount, superdogCount, bombCount) {
    let matrix = [];
    for (let i = 0; i < matrixSize; i++) {
            matrix.push([]);
            for (let j = 0; j < matrixSize; j++) {
                    matrix[i].push(0);
            }
    }

    for (let i = 0; i < grassCount; i++) {
        let x = Math.floor(Math.random() * matrixSize);
        let y = Math.floor(Math.random() * matrixSize);
        matrix[y][x] = 1
}

for (let i = 0; i < grassEaterCount; i++) {
    let x = Math.floor(Math.random() * matrixSize);
    let y = Math.floor(Math.random() * matrixSize);
    matrix[y][x] = 2
}
for (let i = 0; i < preadatorCount; i++) {
    let x = Math.floor(Math.random() * matrixSize)
    let y = Math.floor(Math.random() * matrixSize)
    matrix[y][x] = 3
}
for (let i = 0; i < supermanCount; i++) {
    let x = Math.floor(Math.random() * matrixSize)
    let y = Math.floor(Math.random() * matrixSize)
    matrix[y][x] = 4
}
for (let i = 0; i < superdogCount; i++) {
    let x = Math.floor(Math.random() * matrixSize)
    let y = Math.floor(Math.random() * matrixSize)
    matrix[y][x] = 5
}
for (let i = 0; i < bombCount; i++) {
    let x = Math.floor(Math.random() * matrixSize)
    let y = Math.floor(Math.random() * matrixSize)
    matrix[y][x] = 6
}
return matrix;

}
matrix = matrixGenerator(28, 60, 4, 3, 3, 10);
io.sockets.emit('send matrix', matrix)


grassArray = [];
grassEaterArr = [];
predatorArr = [];
bombArr = [];
supermanArr = [];
superdogArr = [];



 


function createObject() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

             if (matrix[y][x] == 1) {
                                let gr = new Grass(x, y);
                                grassArray.push(gr);
                        }
                        //GrassEate
                        else if (matrix[y][x] == 2) {
                                let gre = new GrassEater(x, y);
                                grassEaterArr.push(gre);
                        }
                        //Preadaor
                        else if (matrix[y][x] == 3) {
                                let pred = new Predator(x, y);
                                predatorArr.push(pred);
                        }
                        //tuyn
                        else if (matrix[y][x] == 4) {
                                let spm  = new Superman(x, y);
                                supermanArr.push(spm);
                        }
                        //Antituyn
                        else if (matrix[y][x] == 5) {
                                let spd = new Superdog(x, y);
                                superdogArr.push(spd);
                        }
                        else if (matrix[y][x] == 6) {
                            let bm = new Bomb(x, y);
                           bombArr.push(bm);
                    }
                
        }
    }
    io.sockets.emit('send matrix', matrix);
}

function game() {
    for (var i in grassArray) {
        grassArray[i].mul();
}
    for (var i in grassEaterArr) {
    grassEaterArr[i].eat();
}
    for (let i = 0; i < predatorArr; i++) {
        predatorArr[i].eat();
    }
    for (let i in bombArr) {
        bombArr[i].getNewCoordinates();
    }
    for (let i in supermanArr) {
        supermanArr[i].getNewCoordinates();
    }
    for (let i in superdogArr) {
        superdogArr[i].getNewCoordinates();
    }
}


setInterval(game, 1000)

io.on('connection', function (socket) {
        createObject(matrix)

        socket.on('Summer',() =>{
                console.log('Summer========>>>>>>>');
        });
        socket.on('Winter',() => {
                console.log('Winter========>>>>>>>');
        });
        socket.on('Spring',() => {
                console.log('Spring========>>>>>>>');
        });
        socket.on('Autumn',() => {
                console.log('Autumn========>>>>>>>');
        });
})


function kill() {
    GrassArr = [];
    GrassEaterArr = [];
    PredatorArr = [];
    BombArr = [];
    SupermanArr = [];
    SuperdogArr = [];
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
}


function addGrass() {
    for (let i = 0; i < 7; i++) {
        let x = Math.floor(Math.random() * matrix[0].length)
        let y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            let gr = new Grass(x, y, 1)
            GrassArr.push(gr)
        }
    }
}
function addGrassEater() {
    for (let i = 0; i < 7; i++) {
        let x = Math.floor(Math.random() * matrix[0].length)
        let y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            GrassEaterArr.push(new GrassEater(x, y, 2))
        }
    }
}





io.on('connection', function (socket) {
    createObject();
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
   
});


let statistics = {
    grassCount: 0,
    grassEaterCount: 0,
    predatorCount: 0,
    superman: 0,
    superdog: 0,
    bomb: 0

};

setInterval(function () {
    statistics.grassCount = grassArray.length;
    statistics.grassEaterCount = grassEaterArr.length;
    statistics.predatorCount = predatorArr.length;
    statistics.bombCount = bombArr.length;
    statistics.supermanCount = supermanArr.length;
    statistics.superdogCount = superdogArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
        console.log("write")
    })
}, 1000)