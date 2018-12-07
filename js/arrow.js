class Arrow{

    constructor(){
        this.angle = 90;
    }

    getAngle(){
        return this.angle;
    }

    rotateRight(){
        if(this.angle > 0){
            this.angle -= 5;
        };
    }

    rotateLeft(){
        if(this.angle < 180){
            this.angle += 5;
        };
    }
}