class OnlineMode{
    constructor(snakeObject, socket){
        this.socket = socket;
        this.snakeObject = snakeObject;
    }

    onSecondSnake(callback){
        this.socket.on('player-snake', callback);
    }

    sendSnake(){
        this.socket.emit("player-snake", this.snakeObject.snakeBody);
    }
}