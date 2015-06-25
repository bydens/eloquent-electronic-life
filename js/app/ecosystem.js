define([], function(){
  // if(!moduleEcosystem) {
    var moduleEcosystem = (function(){
      function Wall() {}

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
            return {type: "eat", direction: moduleWorld.randomElement(plants)};
          if (context.look(this.direction) != " " && space)
            this.direction = space;
          return {type: "move", direction: this.direction};
        }
      };

      function Predator() {
        this.energy = 100;
        this.direction = "w";
      }
      Predator.prototype = {
        act: function(context) {
          var prey = context.findAll("O");
          if (prey.length) {
            return {type: "eat", direction: moduleWorld.randomElement(prey)};
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
      return{
        Wall: Wall,
        Plant: Plant,
        SmartPlantEater: SmartPlantEater,
        Predator: Predator,
      };
    })();
    return moduleEcosystem;
  // }
});