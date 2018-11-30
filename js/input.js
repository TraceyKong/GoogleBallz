class InputHandler{
    constructor(ball){
        document.addEventListener('keydown', event => {

            switch(event.keyCode){
                case 32:
                    ball.move();
                    break;

                case 37:
                    ball.rotateLeft();
                    break;

                case 39:
                    ball.rotateRight();
                    break;
            };

        })
    }
}