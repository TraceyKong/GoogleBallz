class Ball{

    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.radius = 10;
        this.position = {
            // x: gameWidth/2 - this.radius,
            x: gameWidth / 2 + this.radius,
            y: gameHeight - this.radius
        };

        this.slope = {x: 0, y: -1};
        this.angle = 90;

        this.moving = false;
        this.speed = {x: 0, y: 0};
    }

    getAngle(){
        return this.angle;
    }

    isMoving(){
        return this.moving;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.stroke();
    }

    move(){
        this.moving = true;
        this.speed = { x: 6, y: 6 };
    }

    stop(){
        this.moving = false;
        this.speed = { x: 0, y: 0 };
    }

    rotateRight(){
        if(!this.moving && this.angle > 0){
            this.angle -= 5;
        };
    }

    rotateLeft(){
        if(!this.moving && this.angle < 180){
            this.angle += 5;
        };
    }

    updateSlope(){
        this.slope.x = Math.cos(this.angle * (Math.PI / 180));
        this.slope.y = Math.sin((this.angle + 180) * (Math.PI / 180));
    }

    updateAngle(){
        if(this.moving){
            if(this.position.x < 0 + this.radius || this.position.x > this.gameWidth-this.radius){
                if(this.slope.y <= 0) this.angle = 180 - this.angle;
                else this.angle = 360-(this.angle-180);
            };
            if(this.position.y < 0 + this.radius){
                this.angle = 360 - this.angle;
            };
        };
    }

    reset(){
        this.position = {
            x: this.gameWidth/2 - this.radius,
            y: this.gameHeight - this.radius
        };

        this.moving = false; 
        this.speed = {x: 0, y: 0};
        this.angle = 90;
    }

    update(){
        this.updateAngle();
        this.updateSlope();

        this.position.x += this.speed.x * this.slope.x;
        this.position.y += this.speed.y * this.slope.y;

        if(this.moving && this.position.y >= this.gameHeight - this.radius){
            this.stop();
            this.position.y = this.gameHeight - this.radius;
            this.angle = 90;
        };
    }
}
