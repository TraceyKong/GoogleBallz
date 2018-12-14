class BallInputHandler{
    constructor(ball, i){
        document.addEventListener('keydown', event => {

            switch(event.keyCode){
                //space
                case 32:
                    if(!ball.isMoving()){
                        setTimeout(function(){
                            ball.move();
                        }, i * 100);
                        break;
                    };
            };

        })
    }
}

class ArrowInputHandler{
    constructor(arrow, ball){
        document.addEventListener('keydown', event => {

            switch(event.keyCode){
                //left arrow
                case 37:
                    if(!ball.isMoving()){
                        arrow.rotateLeft();
                    };
                    break;

                //right arrow
                case 39:
                    if(!ball.isMoving()){
                        arrow.rotateRight();
                    };
                    break;
            };
        })
    }
}