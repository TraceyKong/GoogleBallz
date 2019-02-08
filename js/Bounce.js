/** Class representing the handler of bouncings */
class Bounce{
    /**
     * Creates Bounce.
     * @param {Canvas} canvas 
     * @param {Cells 2D array} cells
     * @param {number} radius 
     */
    constructor(canvas, cells, radius){
        this.canvas = canvas;
        this.cells = cells;
        this.radius = radius;
    }

    /**
     * Tells whether the ball is touching the bottom of the canvas.
     * @param {Position} position - position of a ball.
     * @return {boolean} true if the ball is touching the bottom of the canvas, false otherwise.
     */
    bottomTouched(position){ return position.getY() >= this.canvas.getHeight() - this.radius; }

    /**
     * Handles the bouncings against the walls.
     * @param {Position} position - position of a ball.
     * @param {Movement} movement - movement of the ball.
     */
    bounceWall(position, movement){
        if(position.getX() < this.radius || position.getX() > this.canvas.getWidth() - this.radius){
            movement.reverseX();
        }
        if(position.getY() < this.radius) movement.reverseY();
    }

    /**
     * Handles the bouncings against the cells.
     * @param {Position} position - position of a ball.
     * @param {Movement} movement - movement of the ball.
     */
    bounceCells(position, movement){
        var surroundingCells = this._getSurroundingCells(position, movement);

        //bounce off edges
        if(surroundingCells[0] != null && surroundingCells[0].isActive()){
            if(this._hitCellOnSameRow(position, surroundingCells[0])){
                movement.reverseX();
                surroundingCells[0].decreasePower();
            }else if(surroundingCells[1] != null && surroundingCells[1].isActive()){
                if(this._hitCellOnSameColumn(position, surroundingCells[1])){
                    movement.reverseY();
                    surroundingCells[1].decreasePower();
                }
            }else if(surroundingCells[2] != null && surroundingCells[2].isActive()){
                if(this._hitCellOnSameRow(position, surroundingCells[2])){
                        movement.reverseX();
                        surroundingCells[2].decreasePower();
                }else if(this._hitCellOnSameRow(position, surroundingCells[0])){
                    movement.reverseX();
                    surroundingCells[0].decreasePower();
                }
            }
        }else if(surroundingCells[1] != null && surroundingCells[1].isActive()){
            if(this._hitCellOnSameColumn(position, surroundingCells[1])){
                movement.reverseY();
                surroundingCells[1].decreasePower();
            }else if(surroundingCells[2] != null && surroundingCells[2].isActive()){
                if(this._hitCellOnSameColumn(position, surroundingCells[2])){
                        movement.reverseY();
                        surroundingCells[2].decreasePower();
                    }
            }
        }else if(surroundingCells[2] != null && surroundingCells[2].isActive()){
            if(this._hitCellOnSameRow(position, surroundingCells[2])){
                movement.reverseX();
                surroundingCells[2].decreasePower();
            }else if(this._hitCellOnSameColumn(position, surroundingCells[2])){
                movement.reverseY();
                surroundingCells[2].decreasePower();
            }
        }
    }

    _getSurroundingCells(position, movement){
        var cellRow = undefined;
        var cellCol = undefined;
        for(var row = 0; row < this.cells.length; row++){
            if(position.getY() > this.cells[row][0].getTop() - 1 &&
                position.getY() < this.cells[row][0].getBottom() + 1){
                    for(var col = 0; col < this.cells[row].length; col++){
                        if(position.getX() > this.cells[row][col].getLeft() - 1 &&
                            position.getX() < this.cells[row][col].getRight() + 1){
                                cellRow = row;
                                cellCol = col;
                            }
                    }
            }
        }

        var surroundingCells = [];

        if(cellRow != undefined && cellCol != undefined){
            if(movement.getDx() <= 0){
                if(cellCol > 0){
                    //cell 1
                    surroundingCells.push(this.cells[cellRow][cellCol-1]);
                    if(movement.getDy() <= 0 && cellRow > 0){
                        surroundingCells.push(this.cells[cellRow-1][cellCol]);//cell 2
                        surroundingCells.push(this.cells[cellRow-1][cellCol-1]);//cell 3
                    }else if(movement.getDy() >= 0 && cellRow < this.cells.length - 1){
                        surroundingCells.push(this.cells[cellRow+1][cellCol]);//cell 2
                        surroundingCells.push(this.cells[cellRow+1][cellCol-1]);//cell 3
                    }else{
                        surroundingCells.push(null);
                        surroundingCells.push(null);
                    }
                }else{
                    //no cell 1
                    surroundingCells.push(null);
                    if(movement.getDy() <= 0 && cellRow > 0){
                        surroundingCells.push(this.cells[cellRow-1][cellCol]);//cell 2
                        surroundingCells.push(null);//no cell 3
                    }else if(movement.getDy() >= 0 && cellRow < this.cells.length - 1){
                        surroundingCells.push(this.cells[cellRow+1][cellCol]);//cell 2
                        surroundingCells.push(null);//no cell 3
                    }else{
                        surroundingCells.push(null);//no cell 2
                        surroundingCells.push(null);//no cell 3
                    }
                }   
            }else{
                if(cellCol < this.cells.length - 1){
                    //cell 1
                    surroundingCells.push(this.cells[cellRow][cellCol+1]);
                    if(movement.getDy() <= 0 && cellRow > 0){
                        surroundingCells.push(this.cells[cellRow-1][cellCol]);//cell 2
                        surroundingCells.push(this.cells[cellRow-1][cellCol+1]);//cell 3
                    }else if(movement.getDy() >= 0 && cellRow < this.cells.length - 1){
                        surroundingCells.push(this.cells[cellRow+1][cellCol]);//cell 2
                        surroundingCells.push(this.cells[cellRow+1][cellCol+1]);//cell 3
                    }else{
                        surroundingCells.push(null);
                        surroundingCells.push(null);
                    }
                }else{
                    //no cell 1
                    surroundingCells.push(null);
                    if(movement.getDy() <= 0 && cellRow > 0){
                        surroundingCells.push(this.cells[cellRow-1][cellCol]);//cell 2
                        surroundingCells.push(null);
                    }else if(movement.getDy() >= 0 && cellRow < this.cells.length - 1){
                        surroundingCells.push(this.cells[cellRow+1][cellCol]);//cell 2
                        surroundingCells.push(null);
                    }else{
                        surroundingCells.push(null);
                        surroundingCells.push(null);
                    }
                }
            }
        }

        // for(var i = 0; i < surroundingCells.length; i++){
        //     if(surroundingCells[i] != null) surroundingCells[i].glow();
        // } 
        return surroundingCells;
    }

    _hitCellOnSameRow(position, cell){
        if(position.getY() > cell.getTop() + 2 && position.getY() < cell.getBottom() - 2)
            return position.getX() > cell.getLeft() - this.radius + 2 && position.getX() < cell.getRight() + this.radius - 2;
        return false;
    }

    _hitCellOnSameColumn(position, cell){
        if(position.getX() > cell.getLeft() + 2 && position.getX() < cell.getRight() - 2)
            return position.getY() > cell.getTop() - this.radius + 2 && position.getY() < cell.getBottom() + this.radius - 2;
        return false;
    }

}
