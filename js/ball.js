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
        this.speed = {x: 0, y: 0};
    }

    //getters
    getAngle(){ return this.angle; }
    getX(){ return this.position.x; }
    getY(){ return this.position.y; }

    //returns true if the ball is moving, false otherwise
    isMoving(){ return this.speed.x != 0 || this.speed.y != 0; }

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
        this.speed = { x: 8, y: 8 };
    }

    //stops ball
    stop(){
        this.speed = { x: 0, y: 0 };
    }

    //recalculates the slope
    updateSlope(){
        this.slope.x = Math.cos(this.angle * (Math.PI / 180));
        this.slope.y = Math.sin((this.angle + 180) * (Math.PI / 180));
    }

    //updates angle
    updateAngle(angle){
        if(this.isMoving()){
            //if ball touches left or right
            if(this.position.x < 0 + this.radius || this.position.x > this.gameWidth-this.radius){
                if(this.slope.y <= 0) this.angle = 180 - this.angle;
                else this.angle = 360-(this.angle-180);
            };
            //if ball touches top
            if(this.position.y < 0 + this.radius){
                this.angle = 360 - this.angle;
            };
        }else{
            this.angle = angle;
        };
    }

    //updates the ball's position
    update(angle){
        this.updateAngle(angle);
        this.updateSlope();

        this.position.x += this.speed.x * this.slope.x;
        this.position.y += this.speed.y * this.slope.y;

        //ball stops when it touches bottom
        if(this.isMoving() && this.position.y >= this.gameHeight - this.radius){
            this.stop();
            this.position.y = this.gameHeight - this.radius;
            this.angle = 90;
        };
    }
}
