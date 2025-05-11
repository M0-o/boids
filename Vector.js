class Vector{
    constructor(dimension , ...components){
        this.components = components.length == 0 ? Array(dimension).fill(Math.random()*6) : components ;
    }
    magnitude(){
        return Math.sqrt(this.components.reduce((accumulator , curr)=> accumulator + Math.pow(curr,2) ,0))
    }
    normalize() {
        const mag = this.magnitude();
        if (mag < 0.0001) return this;
        for (let i = 0; i < this.components.length; i++) {
            this.components[i] /= mag;
        }
        return this;
    }
    add(vector){
        for( let i=0 ; i < this.components.length ; i++){
            this.components[i] += vector.components[i]
        }
        return this ;
    }
    sub(vector){
        for( let i=0 ; i < this.components.length ; i++){
            this.components[i] -= vector.components[i]
        }
        return this ;
    }
    mult(scalar){
        for( let i=0 ; i < this.components.length ; i++){
            this.components[i] *= scalar ;
        }
        return this ;
    }
    div(scalar){
        for( let i=0 ; i < this.components.length ; i++){
            this.components[i] /= scalar ;
        }
        return this ;
    }
    
    clone() {
        return new Vector(this.components.length, ...this.components);
    }
    set(...components){
        for(let i=0 ; i < this.components.length ; i++){
            this.components[i] = components[i];
        }
    }
}


export {Vector};