function Factory(x, y, c){
  this.x0 = this.x = x;
  this.y0 = this.y = y;
  this.vx = this.vy = 0;
  this.rad = 3;
  this.c = c;
  this.m = (c>0) ? 1.6E-27 : 9.1E-31;
  // this.rgba = (c>0) ? colors[ Math.round( Math.random() * 1) ] :  colors[ Math.round( Math.random() * 2) +1];
  this.rgba = (c>0) ? colors[ 0 ] :  colors[ 3];
}

function reset(){
  for(var j = 0; j<patriclesNum; j++){
    particles[j].x = particles[j].x0;
    particles[j].y = particles[j].y0;
  }
  time=0;
}

function draw(){
  // document.getElementById("inp_time").value = time / 60 * VELOCIDAD;
  if(should_move)
    time++;
  ctx.clearRect(0, 0, w, h);
  if(GRAPHS){
    ctx.strokeStyle = "#004d40";
    ctx.beginPath();
    ctx.moveTo(coord_x_0, 0);
    ctx.lineTo(coord_x_0, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, coord_y_0);
    ctx.lineTo(canvas.width, coord_y_0);
    ctx.stroke();
  }
  ctx.globalCompositeOperation = 'lighter';
  ctx.font = "20px Georgia";
  ctx.textAlign = "center";
  ctx.fillStyle = colors[2];
  ctx.strokeStyle = colors[3];
  ctx.fillText("CoulS: Simulador de particulas", coord_x_0, 70);
  ctx.font = "15px Georgia";
  ctx.fillText("Tiempo: " + (time/60*VELOCIDAD).toExponential(2) + " s", coord_x_0, 70 + line);
  ctx.fillText( "1 Metro : " + (WidthInPixels).toExponential(2) + " px : ( " + ((WidthInPixels)* 2.54 / 96 * 100).toExponential(2) + " cm o " + ((WidthInPixels)* 2.54 / 96).toExponential(2) + " m) reales " , coord_x_0, 70 + line*2);
  var f_all = {f:0, fx: 0, fy: 0};
  var e_all = {Emag:0, Ex: 0, Ey: 0};
  for(var i = 0;i < patriclesNum; i++){
    var temp = particles[i];
    var f_total = {f:0, fx: 0, fy: 0};
    for(var j = 0; j<patriclesNum; j++){
      var temp2 = particles[j];

      if(GRAPHS){
        ctx.linewidth = 0.5;
        ctx.strokeStyle = "#26a69a";
        ctx.beginPath();
        ctx.moveTo(temp.x, temp.y);
        ctx.lineTo(temp2.x, temp2.y);
        ctx.stroke();
      }

      if(i!=j){
        // SUMANDO FUERZAS
        var r = getRVector((temp2.x-coord_x_0)/WidthInPixels - (temp.x-coord_x_0)/WidthInPixels, (temp2.y-coord_y_0)/WidthInPixels -  (temp.y-coord_y_0)/WidthInPixels);
        var ftemp = findElectricForce(r, temp.c, temp2.c);
        f_total.fx += ftemp.fx;
        f_total.fy += ftemp.fy;
        ctx.fillStyle = temp.rgba;
        ctx.strokeStyle = temp.rgba;
        if(r.r < LIMITE_R){
          console.log("Aquí actuan fuerzas nucleares, i " + i + " j " + j);
          reset();
        }

      }
    }
    f_all.fx += f_total.fx;
    f_all.fy += f_total.fy;
    f_total.f = magnitude(f_total.fx, f_total.fy);
    var e = findElectricField(temp.c, f_total);
    e_all.Ex += e.Ex;
    e_all.Ey += e.Ey;

    var a = getAceleration(f_total, temp.m);
    // console.log(a);
    var posicion = getPosition(a, time/60*VELOCIDAD);
    // console.log(posicion);
    // Imprime particula
    ctx.beginPath();
    ctx.arc(temp.x, temp.y, temp.rad, 0, Math.PI*2, true);
    ctx.fill();
    ctx.closePath();
    // Imprime orilla
    ctx.beginPath();
    ctx.arc(temp.x, temp.y, (temp.rad+5), 0, Math.PI*2, true);
    ctx.stroke();
    ctx.closePath();

    // Cambia Posicion
    // if(should_move){
    temp.vx = posicion.x * WidthInPixels;
    temp.vy = posicion.y * WidthInPixels;
    // }
    // CreatedByEraledm
    // Imprime Texto de la Carga
    if(GRAPHS){
      ctx.font = "12px Georgia";
      ctx.fillText("q" + i, temp.x, temp.y-line);
    }
    // Registra valores
    document.getElementById("f_" + i).innerHTML = "F: " + f_total.f.toExponential(2) + " Fx: " + f_total.fx.toExponential(2) + " Fy: " + f_total.fy.toExponential(2);

    document.getElementById("q_" + i).innerHTML = "Carga: " + temp.c.toExponential(2);
    document.getElementById("p_" + i).innerHTML = "Posición: ( " + ((temp.x-coord_x_0)/WidthInPixels).toExponential(2) + "m , " + ((temp.y-coord_y_0)/WidthInPixels).toExponential(2) +"m )";
    document.getElementById("a_" + i).innerHTML = "Aceleracion: " + a.a.toExponential(2) + " <br>ax: " + a.ax.toExponential(2) + " ay: " + a.ay.toExponential(2);

    if(temp.x >= w || temp.x <= 0 || temp.y >= h || temp.y <= 0) {
      console.log("reseteo");
      reset();
    }
  }

  if(should_move){
    for(var i = 0;i < patriclesNum; i++){
      var temp = particles[i];
      temp.x += temp.vx;
      temp.y += temp.vy;
    }
  }


  f_all.f = magnitude(f_all.fx, f_all.fy);
  // var e_all =
  e_all.Emag = magnitude(e_all.Ex, e_all.Ey);
  document.getElementById("f_total").innerHTML = "Ftotal: " + f_all.f.toExponential(2) + " Fx: " + f_all.fx.toExponential(2) + " Fy: " + f_total.fy.toExponential(2);
  document.getElementById("e_total").innerHTML = "Etotal: " + e_all.Emag.toExponential(2) + " Ex: " + e_all.Ex.toExponential(2) + " Ey: " + e_all.Ey.toExponential(2);

}

