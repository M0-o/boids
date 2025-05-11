
function euclidianDistance(vec1, vec2) {
    const dx = vec1.components[0] - vec2.components[0];
    const dy = vec1.components[1] - vec2.components[1];
    return Math.sqrt(dx * dx + dy * dy);
}

function getNeighbors(boids, currentBoid, range , type) {
    
    return boids.filter(other => 
        other !== currentBoid && euclidianDistance(currentBoid.position, other.position) < range && (type == "cohesion" ? (euclidianDistance(currentBoid.position, other.position) >= 25 ):true) 
    );
}

export { euclidianDistance , getNeighbors}