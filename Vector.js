class Vector{
    constructor(dimension){
        this.components = Array(dimension).fill(Math.random()*6)
    }
    magnitude(){
        return Math.sqrt(this.components.reduce((accumulator , curr)=> accumulator + Math.pow(curr,2) ,0))
    }
    normalize() {
        const mag = this.magnitude();
        if (mag < 0.0001) return [0, 0]; 
        this.components.forEach((cmpnt) => cmpnt/mag);
    }
}