/**
 * @license eLife 1.0 Copyright (c) 2015, Denys Bykanov All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/bydens/eloquent-electronic-life for details
 */

var LifelikeWorl = require('./LifelikeWorld'), 
    Wall = require('../ecosystem/Wall'),
    Predator = require('../ecosystem/Predator'),
    SmartPlantEater = require('../ecosystem/SmartPlantEater'),
    Plant = require('../ecosystem/Plant'),
    map = require('./map');

module.exports = new LifelikeWorl(map,
                               {"#": Wall,
                                "$": Predator,
                                "O": SmartPlantEater,
                                "*": Plant}
                              );