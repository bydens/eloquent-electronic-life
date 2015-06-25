require.config({
  baseUrl: "js"
});

require([
  "app/animateworld"
], 
 function(Animateworld) {
  // console.log(Animateworld);
});

// requirejs(['elife'], function(Elife){
//   Elife.animateWorld(Elife.valley);
// });