class Brick{

    constructor(x, y){
        this.width = 100;
        this.height = 100;

        this.position = { x: x, y: y };

        this.power = 12;
    }

    getTop(){ return this.position.y; }
    getBottom(){ return this.position.y + this.height; }
    getLeft(){ return this.position.x; }
    getRight(){ return this.position.x + this.width; }
    
    isActive(){ return this.power != 0; }

    draw(ctx){
        ctx.beginPath();
        ctx.rect(this.position.x, this.position.y, this.width, this.height);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.textAlign="center";
        ctx.textBaseline = "middle"; 
        ctx.fillText(this.power, this.position.x + this.width/2, this.position.y + this.height/2);
        ctx.stroke();
    }

    decreasePower(){ this.power--; }

}
