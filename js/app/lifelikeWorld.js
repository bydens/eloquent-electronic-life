define(['./world', './view', './action'], function(World, View, Action){
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

  // module.LifelikeWorl = LifelikeWorld;
  return LifelikeWorld;
});