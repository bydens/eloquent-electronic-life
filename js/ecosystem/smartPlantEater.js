/**
 * @license eLife 1.0 Copyright (c) 2015, Denys Bykanov All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/bydens/eloquent-electronic-life for details
 */

define(function(require){
  'use strict';

  var randomElement = require('../helper/randomElement');
  
  function SmartPlantEater() {
    this.energy = 30;
    this.direction = "e";
  }
  SmartPlantEater.prototype ={
    act: function(context) {
      var space = context.find(" ");
      if (this.energy > 70 && space)
        return {type: "reproduce", direction: space};
      var plants = context.findAll("*");
      if (plants.length > 1)
        return {type: "eat", direction: randomElement(plants)};
      if (context.look(this.direction) != " " && space)
        this.direction = space;
      return {type: "move", direction: this.direction};
    }
  };

  return SmartPlantEater;
});