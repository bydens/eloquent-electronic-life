//-----------------Add more plants and spices--------------
define(
   [
      './lifelikeWorld', 
      '../ecosystem/wall',
      '../ecosystem/predator',
      '../ecosystem/smartPlantEater',
      '../ecosystem/plant'
   ], 
   function(
      LifelikeWorl, 
      Wall,
      Predator,
      SmartPlantEater,
      Plant
   ){
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
   return valley;
});