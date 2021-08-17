
//Line object to use with each polygon
function Line(xx1, yy1, xx2, yy2, a){
    this.angle = a;
    this.x1 = xx1;
    this.y1 = yy1;
    this.x2 = xx2;
    this.y2 = yy2;
}

function Polygon(s, c, startPos){
    
    this.startPosition = startPos;
    this.offset = shapeOffset * (s - 3);
    this.color = c;
    this.sides = s;
    this.lines = [];
    
    this.dotx = width/2;
    this.doty = this.startPosition.y + this.offset;
    this.currentLine = 0;
    this.speed = 2;
    
    var currentPos = createVector(0, 0);
    var prevPos = createVector(this.startPosition.x, this.startPosition.y + this.offset);
    var angle = 0;
    var angleInc = -360/this.sides/180 * PI;
    
    //Creating each vector for each side of the polygon based on the given side count.
    for (var i = 0; i < this.sides; i++){
        currentPos = createVector(prevPos.x + cos(angle)*sideLength,
                                  prevPos.y + sin(angle)*sideLength);
        this.lines[i] = new Line(prevPos.x, prevPos.y, currentPos.x, currentPos.y, angle);
        
        angle += angleInc;
        prevPos = currentPos;
    }
    
    this.draw = function(){
        
        stroke(this.color);
        for (var i = 0; i < this.lines.length; i++){
            line(this.lines[i].x1, this.lines[i].y1, this.lines[i].x2, this.lines[i].y2);
        }
    }
    
    this.drawCircle = function(){
        fill(0);
        stroke(0);
        ellipse(this.dotx, this.doty, 6, 6);
    }
    
    this.newDotPos = function(){
        
        //Calculates the new distance the dot for this polygon needs to move
        let d = dist(this.dotx, this.doty, this.lines[this.currentLine].x2, this.lines[this.currentLine].y2);
        
        //If the distance puts the dot past the current line it is travelling.  
        //  The dot needs to move the remaining distance of the line 
        //  then up the next line.
        if (d < this.speed + 1){

            //Get the distance that the dot needs to travel up the new line.  
            let newTravelDist = this.speed - d;

            //Sets the dots location to the end of the current line (same as the start to the new line)
            this.dotx = this.lines[this.currentLine].x2;
            this.doty = this.lines[this.currentLine].y2;

            //If we are at the last line in the polygon
            if (this.currentLine === this.sides - 1){
                this.currentLine = 0;
            }
            else{
                this.currentLine++;
            }
            
            //Moves the dot up the line.
            this.dotx += cos(this.lines[this.currentLine].angle) * newTravelDist;
            this.doty += sin(this.lines[this.currentLine].angle) * newTravelDist;
        }
        else{
            //Moves the dot up the line.
            this.dotx += cos(this.lines[this.currentLine].angle) * this.speed;
            this.doty += sin(this.lines[this.currentLine].angle) * this.speed;
        }
    }
    
}

