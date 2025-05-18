import { BoundingBox } from "./boundingBox.js";

export class Quadtree {

    constructor(boundary , capacity = 3){
        this.capacity = capacity ;
        this.boundingBox = boundary ;
        this.points = [] ;
    }

    insert(positionVector){
        
        if(! this.boundingBox.contains(positionVector)) return false ;

        if(this.points.length < this.capacity && this.northwest == undefined ){
            this.points.push(positionVector);
            return true ;
        }

        if(this.northwest == undefined ) this.subdivide();

        if(this.northwest.insert(positionVector)) return true ;
        if(this.northeast.insert(positionVector)) return true ;
        if(this.southwest.insert(positionVector)) return true ;
        if(this.southeast.insert(positionVector)) return true ;

    return false ;

    }

    subdivide(){
        const northwestBoundingBox = new BoundingBox(this.boundingBox.center.x - this.boundingBox.halfWidth/2 , this.boundingBox.center.y + this.boundingBox.halfHeight/2 , this.boundingBox.halfWidth/2 , this.boundingBox.halfHeight/2)
        console.log(northwestBoundingBox);
        this.northwest = new Quadtree(northwestBoundingBox) ;
        const northeastBoundingBox = new BoundingBox(this.boundingBox.center.x + this.boundingBox.halfWidth/2 , this.boundingBox.center.y + this.boundingBox.halfHeight/2 , this.boundingBox.halfWidth/2 , this.boundingBox.halfHeight/2)
        this.northeast = new Quadtree(northeastBoundingBox) ;
        const southwestBoundingBox = new BoundingBox(this.boundingBox.center.x - this.boundingBox.halfWidth/2 , this.boundingBox.center.y - this.boundingBox.halfHeight/2 , this.boundingBox.halfWidth/2 , this.boundingBox.halfHeight/2)
        this.southwest = new Quadtree(southwestBoundingBox) ;
        const southeastBoundingBox = new BoundingBox(this.boundingBox.center.x + this.boundingBox.halfWidth/2 , this.boundingBox.center.y - this.boundingBox.halfHeight/2 , this.boundingBox.halfWidth/2 , this.boundingBox.halfHeight/2)
        this.southeast = new Quadtree(southeastBoundingBox) ;

    }

    queryRange(boundingBox , pointsInRange = []){

        if (!this.boundingBox.intersectsOther(boundingBox))
            return pointsInRange;

        for (let point of this.points)
        {
            if (boundingBox.containsPoint(point))
                pointsInRange.push(point);
        }
        if (this.northwest == undefined)
            return pointsInRange;

        this.northwest.queryRange(boundingBox, pointsInRange);
        this.northeast.queryRange(boundingBox, pointsInRange);
        this.southwest.queryRange(boundingBox, pointsInRange);
        this.southeast.queryRange(boundingBox, pointsInRange);
    
        return pointsInRange;
    }

    draw(){
        if(this.northwest != undefined){
            this.northwest.draw();
            this.northeast.draw();
            this.southwest.draw();
            this.southeast.draw();
        }
        this.boundingBox.draw();
    }

}

