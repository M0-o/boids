

const canvas = document.querySelector("canvas") ;
const ctx = canvas.getContext("2d");

class Point{
    constructor(x ,y){
        this.x = x ;
        this.y = y ;
    }
}
class BoundingBox {

    constructor(x, y, halfWidth, halfHeight){
        this.center   = new Point(x,y)
        this.halfWidth    = halfWidth;
        this.halfHeight   = halfHeight;
    }

    contains(PositionVector){

        const [bx, by]     = PositionVector;
        const {x, y}     = this.center;
        
        const inX = bx >= x - this.halfWidth && bx <= x + this.halfWidth;
        const inY = by >= y - this.halfHeight && by <= y + this.halfHeight;

        return inX && inY;
    }

    getSpan(){
        return [this.center.x - this.halfWidth , 
            this.center.x + this.halfWidth ,
            this.center.y - this.halfHeight ,
            this.center.y + this.halfHeight 
        ]
    }

     intersectsOther(other){
        const [thisMinX , thisMaxX , thisMinY , thisMaxY] = this.getSpan();
        const [otherMinX , otherMaxX , otherMinY , otherMaxY] = other.getSpan();

        return thisMinX <= otherMaxX 
        && thisMaxX >= otherMinX 
        && thisMinY <= otherMaxY
        && thisMaxY >= otherMinY ;
     } 

     draw(color = 'black'){
        ctx.save();
        // move origin to the box’s center
        ctx.translate(this.center.x, this.center.y);
    
        ctx.strokeStyle = color;
        ctx.lineWidth   = 2;
        // draw with top‐left at (–halfWidth, –halfHeight)
        ctx.strokeRect(
          -this.halfWidth,
          -this.halfHeight,
           this.halfWidth * 2,
           this.halfHeight * 2
        );
    
        ctx.restore();
    }


}



canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let first  = new BoundingBox(300, 300, 100, 60);
let second = new BoundingBox(500, 200, 120, 80);
const boxes = [ first, second ];

boxes.forEach(b => b.draw());

let dragTarget = null;
let dragOffset = { x: 0, y: 0 };

canvas.addEventListener("mousedown", e => {
    const rect   = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    for (const b of boxes) {
     
      if (
    b.contains([mouseX , mouseY])
      ) {
        dragTarget = b;
        dragOffset.x = mouseX - b.center.x;
        dragOffset.y = mouseY - b.center.y;
        break;
      }
    }
  });

  canvas.addEventListener("mousemove", e => {
    if (!dragTarget) return;
    const rect = canvas.getBoundingClientRect();
    dragTarget.center.x = e.clientX - rect.left - dragOffset.x;
    dragTarget.center.y = e.clientY - rect.top  - dragOffset.y;
    // clear & redraw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for( const  box of boxes ){
        let color= 'black'
        for( const other of boxes){
            if( box == other) continue ;

            if(box.intersectsOther(other)){
                color = 'red'
            }
        }
        box.draw(color);
    }
  });
  
  canvas.addEventListener("mouseup", () => {
    dragTarget = null;
  });

/* function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    boids = boids.map((boid) => {
        boid.flock();
        boid.update();
        boid.draw();
        return boid 
    });
    requestAnimationFrame(animate);
} */



export { BoundingBox }