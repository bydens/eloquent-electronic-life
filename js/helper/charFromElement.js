define([], function(){
  function charFromElement(element) {
    if (element === null)
      return " ";
    else
      return element.originChar;
  }

  return charFromElement;
  // module.charFromElement = charFromElement;
});