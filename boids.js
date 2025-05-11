import { euclidianDistance, getNeighbors} from "./helpers.js"
import {canvas, ctx, boids} from "./animate.js"
import {Vector} from "./Vector.js"
import  {
    alignmentForce ,
    separationForce, 
    cohesionForce ,
    alignmentRange ,
    separationRange, 
    cohesionRange ,
    MAX_SPEED ,
    } from "./forces.js"

// separation constants
const minSeparationDistance = 10;
const hardSeparationForce = 1;

class Boid {

    constructor(xPos , yPos){
        this.position = new Vector(2, xPos, yPos);
        this.velocity = new Vector(2, Math.random() * 10 , Math.random() * 10 );
        this.acceleration = new Vector(2, Math.random() * 6 - 1, Math.random() * 6 - 1);
        this.draw();
    }
    
    flock(){
        let align = alignment(this).mult(alignmentForce);
        let sep   = separation(this).mult(separationForce);
        let coh   = cohesion(this).mult(cohesionForce);
        this.acceleration.add(align).add(coh).add(sep);

    }
    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
   
        const speed = this.velocity.magnitude();
        if (speed > MAX_SPEED) {
            // Scale back to max speed
            this.velocity.normalize().mult(MAX_SPEED)    ;
        }
        
        // wrap around edges
        let [x, y] = this.position.components;
        if (x < 0) x = canvas.width;
        else if (x > canvas.width) x = 0;
        if (y < 0) y = canvas.height;
        else if (y > canvas.height) y = 0;
        this.position.set(x,y);
        this.acceleration.mult(0);
    }

    draw() {
        let [x, y] = this.position.components;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2, false);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
}

function alignment(currentBoid) {
    let steering = new Vector(2, 0, 0);
    let count = 0;
    const neighbors = getNeighbors(boids, currentBoid, alignmentRange);
    for (const other of neighbors) {
        steering.add(other.velocity);
        count++;
    }
    if (count === 0) return steering;
    steering.div(count).mult(4).sub(currentBoid.velocity).mult(alignmentForce);
    return steering;
}

function separation(currentBoid) {
    let steering = new Vector(2, 0, 0);
    let count = 0;
    const neighbors = getNeighbors(boids, currentBoid, separationRange);
    for (const other of neighbors) {
        const d = euclidianDistance(currentBoid.position, other.position);
        // direction from neighbor to current boid
        let diff = currentBoid.position.clone().sub(other.position).normalize();
        if (d < minSeparationDistance) {
            // hard push if too close
            steering.add(diff.clone().mult(hardSeparationForce));
        } else {
            // linear repulsion based on distance
            const weight = (separationRange - d) / (separationRange - minSeparationDistance);
            steering.add(diff.clone().mult(weight));
        }
        count++;
    }
    if (count === 0) return steering;
    return steering.div(count).normalize();
}

function cohesion(currentBoid) {
    let steering = new Vector(2, 0, 0);
    let count = 0;
    // only consider neighbors beyond the separation zone
    const neighbors = getNeighbors(boids, currentBoid, cohesionRange)
        .filter(other => euclidianDistance(currentBoid.position, other.position) > minSeparationDistance);
    for (const other of neighbors) {
        steering.add(other.position);
        count++;
    }
    if (count === 0) return steering;
    // steer toward average position
    return steering.div(count).sub(currentBoid.position).normalize();
}

export {Boid};