class Ball{

    constructor(gameWidth, gameHeight){
        this.image = document.getElementById("ball");
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.position = {
            x: gameWidth/2 - this.image.width/2,
            y: gameHeight - this.image.height-100,
        }
        this.slope = {x: 1, y: 1};

        this.moving = false;
        this.speed = {x: 0, y: 0};
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }

    move(){
        this.moving = !this.moving;
        if(this.moving){
            this.speed.x = 2;
            this.speed.y = 2;
        }else{
            this.speed.x = 0;
            this.speed.y = 0;
        }
    }

    update(deltaTime){
        this.position.x += this.speed.x * this.slope.x;
        this.position.y += this.speed.y * this.slope.y;

        if(this.position.x < 0 || this.position.x > this.gameWidth-this.image.width){
            this.slope.x = -this.slope.x;
        }
        if(this.position.y < 0 || this.position.y > this.gameHeight-this.image.height){
            this.slope.y = -this.slope.y;
        }
    }
}
