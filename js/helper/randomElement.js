/**
 * @license eLife 1.0 Copyright (c) 2015, Denys Bykanov All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/bydens/eloquent-electronic-life for details
 */

function randomElement(array) {
   return array[Math.floor(Math.random() * array.length)];
}

module.exports = randomElement;