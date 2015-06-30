//-----------------Add more plants and spices--------------
// define(function(require){
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
   // return valley;
   module.exports = valley.toString();
   // console.log(valley.toString());
// });