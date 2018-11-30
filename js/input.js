class InputHandler{
    constructor(ball){
        document.addEventListener('keydown', event => {

            switch(event.keyCode){
                case 32:
                    ball.move();
                    break;
            };

        })
    }
}