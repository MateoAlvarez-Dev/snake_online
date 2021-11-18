class GameRender extends GameInteractivity{
    constructor({ arr, snake, renderContainer, onlineClass, socket }) {
        super({ arr, snake });
        this.renderContainer = renderContainer;
        this.secondSnake = [];

        this.multiplayer = new onlineClass(snake, socket);
        this.multiplayer.onSecondSnake((snake) => this.secondSnake = snake);
        this.createMap();
    }

    // CUADRAR EN ESTA FUNCIÓN TODO LO NECESARIO PARA INICIAR LA OTRA SERPIENTE
    onLineSnake(){
        this.secondSnake.forEach(el => this.gameMap[el.y][el.x] = el);
    }

    createMap(){
        let table = document.createElement("table");
        table.className = "game_table";

        for (let i = 0; i < this.gameMap.length; i++) {

            let tr = document.createElement("tr");
            for (let x = 0; x < this.gameMap.length; x++) {
                let td = document.createElement("td");
                td.id = `${x}_${i}`;
                tr.append(td);
            }
            table.append(tr);

        }

        this.renderContainer.append(table);
    }
    
    render() {

        document.querySelectorAll("td").forEach(el => el.style.background = "none");

        this.snakeObject.snakeBody.forEach(el => {
            let x = el.x;
            let y = el.y;
            this.gameMap[y][x] = el;
            document.getElementById(`${x}_${y}`).style.background = "red";
        });

        this.secondSnake.forEach(el => {
            let x = el.x;
            let y = el.y;
            this.gameMap[y][x] = el;
            document.getElementById(`${x}_${y}`).style.background = "orange";
        });

        this.gameMap[this.fruit.y][this.fruit.x] = this.fruit;
        document.getElementById(`${this.fruit.x}_${this.fruit.y}`).style.background = "blue";

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
