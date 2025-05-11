import {sigmoid, euclidianDistance, getNeighbors} from "./helpers.js"
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



class Boid {

    constructor(xPos , yPos){
        this.position = new Vector(2, xPos, yPos);
        this.velocity = new Vector(2, Math.random() * 6 - 1, Math.random() * 6 - 1);
        this.draw();
    }

    update() {
        this.position.add(this.velocity);
        // apply flocking forces
        let align = alignment(this).mult(alignmentForce);
        let sep   = separation(this).mult(separationForce);
        let coh   = cohesion(this).mult(cohesionForce);
        this.velocity.add(align).add(sep).add(coh);
        // speed limit
        const speed = this.velocity.magnitude();
        if (speed > MAX_SPEED) {
            // Scale back to max speed
            this.velocity.normalize().mult(MAX_SPEED);
        }
        
        // wrap around edges
        let [x, y] = this.position.components;
        if (x < 0) x = canvas.width;
        else if (x > canvas.width) x = 0;
        if (y < 0) y = canvas.height;
        else if (y > canvas.height) y = 0;
        this.position = new Vector(2, x, y);
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
    steering.div(count).sub(currentBoid.velocity).normalize();
    return steering;
}

function separation(currentBoid) {
    let steering = new Vector(2, 0, 0);
    let count = 0;
    const alpha = 0.5;
    const neighbors = getNeighbors(boids, currentBoid, separationRange);
    for (const other of neighbors) {
        const d = euclidianDistance(currentBoid.position, other.position);
        let diff = currentBoid.position.clone().sub(other.position);
        diff.normalize().mult(sigmoid(alpha * (separationRange - d)));
        steering.add(diff);
        count++;
    }
    if (count === 0) return steering;
    return steering.div(count).normalize();
}

function cohesion(currentBoid) {
    let center = new Vector(2, 0, 0);
    let count = 0;
    const alpha = 5;
    const neighbors = getNeighbors(boids, currentBoid, cohesionRange);
    for (const other of neighbors) {
        const d = euclidianDistance(currentBoid.position, other.position);
        center.add(other.position.clone().mult(sigmoid(alpha * (cohesionRange - d))));
        count++;
    }
    if (count === 0) return center;
    center.div(count);
    center.sub(currentBoid.position).normalize();
    return center;
}

export {Boid};