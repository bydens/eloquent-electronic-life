//--------------------module World----------------------------
if (!moduleWorld) {
  var moduleWorld = (function(){
    function randomElement(array) {
       return array[Math.floor(Math.random() * array.length)];
    }

    function elementFromChar(legend, ch) {
      if (ch == " ")
        return null;
      var element = new legend[ch]();
      element.originChar = ch;
      return element;
    }

    function World(map, legend) {
      var grid = new gridModule.Grid(map[0].length, map.length);
      this.grid = grid;
      this.legend = legend;

      map.forEach(function(line, y) {
        for (var x = 0; x < line.length; x++)
          grid.set(new gridModule.Vector(x, y),
                   elementFromChar(legend, line[x]));
      });
    }

    function charFromElement(element) {
      if (element === null)
        return " ";
      else
        return element.originChar;
    }

    World.prototype = {
      toString: function() {
        var output = "";
        for (var y = 0; y < this.grid.height; y++) {
          for (var x = 0; x < this.grid.width; x++) {
            var element = this.grid.get(new gridModule.Vector(x, y));
            output += charFromElement(element);
          }
          output += "\n";
        }
        return output;
      },
      turn: function() {
        var acted = [];
        this.grid.forEach(function(critter, vector) {
          if (critter.act && acted.indexOf(critter) == -1) {
            acted.push(critter);
            this.letAct(critter, vector);
          }
        }, this);
      },
      letAct: function(critter, vector) {
        var action = critter.act(new View(this, vector));
        if (action && action.type == "move") {
          var dest = this.checkDestination(action, vector);
          if (dest && this.grid.get(dest) === null) {
            this.grid.set(vector, null);
            this.grid.set(dest, critter);
          }
        }
      },
      checkDestination: function(action, vector) {
        if (gridModule.directions.hasOwnProperty(action.direction)) {
          var dest = vector.plus(gridModule.directions[action.direction]);
          if (this.grid.isInside(dest))
            return dest;
        }
      },
    };

    function View(world, vector){
      this.world = world;
      this.vector = vector;
    }
    View.prototype = {
      look: function(dir) {
        var target = this.vector.plus(gridModule.directions[dir]);
        if (this.world.grid.isInside(target))
          return charFromElement(this.world.grid.get(target));
        else
          return "#";
      },
      findAll : function(ch) {
        var found = [];
        for (var dir in gridModule.directions)
          if (this.look(dir) == ch)
            found.push(dir);
        return found;
      },
      find : function(ch) {
        var found = this.findAll(ch);
        if (found.length === 0) return null;
        return randomElement(found);
      }
    };

    return {
      World: World,
      View: View,
      elementFromChar: elementFromChar,
      randomElement: randomElement
    };
  })();
}