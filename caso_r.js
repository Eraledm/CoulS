// function caso(){
//   WidthInPixels =  200*1E14;
//   VELOCIDAD = 1E-38;
//   LIMITE_R = 1E-15;
//   for(var i = 0; i < patriclesNum; i++){
//     particles.push(new Factory(
//       coord_x_0 + (Math.pow(-1,  Math.round( Math.random() * 2)) * Math.random()) * 1E-14 * WidthInPixels,
//       coord_y_0 + (Math.pow(-1,  Math.round( Math.random() * 2)) * Math.random()) * 1E-14 * WidthInPixels,
//       Math.pow(-1,  Math.round( Math.random() * 2)) * 1E-6)
//     );
// }}
function caso(){
  WidthInPixels =  200*1E14;
  VELOCIDAD = 1E-38;
  LIMITE_R = 1E-15;
  for(var i = 0; i < patriclesNum; i++){
    particles.push(new Factory(
      coord_x_0 + (Math.pow(-1,  Math.round( Math.random() * 2)) * Math.random()) * 1E-14 * WidthInPixels,
      coord_y_0 + (Math.pow(-1,  Math.round( Math.random() * 2)) * Math.random()) * 1E-14 * WidthInPixels,
      1E-6)
    );
  }
  for(var i = 0; i < 1; i++){
      particles.push(new Factory(
        coord_x_0 ,
        coord_y_0 ,
        -1E-6)
      );
  }
  particlesNum = particles.lenght;
}
