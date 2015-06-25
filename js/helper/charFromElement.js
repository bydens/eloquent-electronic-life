(function(module){
  function charFromElement(element) {
    if (element === null)
      return " ";
    else
      return element.originChar;
  }

  module.charFromElement = charFromElement;
})(Elife);