export default class Ball{

    constructor(){
        this.image = document.getElementById("ball");
    }

    draw(ctx){
        ctx.drawImage(this.image, 50, 10, 21, 8);
    }

    update(){

    }
}
