function openSocketConnection(io){
    io.on("connection", (socket) => {

        let socketController = require('./socket.controller')(socket, io);

        socket.on("create-user", socketController.createUser);

        socket.on("create-room", socketController.createRoom);

        socket.on("page-loaded", socketController.pageLoaded);
    
        socket.on("joinRoom", socketController.joinRoom);
    
        socket.on("player-snake", socketController.playerSnake);
    
        socket.on("disconnect", socketController.disconnect);
    })
}

module.exports = openSocketConnection;