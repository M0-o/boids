const canvas = document.querySelector("canvas") ;
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


class Boid {

    constructor(xPos , yPos){
        this.xPos = xPos ;
        this.yPos = yPos ;
        this.vx = Math.random() * 6 - 1;
        this.vy = Math.random() * 6 - 1;
        this.draw();
    }

    update() {
        this.xPos += this.vx;
        this.yPos += this.vy;
        const [alignedX, alignedY] = alignment(this); 
        
        this.vx += alignedX ;
        this.vy += alignedY ;
        if (this.xPos < 0) {
            this.xPos = canvas.width;
        } else if (this.xPos > canvas.width) {
            this.xPos = 0;
        }
        if (this.yPos < 0) {
            this.yPos = canvas.height;
        } else if (this.yPos > canvas.height) {
            this.yPos = 0;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.xPos, this.yPos, 10, 0, Math.PI * 2, false);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
}

const boids = [];

canvas.addEventListener("click" , (event) => {
    const rect = canvas.getBoundingClientRect();
    const xPos = event.clientX - rect.left;
    const yPos = event.clientY - rect.top;
    const boid = new Boid(xPos, yPos);
    boids.push(boid);
})

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    boids.forEach((boid) => {
        boid.update();
        boid.draw();
    });
    requestAnimationFrame(animate);
}


function alignment(currentBoid) {
    let totalX = 0;
    let totalY = 0;
    let count = 0;
  
    for (const boid of boids) {
        if (boid !== currentBoid) {  
            totalX += boid.vx;
            totalY += boid.vy;
            count++;
        }
    }
  
    if (count === 0) return [0, 0];
  
    let avgX = totalX / count;
    let avgY = totalY / count;
  
    let steerX = avgX - currentBoid.vx;
    let steerY = avgY - currentBoid.vy;
    
    return [steerX, steerY];
}

animate();