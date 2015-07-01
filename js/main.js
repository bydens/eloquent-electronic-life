(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Denys Bykanov All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/bydens/eloquent-electronic-life for details
 */

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

module.exports = actionTypes;
},{"../helper/elementFromChar":16}],2:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Denys Bykanov All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/bydens/eloquent-electronic-life for details
 */

var world = require('./valley');
var active = null;

function Animated(world) {
  this.world = world;
  var outer = (window.__sandbox ? window.__sandbox.output.div : document.body), doc = outer.ownerDocument;
  var node = outer.appendChild(doc.createElement("div"));
  node.style.cssText = "position: relative; width: intrinsic; width: fit-content;";
  this.pre = node.appendChild(doc.createElement("pre"));
  this.pre.appendChild(doc.createTextNode(world.toString()));
  this.button = node.appendChild(doc.createElement("div"));
  this.button.style.cssText = "position: absolute; bottom: 8px; right: -4.5em; color: white; font-family: tahoma, arial; " +
    "background: #4ab; cursor: pointer; border-radius: 18px; font-size: 70%; width: 3.5em; text-align: center;";
  this.button.innerHTML = "stop";
  var self = this;
  this.button.addEventListener("click", function() { self.clicked(); });
  this.disabled = false;
  if (active) active.disable();
  active = this;
  this.interval = setInterval(function() { self.tick(); }, 333);
}

Animated.prototype.clicked = function() {
  if (this.disabled) return;
  if (this.interval) {
    clearInterval(this.interval);
    this.interval = null;
    this.button.innerHTML = "start";
  } else {
    var self = this;
    this.interval = setInterval(function() { self.tick(); }, 333);
    this.button.innerHTML = "stop";
  }
};

Animated.prototype.tick = function() {
  this.world.turn();
  this.pre.removeChild(this.pre.firstChild);
  this.pre.appendChild(this.pre.ownerDocument.createTextNode(this.world.toString()));
};

Animated.prototype.disable = function() {
  this.disabled = true;
  clearInterval(this.interval);
  this.button.innerHTML = "Disabled";
  this.button.style.color = "red";
};

window.animateWorld =  function() { new Animated(world); };
},{"./valley":7}],3:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Denys Bykanov All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/bydens/eloquent-electronic-life for details
 */

var Vector = require('./vector');

module.exports = {
  "n":  new Vector( 0, 1),
  "ne": new Vector( 1, -1),
  "e":  new Vector( 1,  0),
  "se": new Vector( 1,  1),
  "s":  new Vector( 0, -1),
  "sw": new Vector(-1,  1),
  "w":  new Vector(-1,  0),
  "nw": new Vector(-1, -1)
};
},{"./vector":8}],4:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Denys Bykanov All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/bydens/eloquent-electronic-life for details
 */

var Vector = require('./vector');

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

module.exports = Grid;
},{"./vector":8}],5:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Denys Bykanov All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/bydens/eloquent-electronic-life for details
 */

var World = require('./world'), 
    View = require('./view'), 
    Action = require('./action');

function LifelikeWorld(map, legend) {
  World.call(this, map, legend);
}

LifelikeWorld.prototype = Object.create(World.prototype);

LifelikeWorld.prototype.letAct = function(critter, vector) {
  var action = critter.act(new View(this, vector));
  var handled = action &&
    action.type in Action &&
    Action[action.type].call(this, critter, vector, action);
  if (!handled) {
    critter.energy -= 0.2;
    if (critter.energy <= 0)
      this.grid.set(vector, null);
  }
};

module.exports = LifelikeWorld;
},{"./action":1,"./view":9,"./world":10}],6:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Denys Bykanov All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/bydens/eloquent-electronic-life for details
 */
 
module.exports = ["####################################################",
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
                  "####################################################"];
},{}],7:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Denys Bykanov All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/bydens/eloquent-electronic-life for details
 */

