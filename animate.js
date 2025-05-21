import {Boid} from "./boids.js"
import {Quadtree} from "./quadtree.js"
import {BoundingBox} from "./boundingBox.js"

const canvas = document.querySelector("canvas") ;
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



const initialBoundary = new BoundingBox(canvas.width/2 , canvas.height/2 , canvas.width/2 , canvas.height/2) 
let boids = new Quadtree(initialBoundary); 
const allBoids = Array.from({length:1000}, ()=>
    new Boid(Math.random()*canvas.width, Math.random()*canvas.height)
  );

canvas.addEventListener("click" , (event) => {
    const rect = canvas.getBoundingClientRect();
    const xPos = event.clientX - rect.left;
    const yPos = event.clientY - rect.top;
    const boid = new Boid(xPos, yPos);
    boids.insert(boid);
    boids.draw();
 
})



function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    boids.clear();
    allBoids.forEach((boid) => {
        boids.insert(boid);
    });
    boids.draw();
     allBoids.forEach((boid) => {
        boid.flock();
        boid.update();
        boid.draw();
        return boid 
    });
    requestAnimationFrame(animate);
}

animate();

export {canvas , ctx , boids}