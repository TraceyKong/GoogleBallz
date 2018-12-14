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

    //if ball touches a brick
    brickTouched(bricks){
        for(var i=0; i<bricks.length; i++){
            if(this.position.x > bricks[i].getLeft() && this.position.x < bricks[i].getRight()){
                //handles top and bottom of the brick
                if(this.position.y > bricks[i].getTop() - this.radius && this.position.y < bricks[i].getBottom() + this.radius){
                    this.reverseY();
                    bricks[i].decreasePower();
                }
            }else if(this.position.y > bricks[i].getTop() && this.position.y < bricks[i].getBottom()){
                //handles left and right of the brick
                if(this.position.x > bricks[i].getLeft() - this.radius && this.position.x < bricks[i].getRight() + this.radius){
                    this.reverseX();
                    bricks[i].decreasePower();
                }
            }
            //still need to handle corners
        }
    }

    //recalculates the slope
    updateSlope(){
        this.slope.x = Math.cos(this.angle * (Math.PI / 180));
        this.slope.y = Math.sin((this.angle + 180) * (Math.PI / 180));
    }

    //updates angle
    updateAngle(angle, bricks){
        if(this.isMoving()){
            //if ball touches a left or right wall
            if(this.position.x < 0 + this.radius || this.position.x > this.gameWidth-this.radius){
                this.reverseX();
            };
            //if ball touches a top wall
            if(this.position.y < 0 + this.radius){
                this.reverseY();
            };
            this.brickTouched(bricks);
            
        }else{
            this.angle = angle;
        };
    }

    reverseX(){
        if(this.slope.y <= 0) this.angle = 180 - this.angle;
        else this.angle = 360-(this.angle-180);
    }

    reverseY(){
        this.angle = 360 - this.angle;
    }

    //updates the ball's position
    update(angle, bricks, x){
        this.updateAngle(angle, bricks);
        this.updateSlope();

        this.position.x += this.speed.x * this.slope.x;
        this.position.y += this.speed.y * this.slope.y;

        //ball stops when it touches bottom
        if(this.isMoving() && this.position.y >= this.gameHeight - this.radius){
            this.stop();
            this.position.y = this.gameHeight - this.radius;
            this.position.x = x;
            this.angle = 90;
        };
    }
}
