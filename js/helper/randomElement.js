(function(module){
  function randomElement(array) {
     return array[Math.floor(Math.random() * array.length)];
  }
  module.randomElement = randomElement;
})(Elife)