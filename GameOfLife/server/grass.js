let LivingCreature = require('./LivingCreature')
module.exports = class Grass extends LivingCreature{
 
  

  mul() {
    this.multiply++;
    let emptyCells = this.chooseCell(0);
    let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

    if (newCell && this.multiply >= 5) {
      let newX = newCell[0];
      let newY = newCell[1];

      matrix[newY][newX] = 1;

      let grass = new Grass(newX, newY);
      grassArr.push(grass);

      this.multiply = 0;
    }
  }
}
