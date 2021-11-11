class Snake {
    constructor(map) {
        // worm point { x: pos, y: pos }
        this.map = map;
        this.mapSize = map.length;
        this.snakeBody = [{ id: "main", x: Math.floor(Math.random() * this.mapSize), y: 2, direction: "down", type: "worm-body" }];
        this.breakPoints = [];
        this.isAlive = true;
    }

    incrementSize() {
        const lastElement = this.snakeBody[this.snakeBody.length - 1];
        const direction = lastElement.direction;

        switch (direction) {
            case 'down':
                this.push(lastElement["x"], lastElement["y"] - 1, direction);
                break;
            case 'up':
                this.push(lastElement["x"], lastElement["y"] + 1, direction);
                break;
            case 'left':
                this.push(lastElement["x"] + 1, lastElement["y"], direction);
                break;
            case 'right':
                this.push(lastElement["x"] - 1, lastElement["y"], direction);
                break;
        }
    }

    incrementPosition(index, x, y, updatedMap) {
        if ((x >= 0 && y >= 0) && (x <= this.mapSize - 1 && y <= this.mapSize - 1)) {

            this.snakeBody[index].x = x;
            this.snakeBody[index].y = y;

        }else{
            this.isAlive = false;
        }
    }

    push(x, y, direction) {
        this.snakeBody.push({ x, y, direction, type: 'worm-body' });
    }

    createBreakpoint() {
        if(this.snakeBody.length > 1){
            this.breakPoints.push({ x: this.snakeBody[0].x, y: this.snakeBody[0].y, direction: this.snakeBody[0].direction });
        }
    }

    die(){
        this.isAlive = false;
    }

}