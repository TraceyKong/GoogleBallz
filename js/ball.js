class Ball{

    constructor(gameWidth, gameHeight){
        this.image = document.getElementById("ball");
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.position = {
            x: gameWidth/2 - this.image.width/2,
            y: gameHeight - this.image.height
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
        ctx.drawImage(this.image, this.position.x, this.position.y);
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
        if(this.position.x < 0 || this.position.x > this.gameWidth-this.image.width){
            if(this.slope.y <= 0) this.angle = 180 - this.angle;
            else this.angle = 360-(this.angle-180);
        };
        if(this.position.y < 0){
            this.angle = 360 - this.angle;
        };
    }

    reset(){
        this.position = {
            x: this.gameWidth/2 - this.image.width/2,
            y: this.gameHeight - this.image.height
        };

        this.moving = false; 
        this.speed = {x: 0, y: 0};
        this.angle = 90;
    }

    update(deltaTime){
        this.updateAngle();
        this.updateSlope();

        this.position.x += this.speed.x * this.slope.x;
        this.position.y += this.speed.y * this.slope.y;

        if(this.moving && this.position.y >= this.gameHeight - this.image.height){
            this.stop();
            this.angle = 90;
        };
    }
}
