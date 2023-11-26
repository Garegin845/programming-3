let LivingCreature = require('./livingCreature')
module.exports = class Superdog extends LivingCreature{
  constructor(x, y) {
    super(x,y)
    this.energy = 10;
    
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

  chooseCell(char,char1,char2) {
    this.getNewCoordinates();
    return super.chooseCell(char,char1,char2)
  }
  mul() {
    let emptyCell = this.chooseCell(0);
    let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];

    if (newCell) {
      let newX = newCell[0];
      let newY = newCell[1];

      matrix[newY][newX] = 3;

      let superdog = new Superdog(newX, newY);

     superdogArr.push(superdog);
    }
  }

  eat() {
    let emptyCell = this.chooseCell(4);
    let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];

    if (newCell) {
      this.energy += 5;
      let newX = newCell[0];
      let newY = newCell[1];

      for (let i in predatorArr) {
        if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
          predatorArr.splice(i, 1);
        }
      }

      matrix[newY][newX] = 3;
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
    let emptyCell = this.chooseCell(0, 1);
    let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];

    if (newCell) {
      let newX = newCell[0];
      let newY = newCell[1];

      matrix[newY][newX] = 3;
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

    for (let i in superdogArr) {
      if (this.x == superdogArr[i].x && this.y == superdogArr[i].y) {
        superdogArr.splice(i, 1);
      }
    }
  }
}
