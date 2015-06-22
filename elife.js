//-----------------------module grid----------------------------
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

  var  directions = {
    "n":  new Vector( 0, 1),
    "ne": new Vector( 1, -1),
    "e":  new Vector( 1,  0),
    "se": new Vector( 1,  1),
    "s":  new Vector( 0, -1),
    "sw": new Vector(-1,  1),
    "w":  new Vector(-1,  0),
    "nw": new Vector(-1, -1)
  };

  return {
    Vector: Vector,
    Grid: Grid,
    directions : directions,
  };
})();


//--------------------module World----------------------------
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

/////////////////NAMESPACE/////////////////////////////////////////////////S
//---------------SIMPLE_ECOSYSTEM------------------------
var SIMPLE_ECOSYSTEM = {};

//add Wall in SIMPLE_ECOSYSTEM
SIMPLE_ECOSYSTEM.Wall = function() {};

//add 'BouncingCritter' in namespase 'SIMPLE_ECOSYSTEM'?????????
SIMPLE_ECOSYSTEM.BouncingCritter = function () {
  var directionNames = "n ne e se s sw w nw".split(" ");
  this.direction = WORLD.randomElement(directionNames);
};
SIMPLE_ECOSYSTEM.BouncingCritter.prototype.act = function(view) {
  if (view.look(this.direction) != " ")
    this.direction = view.find(" ") || "s";
  return {type: "move", direction: this.direction};
};

// ---------------------namespace ACTION -------------------------------
var ACTION = {};
ACTION.actionTypes = Object.create(null);

ACTION.actionTypes.grow = function(critter) {
  critter.energy += 0.5;
  return true;
};

//Moving
ACTION.actionTypes.move = function(critter, vector, action) {
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

//critters can eat..
ACTION.actionTypes.eat = function(critter, vector, action) {
  var dest = this.checkDestination(action, vector);
  var atDest = dest !== null && this.grid.get(dest);
  if (!atDest || atDest.energy === null)
    return false;
  critter.energy += atDest.energy;
  this.grid.set(dest, null);
  return true;
};

//we allow our critters to reproduce
ACTION.actionTypes.reproduce = function(critter, vector, action) {
  var baby = moduleWorld.elementFromChar(this.legend,
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

//----------------namespace ECOSYSTEM------------------------------------
var ECOSYSTEM = {};

//Wall
ECOSYSTEM.Wall = function(){};

// Palnt
ECOSYSTEM.Plant = function() {
  this.energy = 3 + Math.random() * 4;
};
ECOSYSTEM.Plant.prototype.act = function(context) {
  if (this.energy > 15) {
    var space = context.find(" ");
    if (space)
      return {type: "reproduce", direction: space};
  }
  if (this.energy < 20)
    return {type: "grow"};
};

//SmartPlantEater
ECOSYSTEM.SmartPlantEater = function() {
  this.energy = 30;
  this.direction = "e";
};
ECOSYSTEM.SmartPlantEater.prototype.act = function(context) {
  var space = context.find(" ");
  if (this.energy > 70 && space)
    return {type: "reproduce", direction: space};
  var plants = context.findAll("*");
  if (plants.length > 1)
    return {type: "eat", direction: moduleWorld.randomElement(plants)};
  if (context.look(this.direction) != " " && space)
    this.direction = space;
  return {type: "move", direction: this.direction};
};

//Predator
ECOSYSTEM.Predator = function() {
  this.energy = 100;
  this.direction = "w";

};
ECOSYSTEM.Predator.prototype.act = function(context) {
  var prey = context.findAll("O");
  if (prey.length) {
    return {type: "eat", direction: WORLD.randomElement(prey)};
  }

  var space = context.find(" ") || context.find("*");
  if (this.energy > 700 && space) {
    return {type: "reproduce", direction: space};
  }
  if (space) {
    this.direction = space;
  }
  return {type: "move", direction: this.direction};
};

//--------------------A more lifelike simulation--------------------------
function LifelikeWorld(map, legend) {
  moduleWorld.World.call(this, map, legend);
}

LifelikeWorld.prototype = Object.create(moduleWorld.World.prototype);

LifelikeWorld.prototype.letAct = function(critter, vector) {
  var action = critter.act(new moduleWorld.View(this, vector));
  var handled = action &&
    action.type in ACTION.actionTypes &&
    ACTION.actionTypes[action.type].call(this, critter, vector, action);
  if (!handled) {
    critter.energy -= 0.2;
    if (critter.energy <= 0)
      this.grid.set(vector, null);
  }
};

//-----------------Add more plants and spices--------------
var valley = new LifelikeWorld(
  ["####################################################",
   "#                 ####         ****              ###",
   "#   *  $  ##                 ########       OO    ##",
   "#   *    ##        O O          ###    ****       *#",
   "#       ##*                        **#   ####     *#",
   "#      ##***  *         ****                     **#",
   "#* **  #  *  ***      ###                 ****** **#",
   "#* **  #      * *              #  *              **#",
   "#     ##              #   O   #  ***          ######",
   "#*            $              #   **        O  #    #",
   "#*                    #     #    *****          ** #",
   "###          ****          ***                  ** #",
   "#       O                        $         O       #",
   "#   *     ##  ##  ##  ##               ###      *  #",
   "#   **         #              *     *****##  O     #",
   "##  **  O   O     #    ***  ***        ###      ** #",
   "###               #   *****                    ****#",
   "####################################################"],
  {"#": ECOSYSTEM.Wall,
   "$": ECOSYSTEM.Predator,
   "O": ECOSYSTEM.SmartPlantEater,
   "*": ECOSYSTEM.Plant}
);