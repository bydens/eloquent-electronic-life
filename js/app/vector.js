// define([], function(){
  function Vector(x, y) {
    this.x = x;
    this.y = y;
  }
  Vector.prototype.plus = function(other) {
    return new Vector(this.x + other.x, this.y + other.y);
  };
  // module.Vector = Vector;
  module.exports = Vector;
  // return Vector;
// });
