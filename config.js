var LIMITE_R = 1E-1;
const PERM_VACIO = 8.854187817E-12;
var WidthInPixels =  10000; // 1 metro corresponde n pixeles
var VELOCIDAD = 1;
var GRAPHS = 1;
var canvas = document.querySelector('canvas'),
ctx = canvas.getContext('2d'),
particles = [],
patriclesNum = 10,
w = 0,
h = 0,
colors = ['#00897b', '#009688','#e0f2f1', '#e0f2f1 '],
time = 0;
var line = 15;
var coord_x_0 = 0;
var coord_y_0 = 0;
var should_move = 1;

canvas.width = document.getElementById('contenedor').offsetWidth;
canvas.height = document.getElementById('contenedor').offsetHeight;
