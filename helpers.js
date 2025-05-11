function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function euclidianDistance(vec1, vec2) {
    const dx = vec1.components[0] - vec2.components[0];
    const dy = vec1.components[1] - vec2.components[1];
    return Math.sqrt(dx * dx + dy * dy);
}

function getNeighbors(boids, currentBoid, range) {
    return boids.filter(other => 
        other !== currentBoid &&
        euclidianDistance(currentBoid.position, other.position) < range
    );
}

export {sigmoid , euclidianDistance , getNeighbors}