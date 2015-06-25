//-----------------------module grid----------------------------
// define(["./vector"], function(Vector){
define([], function(){
  // if (!gridModule) {
    var gridModule = (function(){
      function Vector(x, y) {
        this.x = x;
        this.y = y;
      }
      Vector.prototype.plus = function(other) {
        return new Vector(this.x + other.x, this.y + other.y);
      };

      function Grid(width, height) {
        this.space = new Array(width * height);
        this.width = width;
        this.height = height;
      }

      Grid.prototype = {
        isInside : function(vector) {
          return vector.x >= 0 && vector.x < this.width &&
           vector.y >= 0 && vector.y < this.height;
        },
        get : function(vector) {
          return this.space[vector.x + this.width * vector.y];
        },
        set : function(vector, value) {
          this.space[vector.x + this.width * vector.y] = value;
        },
        forEach : function(f, context) {
          for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
              var value = this.space[x + y * this.width];
              if (value !== null)
              f.call(context, value, new Vector(x, y));
            }
          }
        },
      };
// console.log(Vector);
      var  directions = {
        "n":  Vector( 0, 1),
        "ne": Vector( 1, -1),
        "e":  Vector( 1,  0),
        "se": Vector( 1,  1),
        "s":  Vector( 0, -1),
        "sw": Vector(-1,  1),
        "w":  Vector(-1,  0),
        "nw": Vector(-1, -1)
      };

      return {
        Vector: Vector,
        Grid: Grid,
        directions : directions,
      };
    })();
  // }
  // return new gridModule.Grid();
  return gridModule;
});