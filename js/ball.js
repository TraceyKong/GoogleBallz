class Ball{

    constructor(gameWidth, gameHeight){
        this.image = document.getElementById("ball");
        this.position = {
            x: gameWidth/2 - this.image.width/2,
            y: gameHeight - this.image.height-30,
        }
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }

    update(deltaTime){
        if(!deltaTime) return;
        this.position.x += 5/deltaTime; 
    }
}
