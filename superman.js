let LivingCreature = require('./livingCreature')

module.exports = class Superman extends LivingCreature {
	constructor(x, y) {
		super(x,y)
		this.energy = 4;
		this.direction = []

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
	demine() {
		let emptyCell = this.chooseCell(5);
		let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
	
		if (newCell) {
		  this.energy += 7;
		  let newX = newCell[0];
		  let newY = newCell[1];
	
		  for (let i in SupermanArr) {
			if (newX == SupermanArr[i].x && newY == SupermanArr[i].y) {
			  SupermanArr.splice(i, 1);
			}
		  }
	
		  matrix[newY][newX] = 4;
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
	
		  matrix[newY][newX] = 4;
		  matrix[this.y][this.x] = 0;
	
		  this.x = newX;
		  this.y = newY;
	

		  }
		}
	  }
	
