//-----------------Add more plants and spices--------------
// define(function(require){
   var LifelikeWorl = require('./lifelikeWorld'), 
       Wall = require('../ecosystem/wall'),
       Predator = require('../ecosystem/predator'),
       SmartPlantEater = require('../ecosystem/smartPlantEater'),
       Plant = require('../ecosystem/plant');
// console.log(LifelikeWorl);
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
   // return valley;
   // console.log(Wall);
   module.exports = valley;
   // module.exports = valley.toString();
   // console.log(valley.toString());
// });