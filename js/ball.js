class Ball{

    constructor(gameWidth, gameHeight, number){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.radius = 10;
        this.position = {
            x: gameWidth / 2,
            y: gameHeight - this.radius
        };

        this.slope = {x: 0, y: -1};
        this.angle = 90;

        this.moving = false;
        this.speed = {x: 0, y: 0};

        this.number = number;
    }

    //returns angle of direction
    getAngle(){
        return this.angle;
    }

    getNumber(){
        return this.number;
    }

    //returns true if the ball is moving, false otherwise
    isMoving(){
        return this.moving;
    }

    //draws the ball
    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.stroke();
    }

    //ball starts moving
    move(){
        this.moving = true;
        this.speed = { x: 8, y: 8 };
    }

    //stops ball
    stop(){
        this.moving = false;
        this.speed = { x: 0, y: 0 };
    }

    //rotates the direction to the right
    rotateRight(){
        if(!this.moving && this.angle > 0){
            this.angle -= 5;
        };
    }

    //rotates the direction to the left
    rotateLeft(){
        if(!this.moving && this.angle < 180){
            this.angle += 5;
        };
    }

    //recalculates the slope
    updateSlope(){
        this.slope.x = Math.cos(this.angle * (Math.PI / 180));
        this.slope.y = Math.sin((this.angle + 180) * (Math.PI / 180));
    }

    //updates angle
    updateAngle(){
        if(this.moving){
            //if ball touches left or right
            if(this.position.x < 0 + this.radius || this.position.x > this.gameWidth-this.radius){
                if(this.slope.y <= 0) this.angle = 180 - this.angle;
                else this.angle = 360-(this.angle-180);
            };
            //if ball touches top
            if(this.position.y < 0 + this.radius){
                this.angle = 360 - this.angle;
            };
        };
    }

    //resets game
    reset(){
        this.position = {
            x: this.gameWidth / 2,
            y: this.gameHeight - this.radius
        };

        this.moving = false; 
        this.speed = {x: 0, y: 0};
        this.angle = 90;
    }

    //updates the ball's position
    update(){
        this.updateAngle();
        this.updateSlope();

        this.position.x += this.speed.x * this.slope.x;
        this.position.y += this.speed.y * this.slope.y;

        //ball stops when it touches bottom
        if(this.moving && this.position.y >= this.gameHeight - this.radius){
            this.stop();
            this.position.y = this.gameHeight - this.radius;
            this.angle = 90;
        };
    }
}