var LifelikeWorl = require('./lifelikeWorld'), 
    Wall = require('../ecosystem/wall'),
    Predator = require('../ecosystem/predator'),
    SmartPlantEater = require('../ecosystem/smartPlantEater'),
    Plant = require('../ecosystem/plant'),
    map = require('./map');

module.exports = new LifelikeWorl(map,
                               {"#": Wall,
                                "$": Predator,
                                "O": SmartPlantEater,
                                "*": Plant}
                              );
},{"../ecosystem/plant":11,"../ecosystem/predator":12,"../ecosystem/smartPlantEater":13,"../ecosystem/wall":14,"./lifelikeWorld":5,"./map":6}],8:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Denys Bykanov All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/bydens/eloquent-electronic-life for details
 */

function Vector(x, y) {
  this.x = x;
  this.y = y;
}
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};

module.exports = Vector;
},{}],9:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Denys Bykanov All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/bydens/eloquent-electronic-life for details
 */

var directions = require('./directions'), 
    charFromElement = require('../helper/charFromElement'), 
    randomElement = require('../helper/randomElement');

function View(world, vector){
  this.world = world;
  this.vector = vector;
}
View.prototype = {
  look: function(dir) {
    var target = this.vector.plus(directions[dir]);
    if (this.world.grid.isInside(target))
      return charFromElement(this.world.grid.get(target));
    else
      return "#";
  },
  findAll : function(ch) {
    var found = [];
    for (var dir in directions)
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

module.exports = View;
},{"../helper/charFromElement":15,"../helper/randomElement":17,"./directions":3}],10:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Denys Bykanov All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/bydens/eloquent-electronic-life for details
 */

var Grid = require('./grid'), 
    Vector = require('./vector'), 
    elementFromChar = require('../helper/elementFromChar'), 
    charFromElement = require('../helper/charFromElement'),
    directions = require('./directions');

function World(map, legend) {
  var grid = new Grid(map[0].length, map.length);
  this.grid = grid;
  this.legend = legend;

  map.forEach(function(line, y) {
    for (var x = 0; x < line.length; x++)
      grid.set(new Vector(x, y),
               elementFromChar(legend, line[x]));
  });
}
World.prototype = {
  toString: function() {
    var output = "";
    for (var y = 0; y < this.grid.height; y++) {
      for (var x = 0; x < this.grid.width; x++) {
        var element = this.grid.get(new Vector(x, y));
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
    if (directions.hasOwnProperty(action.direction)) {
      var dest = vector.plus(directions[action.direction]);
      if (this.grid.isInside(dest))
        return dest;
    }
  },
};

module.exports = World;
},{"../helper/charFromElement":15,"../helper/elementFromChar":16,"./directions":3,"./grid":4,"./vector":8}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Denys Bykanov All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/bydens/eloquent-electronic-life for details
 */

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

module.exports = Predator;
},{"../helper/randomElement":17}],13:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Denys Bykanov All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/bydens/eloquent-electronic-life for details
 */

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

module.exports = SmartPlantEater;
},{"../helper/randomElement":17}],14:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Denys Bykanov All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/bydens/eloquent-electronic-life for details
 */

  function Wall() {}
  
  module.exports = Wall;
},{}],15:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Denys Bykanov All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/bydens/eloquent-electronic-life for details
 */
 
function charFromElement(element) {
  if (element === null)
    return " ";
  else
    return element.originChar;
}

module.exports = charFromElement;
},{}],16:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Denys Bykanov All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/bydens/eloquent-electronic-life for details
 */

function elementFromChar(legend, ch) {
  if (ch == " ")
    return null;
  var element = new legend[ch]();
  element.originChar = ch;
  return element;
}

module.exports = elementFromChar;
},{}],17:[function(require,module,exports){
/**
 * @license eLife 1.0 Copyright (c) 2015, Denys Bykanov All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/bydens/eloquent-electronic-life for details
 */

function randomElement(array) {
   return array[Math.floor(Math.random() * array.length)];
}

module.exports = randomElement;
},{}]},{},[2]);
