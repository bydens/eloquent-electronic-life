define(['./directions', '../helper/charFromElement', '../helper/randomElement'], function(directions, charFromElement, randomElement){
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

  return View;
  // module.View = View;
});