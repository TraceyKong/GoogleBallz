class InputHandler{
    constructor(ball){
        document.addEventListener('keydown', event => {

            switch(event.keyCode){
                //space
                case 32:
                    if(!ball.isMoving()){
                        setTimeout(function(){
                            ball.move();
                        }, ball.getNumber() * 100);
                        break;
                    };

                //left arrow key
                case 37:  
                    ball.rotateLeft();
                    break;

                //right arrow key
                case 39: 
                    ball.rotateRight();
                    break;
            };

        })
    }
}