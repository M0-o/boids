

const canvas = document.querySelector("canvas") ;
const ctx = canvas.getContext("2d");

class Point{
    constructor(x ,y){
        this.x = x ;
        this.y = y ;
    }
}
export class BoundingBox {

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
        
        ctx.translate(this.center.x, this.center.y);
    
        ctx.strokeStyle = color;
        ctx.lineWidth   = 2;
       
        ctx.strokeRect(
          -this.halfWidth,
          -this.halfHeight,
           this.halfWidth * 2,
           this.halfHeight * 2
        );
    
        ctx.restore();
    }


}


