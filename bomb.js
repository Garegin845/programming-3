let LivingCreature = require('./livingCreature')

module.exports = class Bomb extends LivingCreature {
	constructor(x, y) {
		super(x, y);
		this.energy = 6
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
}

	
			



