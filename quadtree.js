import { BoundingBox } from "./boundingBox.js";

export class Quadtree {

    constructor(boundary, capacity = 3) {
        this.capacity     = capacity;
        this.boundingBox  = boundary;
        this.points       = [];    // will hold Boid instances
    }

    // now insert takes a Boid, not just [x,y]
    insert(boid) {
        const pos = boid.position.components;
        if (!this.boundingBox.contains(pos)) return false;

        if (this.points.length < this.capacity && !this.northwest) {
            this.points.push(boid);
            return true;
        }

        if (!this.northwest) this.subdivide();

        if (this.northwest.insert(boid)) return true;
        if (this.northeast.insert(boid)) return true;
        if (this.southwest.insert(boid)) return true;
        if (this.southeast.insert(boid)) return true;

        return false;
    }

    queryRange(rangeBox, found = []) {
        // if no overlap, bail out
        if (!this.boundingBox.intersectsOther(rangeBox)) 
            return found;

        // check only the Boids stored in this node
        for (const boid of this.points) {
            if (rangeBox.contains(boid.position.components)) {
                found.push(boid);
            }
        }
        if (!this.northwest) 
            return found;

        this.northwest.queryRange(rangeBox, found);
        this.northeast.queryRange(rangeBox, found);
        this.southwest.queryRange(rangeBox, found);
        this.southeast.queryRange(rangeBox, found);

        return found;
    }

    subdivide(){
        const northwestBoundingBox = new BoundingBox(this.boundingBox.center.x - this.boundingBox.halfWidth/2 , this.boundingBox.center.y + this.boundingBox.halfHeight/2 , this.boundingBox.halfWidth/2 , this.boundingBox.halfHeight/2)
        this.northwest = new Quadtree(northwestBoundingBox) ;
        const northeastBoundingBox = new BoundingBox(this.boundingBox.center.x + this.boundingBox.halfWidth/2 , this.boundingBox.center.y + this.boundingBox.halfHeight/2 , this.boundingBox.halfWidth/2 , this.boundingBox.halfHeight/2)
        this.northeast = new Quadtree(northeastBoundingBox) ;
        const southwestBoundingBox = new BoundingBox(this.boundingBox.center.x - this.boundingBox.halfWidth/2 , this.boundingBox.center.y - this.boundingBox.halfHeight/2 , this.boundingBox.halfWidth/2 , this.boundingBox.halfHeight/2)
        this.southwest = new Quadtree(southwestBoundingBox) ;
        const southeastBoundingBox = new BoundingBox(this.boundingBox.center.x + this.boundingBox.halfWidth/2 , this.boundingBox.center.y - this.boundingBox.halfHeight/2 , this.boundingBox.halfWidth/2 , this.boundingBox.halfHeight/2)
        this.southeast = new Quadtree(southeastBoundingBox) ;

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

    clear(){
        this.points.length = 0;
        if(this.northwest){
          this.northwest.clear();
          this.northeast.clear();
          this.southwest.clear();
          this.southeast.clear();
          this.northwest = this.northeast = this.southwest = this.southeast = null;
        }
      }
      

}

