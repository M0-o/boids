let alignmentForce = 0.2;
let separationForce = 0.3;
let cohesionForce = 0.1;
let alignmentRange = 100;
let separationRange = 40;
let cohesionRange = 30;
const MAX_SPEED = 6;

document.getElementById("cohesion").addEventListener("input" , (event)=>{
    cohesionForce = parseFloat(event.target.value)
})

document.getElementById("alignmentRange").addEventListener("input" , (event)=>{
    alignmentRange = parseFloat(event.target.value)
})

document.getElementById("separationRange").addEventListener("input" , (event)=>{
    separationRange = parseFloat(event.target.value)
})

document.getElementById("cohesionRange").addEventListener("input" , (event)=>{
    cohesionRange = parseFloat(event.target.value)
})
document.querySelector("#alignment").addEventListener("change", (e) => {
    alignmentForce = parseFloat(e.target.value);
});

document.querySelector("#separation").addEventListener("change", (e) => {
    separationForce = parseFloat(e.target.value);
});

document.querySelector("#cohesion").addEventListener("change", (e) => {
    cohesionForce = parseFloat(e.target.value);
});

export {
alignmentForce ,
separationForce, 
cohesionForce ,
alignmentRange ,
separationRange, 
cohesionRange ,
MAX_SPEED ,
}