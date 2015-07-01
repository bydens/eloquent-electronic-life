/**
 * @license eLife 1.0 Copyright (c) 2015, Denys Bykanov All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/bydens/eloquent-electronic-life for details
 */
 
function charFromElement(element) {
  if (element === null)
    return " ";
  else
    return element.originChar;
}

module.exports = charFromElement;