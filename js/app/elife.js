//-----------------Add more plants and spices--------------
define([
      "./lifelikeWorld", 
      "./ecosystem"
   ], 
   function(
      moduleLifelikeWorld, 
      moduleEcosystem
   ){
   // if (!valley) {
      var valley = new moduleLifelikeWorld.LifelikeWorld(
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
        {"#": moduleEcosystem.Wall,
         "$": moduleEcosystem.Predator,
         "O": moduleEcosystem.SmartPlantEater,
         "*": moduleEcosystem.Plant}
      );
   // }
   return valley;
});