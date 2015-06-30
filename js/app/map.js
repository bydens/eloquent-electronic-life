//-----------------Add more plants and spices--------------
// define(
//    [
//       './lifelikeWorld', 
//       '../ecosystem/wall',
//       '../ecosystem/predator',
//       '../ecosystem/smartPlantEater',
//       '../ecosystem/plant'
//    ], 
//    function(
//       LifelikeWorl, 
//       Wall,
//       Predator,
//       SmartPlantEater,
//       Plant
//    ){

define(function(require){
   var LifelikeWorl = require('./lifelikeWorld'), 
       Wall = require('../ecosystem/wall'),
       Predator = require('../ecosystem/predator'),
       SmartPlantEater = require('../ecosystem/smartPlantEater'),
       Plant = require('../ecosystem/plant');

   var valley = new LifelikeWorl(
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
     {"#": Wall,
      "$": Predator,
      "O": SmartPlantEater,
      "*": Plant}
   );
   // module.valley = valley;
   // module.valley;
   return valley;
});