function findDistance(p1,p2){
  return Math.sqrt( Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) );
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  function( callback ){
    window.setTimeout(callback, 1000 / 60);
  };
})();

function createElements(){

    for(var i = 0; i < patriclesNum; i++){
      var t = document.createTextNode("Particula " + i);
      var temp_element = document.createElement("p")
      temp_element.appendChild(t);
      document.getElementById("container_forces").appendChild(temp_element);

      temp_element = document.createElement("small")
      temp_element.id="q_" + i;
      document.getElementById("container_forces").appendChild(temp_element);
      document.getElementById("container_forces").appendChild(document.createElement("br"));


      temp_element = document.createElement("small")
      temp_element.id="p_" + i;
      document.getElementById("container_forces").appendChild(temp_element);
      document.getElementById("container_forces").appendChild(document.createElement("br"));


      temp_element = document.createElement("small")
      temp_element.id="f_" + i;
      document.getElementById("container_forces").appendChild(temp_element);
      document.getElementById("container_forces").appendChild(document.createElement("br"));

      temp_element = document.createElement("small")
      temp_element.id="a_" + i;
      document.getElementById("container_forces").appendChild(temp_element);
      document.getElementById("container_forces").appendChild(document.createElement("br"));

      temp_element = document.createElement("small")
      temp_element.id="e_" + i;
      document.getElementById("container_forces").appendChild(temp_element);
      document.getElementById("container_forces").appendChild(document.createElement("br"));


    }
}

(function init(){
  w = canvas.width;
  h = canvas.height;
  coord_x_0 = w/2;
  coord_y_0 = h/2;
  caso();
  document.getElementById("inp_velocity").value = 1/VELOCIDAD;
  patriclesNum = particles.length;

  // console.log(particles.length)
  // VELOCIDAD = document.getElementById("inp_velocity").value;
  createElements();

})();

window.onresize = function () {
  canvas.width = document.getElementById('contenedor').offsetWidth;
  canvas.height = document.getElementById('contenedor').offsetHeight;

};

(function loop(){
    patriclesNum = particles.length;

    draw();
    requestAnimFrame(loop);


})();
