class GameCreator {
    constructor(renderContainer, socket) {
        this.direction = "down";
        this.matrix = new Matrix(15).matrix;
        this.snake = new Snake(this.matrix);
        this.socket = socket;
        this.gameDisplay = new GameRender({
            arr: this.matrix,
            snake: this.snake,
            onlineClass: OnlineMode,
            socket,
            renderContainer
        });
    }

    start() {
        this.gameDisplay.changeDirection();
        this.gameDisplay.createButtons();
        this.gameDisplay.render();
        this.startUpdate();
    }

    onPlayerLeave(cback){
        this.socket.on('disconnected', cback);
    }

    startUpdate() {
        this.interval = setInterval(() => {
            if(this.gameDisplay.snakeObject.isAlive){
                this.gameDisplay.update(this.direction);
            }else{
                this.clearUpdate();
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