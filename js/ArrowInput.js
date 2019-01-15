/** Class representing the input handler of an arrow. */
class ArrowInputHandler{
    /**
     * Creates an ArrowInputHandler.
     * @param {Arrow} arrow - the arrow.
     * @param {Ball} ball - one of the balls.
     */
    constructor(arrow, ball){
        document.addEventListener('keydown', event => {

            switch(event.key){
                /**
                 * Rotates the arrow to the left when the left arrow key is pressed.
                 */
                case "ArrowLeft":
                    if(!ball.isMoving()){
                        arrow.rotateLeft();
                    };
                break;

                /**
                 * Rotates the arrow to the right when the right arrow key is pressed.
                 */
                case "ArrowRight":
                    if(!ball.isMoving()){
                        arrow.rotateRight();
                    };
                break;
            };
        })
    }
}
