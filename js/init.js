require.config({
  baseUrl: "js/app"
});

require([
  "grid", 
  "world", 
  "action", 
  "ecosystem", 
  "lifelikeWorld", 
  "elife", 
  "animateworld"
], 
 function(Grid, World, Action, Ecosystem, LifelikeWorld, Elife, Animateworld) {
  console.log(Animateworld);
  // Animateworld.Animated.start(Elife);
  // console.log(Elife);
  // var animateWorld = 'test';
  // return animateWorld;
});