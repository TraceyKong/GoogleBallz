let canvas = document.getElementById("gameScreen");

let ctx = canvas.getContext("2d");

class Ball{

    constructor(){
        this.image = document.getElementById("ball");
    }

    draw(ctx){
        ctx.drawImage(this.image,
            canvas.width/2 - this.image.width/2,
            canvas.height - this.image.height, 21, 8);
    }

    update(){

    }
}

var ball = new Ball();

ball.draw(ctx);
