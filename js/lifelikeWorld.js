if (!moduleLifelikeWorld) {
  var moduleLifelikeWorld = (function(){
    function LifelikeWorld(map, legend) {
      moduleWorld.World.call(this, map, legend);
    }
    LifelikeWorld.prototype = Object.create(moduleWorld.World.prototype);

    LifelikeWorld.prototype.letAct = function(critter, vector) {
      var action = critter.act(new moduleWorld.View(this, vector));
      var handled = action &&
        action.type in moduleAction &&
        moduleAction[action.type].call(this, critter, vector, action);
      if (!handled) {
        critter.energy -= 0.2;
        if (critter.energy <= 0)
          this.grid.set(vector, null);
      }
    };

    return {LifelikeWorld: LifelikeWorld};
  })();
}