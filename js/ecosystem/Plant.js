/**
 * @license eLife 1.0 Copyright (c) 2015, Denys Bykanov All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/bydens/eloquent-electronic-life for details
 */

function Plant() {
  this.energy = 3 + Math.random() * 4;
}
Plant.prototype = {
  act: function(context) {
    if (this.energy > 15) {
      var space = context.find(" ");
      if (space)
        return {type: "reproduce", direction: space};
    }
    if (this.energy < 20)
      return {type: "grow"};
  }
};

module.exports = Plant;