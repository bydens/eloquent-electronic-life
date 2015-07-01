/**
 * @license eLife 1.0 Copyright (c) 2015, Denys Bykanov All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/bydens/eloquent-electronic-life for details
 */

define(function(require){
  'use strict';

  var randomElement = require('../helper/randomElement');
  
  function Predator() {
    this.energy = 100;
    this.direction = "w";
  }
  Predator.prototype = {
    act: function(context) {
      var prey = context.findAll("O");
      if (prey.length) {
        return {type: "eat", direction: randomElement(prey)};
      }

      var space = context.find(" ") || context.find("*");
      if (this.energy > 700 && space) {
        return {type: "reproduce", direction: space};
      }
      if (space) {
        this.direction = space;
      }
      return {type: "move", direction: this.direction};
    }
  };

  return Predator;
});