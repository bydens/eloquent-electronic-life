(function(module){
  function elementFromChar(legend, ch) {
    if (ch == " ")
      return null;
    var element = new legend[ch]();
    element.originChar = ch;
    return element;
  }

  module.elementFromChar = elementFromChar;
  
})(Elife);