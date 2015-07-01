/**
 * @license eLife 1.0 Copyright (c) 2015, Denys Bykanov All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/bydens/eloquent-electronic-life for details
 */

var LifelikeWorl = require('./lifelikeWorld'), 
    Wall = require('../ecosystem/wall'),
    Predator = require('../ecosystem/predator'),
    SmartPlantEater = require('../ecosystem/smartPlantEater'),
    Plant = require('../ecosystem/plant'),
    map = require('./map');

module.exports = new LifelikeWorl(map,
                               {"#": Wall,
                                "$": Predator,
                                "O": SmartPlantEater,
                                "*": Plant}
                              );