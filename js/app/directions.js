// define(['./vector'], function(Vector){
  var Vector = require('./vector');
  var  directions = {
    "n": new Vector( 0, 1),
    "ne": new Vector( 1, -1),
    "e": new Vector( 1,  0),
    "se": new Vector( 1,  1),
    "s": new Vector( 0, -1),
    "sw": new Vector(-1,  1),
    "w": new Vector(-1,  0),
    "nw": new Vector(-1, -1)
  };

  // return directions;
  module.exports = directions;
  // module.directions = directions;
// });