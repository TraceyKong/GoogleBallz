class Arrow{
    
    constructor(canvas, ballPosition){
        this.canvas = canvas;
        this.LENGTH = 100;
        this.start = ballPosition;
        this.end = canvas.getInitialPosition();
        this.end.setY(this.end.getY() - this.LENGTH);
        this.angle = 90;
    }

    getAngle(){ return this.angle; }

    resetAngle(){ this.angle = 90; }

    draw(){
        this._update();
        this.canvas.draw().beginPath();
        this.canvas.draw().moveTo(this.start.getX(), this.start.getY());
        this.canvas.draw().lineWidth = 5
        this.canvas.draw().lineTo(this.end.getX(), this.end.getY());
        this.canvas.draw().stroke();
        this.canvas.draw().lineWidth = 1;
    }

    rotateLeft(){
        if(this.angle < 180) this.angle += 1;
    }

    rotateRight(){
        if(this.angle > 0) this.angle -= 1;
    }

    _update(){
        this.end.setX(this.start.getX() + this.LENGTH * Math.cos(this.angle * (Math.PI / 180)));
        this.end.setY(this.start.getY() + this.LENGTH * Math.sin((this.angle + 180) * (Math.PI / 180)));
    }

}
