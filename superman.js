let LivingCreature = require('./livingCreature')
module.exports =class Superman extends LivingCreature {
  constructor(x, y) {
    super(x,y)
    this.energy = 10
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

  demine() {
    let emptyCell = this.chooseCell(5);
    let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];

    if (newCell) {
      this.energy += 7;
      let newX = newCell[0];
      let newY = newCell[1];

      for (let i in supermanArr) {
        if (newX == supermanArr[i].x && newY == supermanArr[i].y) {
          supermanArr.splice(i, 1);
        }
      }

      matrix[newY][newX] = 6;
      matrix[this.y][this.x] = 0;

      this.x = newX;
      this.y = newY;
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

      matrix[newY][newX] = 6;
      matrix[this.y][this.x] = 0;

      this.x = newX;
      this.y = newY;

      if (bombArr.length == 0) {
        this.die();
      }
    }
  }

  die() {
    matrix[this.y][this.x] = 0;

    for (let i in superdogArr) {
      if (this.x == superdogArr[i].x && this.y == superdogArr[i].y) {
        superdogArr.splice(i, 4);
      }
    }
  }
}
