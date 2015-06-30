// define([], function(){
  function randomElement(array) {
     return array[Math.floor(Math.random() * array.length)];
  }
  // module.randomElement = randomElement;
  module.exports = randomElement;
  // return randomElement;
// });