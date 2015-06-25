define(['../helper/randomElement'], function(randomElement){
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

  // module.SmartPlantEater = SmartPlantEater;
  return SmartPlantEater;
});