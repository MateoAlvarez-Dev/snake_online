class GameCreator {
    constructor(renderContainer, socket) {
        this.direction = "down";
        this.matrix = new Matrix(15).matrix;
        this.snake = new Snake(this.matrix);
        this.gameDisplay = new GameRender({
            arr: this.matrix,
            snake: this.snake,
            onlineClass: OnlineMode,
            socket,
            renderContainer
        });
    }

    start() {
        if(this.gameDisplay.snakeObject.isAlive){
            this.gameDisplay.changeDirection();
            this.gameDisplay.createButtons();
            this.gameDisplay.render();
            this.startUpdate();
        }else{
            this.clearUpdate();
            alert("Perdiste");
        }
    }

    startUpdate() {
        this.interval = setInterval(() => {
            if(this.gameDisplay.snakeObject.isAlive){
                this.gameDisplay.update(this.direction);
            }else{
                this.clearUpdate();
                alert("Perdiste, saliendo");
                setTimeout(() => {
                    window.location.reload();
                }, 3000)
            }
        }, 100);
    }

    clearUpdate(){
        clearInterval(this.interval);
    }
}