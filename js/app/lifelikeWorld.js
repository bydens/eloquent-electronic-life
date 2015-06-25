(function(module){
  function LifelikeWorld(map, legend) {
    module.World.call(this, map, legend);
  }

  LifelikeWorld.prototype = Object.create(module.World.prototype);

  LifelikeWorld.prototype.letAct = function(critter, vector) {
    var action = critter.act(new module.View(this, vector));
    var handled = action &&
      action.type in module.Action &&
      module.Action[action.type].call(this, critter, vector, action);
    if (!handled) {
      critter.energy -= 0.2;
      if (critter.energy <= 0)
        this.grid.set(vector, null);
    }
  };

  module.LifelikeWorl = LifelikeWorld;
})(Elife);