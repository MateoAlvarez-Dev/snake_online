class GameRender extends GameInteractivity{
    constructor({ arr, snake, renderContainer, onlineClass, socket }) {
        super({ arr, snake });
        this.renderContainer = renderContainer;
        this.secondSnake = [];

        this.multiplayer = new onlineClass(snake, socket);
        this.multiplayer.onSecondSnake((snake) => this.secondSnake = snake);
    }

    // CUADRAR EN ESTA FUNCIÓN TODO LO NECESARIO PARA INICIAR LA OTRA SERPIENTE
    onLineSnake(){
        this.secondSnake.forEach(el => this.gameMap[el.y][el.x] = el);
    }

    addElementsToTheMap(){
        let fruit = this.fruit;
        this.snakeObject.snakeBody.forEach(el => this.gameMap[el.y][el.x] = el);
        this.secondSnake.forEach(el => this.gameMap[el.y][el.x] = el);
        this.gameMap[fruit.y][fruit.x] = fruit;
    }
    
    render() {
        let table = document.createElement("table");

        this.addElementsToTheMap();
        table.className = "game_table";

        for (let i = 0; i < this.gameMap.length; i++) {

            let tr = document.createElement("tr");
            for (let x = 0; x < this.gameMap.length; x++) {
                let td = document.createElement("td");

                (this.gameMap[i][x] != undefined && this.gameMap[i][x].type === "worm-body") ? td.style.background = "red" : "";
                (this.gameMap[i][x] != undefined && this.gameMap[i][x].type === "fruit") ? td.style.background = "blue" : "";

                td.id = `${x}_${i}`;
                tr.append(td);
            }
            table.append(tr);

        }

        if (this.renderContainer) {
            this.renderContainer.innerHTML = "";
        }

        this.renderContainer.append(table);
    }

    update() {
        this.clearArray();
        this.moveHead(0);
        this.moveOtherHeads();
        this.multiplayer.sendSnake();
        this.onEatFruit(this.snakeObject.snakeBody[0].x, this.snakeObject.snakeBody[0].y);
        //console.log(JSON.stringify(this.wormObject.breakPoints), this.wormObject.worm[this.wormObject.worm.length - 1]);
        this.render();
        this.collision(this.snakeObject.snakeBody[0].x, this.snakeObject.snakeBody[0].y, this.gameMap);
    }

    clearArray() {
        for (var i = 0; i < this.gameMap.length; i++) {
            this.gameMap[i] = new Array(this.gameMap.length);
        }
    }
}
