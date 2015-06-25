require.config({
  baseUrl: "js/app"
});

// require([
//   "grid", 
//   "world", 
//   "action", 
//   "ecosystem", 
//   "lifelikeWorld", 
//   "elife", 
//   "animateworld"
// ], 
//  function(Grid, 
//           World, 
//           Action, 
//           Ecosystem, 
//           LifelikeWorld, 
//           Elife, 
//           Animateworld
//           ) {
//   // console.log(Elife);
//   // new Animateworld.Animated(Elife);
//   // console.log(Animateworld(Elife));
//   // Animateworld.Animated.start(Elife);
//   // var animateWorld = 'test';
//   // return animateWorld;
// });

require([
  // "elife"
  "animateworld" 
], 
 function(Animated) {
  // console.log(Elife);
  // new Animateworld.Animated(Elife);
  // console.log(Animateworld(Elife));
  // Animateworld.Animated.start(Elife);
  // var animateWorld = 'test';
  // return animateWorld;
});