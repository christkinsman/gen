
var c = document.getElementById("myCanvas");

c.style.backgroundColor = 'white';

var ctx = c.getContext("2d");

var width = 400;
var height = width;

c.height = height;
c.width = width;

draw();

//Cube spiral
// var spiralGap = cell / 12.2;
// var cntr = cell*5;
// for(var i=0; i<52; i++) {
//     square(5*cell,5*cell,i*3,(i-1)*15);    
//     square(5*cell,5*cell,i*spiralGap,(i-1)*15);    
// }
//Cube spiral within grid
// var turnMax = 9;
// var turnRad = 360/turnMax;
// for(var i=0; i<=turnMax; i++) {
//    square(cntr,cntr, (cell*1) + ((cell/turnMax)*i),turnRad*i);
// }

function btn1() {
  document.getElementById("gridSize").value = 6;
  document.getElementById("division").value = 2;
  document.getElementById("rings").value = 2;
  document.getElementById("cubeCount").value = 4;
  document.getElementById("diamondCount").value = 0;
  document.getElementById("circleCount").value = 2;
  draw();
}
function btn2() {
  document.getElementById("gridSize").value = 2;
  document.getElementById("division").value = 1;
  document.getElementById("rings").value = 2;
  document.getElementById("cubeCount").value = 2;
  document.getElementById("diamondCount").value = 0;
  document.getElementById("circleCount").value = 4;
  draw();
}
function btn3() {
  document.getElementById("gridSize").value = 12;
  document.getElementById("division").value = 1;
  document.getElementById("rings").value = 10;
  document.getElementById("cubeCount").value = 2;
  document.getElementById("diamondCount").value = 0;
  document.getElementById("circleCount").value = 4;
  draw();
}
function btn4() {
  document.getElementById("gridSize").value = 20;
  document.getElementById("division").value = 4;
  document.getElementById("rings").value = 8;
  document.getElementById("cubeCount").value = 36;
  document.getElementById("diamondCount").value = 0;
  document.getElementById("circleCount").value = 16;
  draw();
}


function draw() {
  clear();

  var gridSize = document.getElementById("gridSize").value;
  division = document.getElementById("division").value;
  cell = width/gridSize;
  cellDiv = cell/division;

  var gridType = document.getElementById('gridSelect').value;
  var cubeCount = document.getElementById('cubeCount').value;
  var circleCount = document.getElementById('circleCount').value;
  var diamondCount = document.getElementById('diamondCount').value;
  var rings = document.getElementById('rings').value;

  strokeColor = 'black';

  if(gridType == 'grid') {
    grid(gridSize);
  } else {
    circleGrid(gridSize + 1);
  }

  for(var j=0; j<cubeCount; j++) {
    var offset = rand(2);
    var posx = (rand(gridSize)+offset) * cell; 
    var posy = (rand(gridSize)+offset) * cell;
    for(var i=rings; i>0; i--) {
      square(posx, posy, i*cellDiv,0);
    }
  }

  for(var j=0; j<diamondCount; j++) {
    var offset = rand(2);
    var posx = (rand(gridSize)+offset) * cell; 
    var posy = (rand(gridSize)+offset) * cell;
    for(var i=rings; i>0; i--) {
      square(posx, posy, i*cellDiv,135);
    }
  }

  for(var j=0; j<circleCount; j++) {
    var offset = rand(2);
    var posx = (rand(gridSize)+offset) * cell; 
    var posy = (rand(gridSize)+offset) * cell;
    for(var i=rings; i>0; i--) {
      circle(posx, posy, i*cellDiv);
    }
  }

}

function clear() {
  ctx.clearRect(0, 0, width, height);
}

// Grids
function grid(e) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  for(var i=0; i<e; i++) {
    ctx.moveTo(i*cell, 0);
    ctx.lineTo(i*cell, width);
    ctx.stroke();
    for(var j=0; j<e; j++) {
        ctx.moveTo(0, j*cell);
        ctx.lineTo(height, j*cell);
        ctx.strokeStyle = 'grey';
        ctx.stroke();
    }
  }
  ctx.closePath();
}
function circleGrid(e) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  for(var i=0; i<e; i++) {
    for(var j=0; j<e; j++) {
        circle(i*cell, j*cell, 1);
    }
  }
  ctx.closePath();
}

//Simple Shapes
function square(x,y,r,rot) {
    if(rot != 0) {
        ctx.translate(x,y);
        ctx.rotate(rot * Math.PI / 180);     
        ctx.translate(-x,-y);
    }   
    ctx.beginPath();
    ctx.moveTo(x-r, y-r);
    ctx.lineTo(x+r,y-r);
    ctx.lineTo(x+r,y+r);
    ctx.lineTo(x-r,y+r);
    ctx.lineTo(x-r,y-r);
    //ctx.fillStyle = 'white';
    //ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
    ctx.closePath();   
    if(rot != 0) {
        ctx.translate(x,y);
        ctx.rotate(-rot * Math.PI / 180);     
        ctx.translate(-x,-y);
    }   
}

function circle(x,y,r) {
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    //ctx.fillStyle = 'white';
    //ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function rect(x,y,r,rot) {
    var thisX = x*cell;
    var thisY = y*cell;
    if(rot != 0) {
        ctx.translate(thisX, thisY);
        ctx.rotate(rot * Math.PI / 180);     
        ctx.translate(-thisX,-thisY);
    }   
    ctx.beginPath();
    ctx.rect(thisX-r,thisY-r,r*2,r*2);
    ctx.stroke();
    ctx.closePath();
    if(rot != 0) {
        ctx.translate(thisX, thisY);
        ctx.rotate(-rot * Math.PI / 180);     
        ctx.translate(-thisX,-thisY);
    }   
}

function rand(n) {
    return Math.floor(Math.random() * n);
}



