
//Globals
let sideLength = 100;
let shapeOffset = sideLength/6.25;
let speed = 2;
var polys = [];

function setup() {
    createCanvas(600, 600);
    
    //Starting positions are simply evenly spaced just below the center of the graphic. Polygons are created.
    var startPos = createVector(width/2 - sideLength/2, height/2 + sideLength/2);
    var index = 0;
    for (var i = 3; i < 16; i++){
        polys[index++] = new Polygon(i, color(cos((i-3)/7)*255, tan((i-3)/7)*255, sin((i-3)/7)*255), startPos);
    }
    
    //Speed controlling for the synchronization of the dot movement.
    var speedMultipliers = [];
    speedMultipliers[0] = 42;
    speedMultipliers[1] = 52;
    speedMultipliers[2] = 60;
    speedMultipliers[3] = 66;
    speedMultipliers[4] = 70;
    speedMultipliers[5] = 72;
    speedMultipliers[6] = 72;
    speedMultipliers[7] = 70;
    speedMultipliers[8] = 66;
    speedMultipliers[9] = 60;
    speedMultipliers[10] = 52;
    speedMultipliers[11] = 42;
    speedMultipliers[12] = 30;
    
    for (var i = 0; i < 13; i++){
        speedMultipliers[i] /= 30;
        polys[i].speed = speedMultipliers[i] * speed;
    }
}

function draw() {
    background(200);

    //Re-drawing each polygon with the new dot location.
    for (var i = 0; i < 13; i++){
        polys[i].draw();
        polys[i].drawCircle();
        polys[i].newDotPos();
    }
    
}
