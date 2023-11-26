let socket = io();
let side = 30;
let weather = "spring";
//test




function setup() {
    frameRate(22);
    createCanvas(30 * side, 30 * side);
}


function nkarel(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[0].length; x++) {
            let toLot = side - side * 0.2;
            textSize(toLot);
            let object = matrix[y][x];
            //grass
            if (object == 1) {
                if (weather == "spring") {
                    fill("green");
                    rect(x * side, y * side, side, side);
                    text("☘️", x * side, y * side + toLot);
                } else if (weather == "summer") {
                    fill("#333300");
                    text("🌼", x * side, y * side + toLot);
                    rect(x * side, y * side, side, side);

                } else if (weather == "winter") {
                    fill("white");
                    text('❄️', x * side, y * side + toLot);
                    rect(x * side, y * side, side, side);

                } else if (weather == "autumn") {
                    fill("#4dffa6");
                    text('🍁', x * side, y * side + toLot);
                    rect(x * side, y * side, side, side);


                }
                //graseater
            } else if (object == 2) {
                if (weather == "spring") {
                    fill("brown");
                    rect(x * side, y * side, side, side);
                    text("🐄", x * side, y * side + toLot);
                } else if (weather == "summer") {
                    fill("BlanchedAlmond");
                    rect(x * side, y * side, side, side);
                    text("🐮", x * side, y * side + toLot);
                }
                else if (weather == "winter") {
                    fill("RoyalBlue");
                    rect(x * side, y * side, side, side);
                    text("🐃", x * side, y * side + toLot);
                }
                else if (weather == "autumn") {
                    fill("Brown");
                    rect(x * side, y * side, side, side);
                    text("🐂", x * side, y * side + toLot);
                }

                //predator
            } else if (object == 3) {
                if (weather == "spring") {
                    fill("black");
                    rect(x * side, y * side, side, side);
                    text("🦕", x * side, y * side + toLot);

                }
                else if (weather == "summer") {
                    fill("darkred");
                    rect(x * side, y * side, side, side);
                    text("🦖", x * side, y * side + toLot);

                } else if (weather == "winter") {
                    fill("Crimson");
                    rect(x * side, y * side, side, side);
                    text("🐛", x * side, y * side + toLot);

                }
                else if (weather == "autumn") {
                    fill("DarkKhaki");
                    rect(x * side, y * side, side, side);
                    text("🧞", x * side, y * side + toLot);
                }

                //superdog
            } else if (object == 5) {
                if (weather == "spring") {
                    fill("orange")
                    rect(x * side, y * side, side, side);
                    text("🐕‍🦺", x * side, y * side + toLot);
                } else if (weather == "summer") {
                    fill("DarkMagenta");
                    rect(x * side, y * side, side, side);
                    text("🐕", x * side, y * side + toLot);

                } else if (weather == "winter") {
                    fill("DarkSlateBlue");
                    rect(x * side, y * side, side, side);
                    text("🦮", x * side, y * side + toLot);

                } else if (weather == "autumn") {
                    fill("DeepPink");
                    rect(x * side, y * side, side, side);
                    text("🐩", x * side, y * side + toLot);

                }
                //kaycak
                else if (matrix[y][x] == 7) {
                    if (weather == "spring") {
                        fill("red");
                        rect(x * side, y * side, side, side);
                        text('💥', x * side, y * side + toLot);
                    } else if (weather == "summer") {
                        fill("darkred");
                        rect(x * side, y * side, side, side);
                        text('🔥', x * side, y * side + toLot);
                    } else if (weather == "winter") {
                        fill("Crimson");
                        rect(x * side, y * side, side, side);
                        text('☄️', x * side, y * side + toLot);
                    } else if (weather == "autumn") {
                        fill("DarkKhaki");
                        rect(x * side, y * side, side, side);
                        text('⚡️', x * side, y * side + toLot);
                    }
                }
                //bomb
            } else if (object == 6) {
                fill("white");
                rect(x * side, y * side, side, side);
                text("💣", x * side, y * side + toLot);

                //superman
            } else if (object == 4 ){
                fill("aqua");
                rect(x * side, y * side, side, side);
                text("🦸‍♀️", x * side, y * side + toLot);
            }
            else if (matrix[y][x] == 5) {
                if (weather == "spring") {
                    fill("aqua");
                    rect(x * side, y * side, side, side);
                    text('🌪', x * side, y * side + toLot);
                } else if (weather == "summer") {
                    fill("LightBlue");
                    rect(x * side, y * side, side, side);
                    text('☁️', x * side, y * side + toLot);
                } else if (weather == "winter") {
                    fill("LightCyan");
                    rect(x * side, y * side, side, side);
                    text('💨', x * side, y * side + toLot);
                } else if (weather == "autumn") {
                    fill("LightSlateGrey");
                    rect(x * side, y * side, side, side);
                    text('🌧', x * side, y * side + toLot);
                }
            }


            else {
                fill("#14CD6B");
                rect(x * side, y * side, side, side);
            }


        }
    }
}


function kill() {

    socket.emit("kill")
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grassEater")
}

setInterval(
    function () {
        socket.on('send matrix', nkarel)
    }, 1000
)
const summer = document.querySelector('#summerid');
const winter = document.querySelector('#winterid');
const spring = document.querySelector('#springid');
const autumn = document.querySelector('#autumnid');


summer.addEventListener('click', () => {
    weather = "summer";
    socket.emit('Summer')
});

winter.addEventListener('click', () => {
    weather = "winter";
    socket.emit('Winter')
});

spring.addEventListener('click', () => {
    weather = "spring";
    socket.emit('Spring')
});

autumn.addEventListener('click', () => {
    weather = "autumn";
    socket.emit('Autumn')
});

