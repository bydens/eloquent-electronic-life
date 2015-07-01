/**
 * @license eLife 1.0 Copyright (c) 2015, Denys Bykanov All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/bydens/eloquent-electronic-life for details
 */

define(function(require) {
  "use strict";
  
  var elementFromChar = require('../helper/elementFromChar');
  var actionTypes = Object.create(null);

  actionTypes.grow = function(critter) {
    critter.energy += 0.5;
    return true;
  };

  actionTypes.move = function(critter, vector, action) {
    var dest = this.checkDestination(action, vector);
    if (dest === null ||
        critter.energy <= 1 ||
        this.grid.get(dest) !== null)
      return false;
    critter.energy -= 1;
    this.grid.set(vector, null);
    this.grid.set(dest, critter);
    return true;
  };

  actionTypes.eat = function(critter, vector, action) {
    var dest = this.checkDestination(action, vector);
    var atDest = dest !== null && this.grid.get(dest);
    if (!atDest || atDest.energy === null)
      return false;
    critter.energy += atDest.energy;
    this.grid.set(dest, null);
    return true;
  };

  actionTypes.reproduce = function(critter, vector, action) {
    var baby = elementFromChar(this.legend,
                               critter.originChar);
    var dest = this.checkDestination(action, vector);
    if (dest === null ||
        critter.energy <= 2 * baby.energy ||
        this.grid.get(dest) !== null)
      return false;
    critter.energy -= 2 * baby.energy;
    this.grid.set(dest, baby);
    return true;
  };

  return actionTypes;
});