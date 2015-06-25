define([], function(){
  function randomElement(array) {
     return array[Math.floor(Math.random() * array.length)];
  }
  // module.randomElement = randomElement;
  return randomElement;
});