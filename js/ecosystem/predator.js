// define(['../helper/randomElement'], function(randomElement){
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

  // module.Predator = Predator;
  // setInterval(function() { console.log(new Predator().act()); }, 1000);
  // setInterval(function() { console.log(new Predator().direction); }, 1000);
  module.exports = Predator;
  // return Predator;
// });