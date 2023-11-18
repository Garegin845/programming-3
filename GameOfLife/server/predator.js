let LivingCreature = require('./LivingCreature')
module.exports =class Predator extends LivingCreature {
  constructor(x, y) {

    this.energy = 15;
  }

  getNewCoordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1],
    ];
  }

  chooseCell(char,char1) {
    this.getNewCoordinates();
    return super.chooseCell(char,char1)
  }

  mul() {
    let emptyCell = this.chooseCell(0);
    let newCell = newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];

    if (newCell) {
      let newX = newCell[0];
      let newY = newCell[1];

      matrix[newY][newX] == 4;

      let pred = new Predator(newX, newY);
      predatorArr.push(pred);
    }
  }

  eat() {
    let emptyCell = this.chooseCell(1, 2);
    let newCell = newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];

    if (newCell) {
      this.energy += 7;
      let newX = newCell[0];
      let newY = newCell[1];

      for (let i in grassArr) {
        if (newX == grassArr[i].x && newY == grassArr[i].y) {
          grassArr.splice(i, 1);
        }
      }
      for (let i in grassEaterArr) {
        if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
          grassEaterArr.splice(i, 1);
        }
      }

      matrix[newY][newX] = 4;
      matrix[this.y][this.x] = 0;

      this.x = newX;
      this.y = newY;

      if (this.energy > 30) {
        this.mul();
      }
    } else {
      this.move();
    }
  }

  move() {
    let emptyCell = this.chooseCell(0);
    let newCell = newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];

    if (newCell) {
      let newX = newCell[0];
      let newY = newCell[1];

      matrix[newY][newX] = 4;
      matrix[this.y][this.x] = 0;

      this.x = newX;
      this.y = newY;

      this.energy--;

      if (this.energy < 0) {
        this.die();
      }
    }
  }

  die() {
    matrix[this.y][this.x] = 0;

    for (let i in predatorArr) {
      if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
        predatorArr.splice(i, 1);
      }
    }
  }
}
