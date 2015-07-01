var Elife = require('./app/map');

setInterval(function() {
  Elife.turn();
  console.log(Elife.toString());
}, 333);
