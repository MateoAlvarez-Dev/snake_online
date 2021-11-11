class GameInteractivity {
    constructor({ arr, snake }) {
        this.gameMap = arr;
        this.snakeObject = snake; // Worm Class
        this.fruit = { x: Math.floor(Math.random() * this.gameMap.length), y: Math.floor(Math.random() * this.gameMap.length), type: 'fruit' };
    }

    // WORM MOVEMENT

    generateFruit(){
        let x = Math.floor(Math.random() * this.gameMap.length);
        let y = Math.floor(Math.random() * this.gameMap.length);
        this.fruit = { x, y, type: 'fruit' };
    }

    onEatFruit(snakeX, snakeY){
        if(snakeX === this.fruit.x && snakeY === this.fruit.y){
            this.generateFruit();
            this.snakeObject.incrementSize();
        }
    }

    moveOtherHeads() {
        let length = this.snakeObject.snakeBody.length;
        let breakPoints = this.snakeObject.breakPoints;

        for (let i = 1; i < length; i++) {
            let snakeHead = this.snakeObject.snakeBody[i];
            let snakeX = snakeHead.x;
            let snakeY = snakeHead.y;

            breakPoints.forEach(breakPoint => {
                let lastElement = this.snakeObject.snakeBody[length - 1];
                if (breakPoint && snakeX === breakPoint.x && snakeY === breakPoint.y){
                    
                    this.snakeObject.snakeBody[i].direction = breakPoint.direction;

                    if(breakPoint && lastElement.x === breakPoint.x && lastElement.y === breakPoint.y){

                        this.snakeObject.breakPoints.shift();
    
                    }
                    
                }
            })
            
            this.moveHead(i);
        }

    }

    moveHead(head) {
        let actualX = this.snakeObject.snakeBody[head]['x'];
        let actualY = this.snakeObject.snakeBody[head]['y'];
        let direction = this.snakeObject.snakeBody[head]['direction'];

        switch (direction) {
            case "down":
                this.snakeObject.incrementPosition(head, actualX, actualY + 1, this.gameMap);
                break;

            case "up":
                this.snakeObject.incrementPosition(head, actualX, actualY - 1, this.gameMap);
                break;

            case "left":
                this.snakeObject.incrementPosition(head, actualX - 1, actualY, this.gameMap);
                break;

            case "right":
                this.snakeObject.incrementPosition(head, actualX + 1, actualY, this.gameMap);
                break;
        }
    }

    createButtons(){
        let div = document.createElement("div");
        let divUp = document.createElement("div");
        let divOthers = document.createElement("div");

        let directions = ["up", "left", "right", "down"];

        directions.forEach(direction => {
            let button = document.createElement("button");
            button.onclick = () => this.assignDirection(direction);
            (direction === "up") ? divUp.append(button) : divOthers.append(button);
        })
        
        divUp.className = "upButton";
        divOthers.className = "otherButtons";

        div.className = "directions";
        div.append(divUp, divOthers);
        document.body.appendChild(div);
    }

    changeDirection() {
        window.addEventListener("keydown", (e) => {
            var ev = e.code;
            if(ev === "ArrowUp" || ev === "KeyW"){
                this.assignDirection("up");
            }
            else if(ev === "ArrowDown" || ev === "KeyS"){
                this.assignDirection("down");
            }
            else if(ev === "ArrowLeft" || ev === "KeyA"){
                this.assignDirection("left");
            }
            else if(ev === "ArrowRight" || ev === "KeyD"){
                this.assignDirection("right");
            }
        })
    }

    assignDirection(to){
        if(this.canChangeDirection(to)){
            this.snakeObject.snakeBody[0].direction = to;
            this.snakeObject.createBreakpoint();
        }
    }

    canChangeDirection(to){
        let actualDirection = this.snakeObject.snakeBody[0].direction;

        if((actualDirection === "up" && to === "down") || (actualDirection === "down" && to === "up")) 
            return false;
        
        else if((actualDirection === "left" && to === "right") || (actualDirection === "right" && to === "left"))
            return false;

        else if(actualDirection === to)
            return false;

        return true;
    }

    collision(x, y){
        // RECORDAR SOLUCIONAR EL BUG DE COLISION
        let updatedMap = this.gameMap;
        let direction = this.snakeObject.snakeBody[0].direction;

        switch (direction) {
            case "down":
                if(updatedMap[y + 1] && updatedMap[y + 1][x] !== undefined && updatedMap[y + 1][x].type === 'worm-body') this.snakeObject.isAlive = false;
                break;

            case "up":
                if(updatedMap[y - 1] && updatedMap[y - 1][x] !== undefined && updatedMap[y - 1][x].type === 'worm-body') this.snakeObject.isAlive = false;
                break;

            case "left":
                if(updatedMap[y][x - 1] !== undefined && updatedMap[y][x - 1].type === 'worm-body') this.snakeObject.isAlive = false;
                break;

            case "right":
                if(updatedMap[y][x + 1] !== undefined && updatedMap[y][x + 1].type === 'worm-body') this.snakeObject.isAlive = false;
                break;
        }
    }
}