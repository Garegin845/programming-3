let LivingCreature = require('./livingCreature')

module.exports = class Superdog extends LivingCreature {
  constructor(x, y) {
   super(x,y)
   this.energy = 5;
    this.directions = [];
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

  chooseCell(char4) {
    this.getNewCoordinates();
    return super.chooseCell(char4);
}


  mul() {
    let emptyCells = this.chooseCells(0);
    let newCells = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    if (newCells) {
      let newX = newCells[0];
      let newY = newCells[1];

      matrix[newY][newX] = 5;

      let Superd = new Superdog(newX, newY);

      superdogArr.push(Superd);
    }
  }

  eat() {
    let emptyCells = this.chooseCells(4);
    let newCells = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    if (newCells) {
      this.energy += 5;
      let newX = newCells[0];
      let newY = newCells[1];

      for (let i in PredatorArr) {
        if (newX == PredatorArr[i].x && newY == PredatorArr[i].y) {
          PredatorArr.splice(i, 1);
        }
      }

      matrix[newY][newX] = 5;
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
    let emptyCells = this.chooseCells(0, 1);
    let newCells = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    if (newCells) {
      let newX = newCells[0];
      let newY = newCells[1];

      matrix[newY][newX] = 5;
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

    for (let i in SuperdogArr) {
      if (this.x == SuperdogArr[i].x && this.y == SuperdogArr[i].y) {
        SuperdogArr.splice(i, 1);
      }
    }
  }
}
