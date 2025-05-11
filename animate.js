import {Boid} from "./boids.js"

const canvas = document.querySelector("canvas") ;
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let boids = [];





canvas.addEventListener("click" , (event) => {
    const rect = canvas.getBoundingClientRect();
    const xPos = event.clientX - rect.left;
    const yPos = event.clientY - rect.top;
    const boid = new Boid(xPos, yPos);
    boids.push(boid);
})



function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    boids = boids.map((boid) => {
        boid.flock();
        boid.update();
        boid.draw();
        return boid 
    });
    requestAnimationFrame(animate);
}

animate();

export {canvas , ctx , boids}