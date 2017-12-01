function magnitude(x, y){
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function findElectricField(q, f){
  q = Math.abs(q);
  Ex = q/f.fx;
  Ey = q/f.fy;
  return {Emag:magnitude(Ex, Ey), Ex:Ex, Ey:Ey};
}
function findElectricForce(r, q1, q2){
  var repela = (q1*q2>0) ? -1 : 1;
  var Fx = repela * (1/(4*Math.PI*PERM_VACIO))*((Math.abs(q1*q2))/Math.pow(r.r, 2)) * (r.x/r.r);
  var Fy = repela * (1/(4*Math.PI*PERM_VACIO))*((Math.abs(q1*q2))/Math.pow(r.r, 2)) * (r.y/r.r);
  return {f: magnitude(Fx, Fy), fx: Fx, fy: Fy};
}

function getAceleration(f, m){
  var a = {a:0, ax: f.fx/m, ay: f.fy/m};
  a.a=magnitude(a.ax, a.ay);
  return a;
}

function getRVector(x, y){
  return {   r: magnitude(x, y),
    x: x,
    y: y,
    i: x/magnitude(x, y),
    j: y/magnitude(x, y)
  };
}

function getPosition(a, t){
  return {
    r: magnitude((1/2)*a.ax*Math.pow(t, 2), (1/2)*a.ay*Math.pow(t, 2) ),
    x:(1/2)*a.ax*Math.pow(t, 2),
    y:(1/2)*a.ay*Math.pow(t, 2),
    i:((1/2)*a.ax*Math.pow(t, 2))/magnitude(a.ax*t , a.ay*t),
    j:((1/2)*a.ay*Math.pow(t, 2))/magnitude(a.ax*t , a.ay*t)
  };
}
