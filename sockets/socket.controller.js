module.exports = (socket, io) => {
    const { v4: uuidv4 } = require('uuid');
    const newID = () => uuidv4();
    const roomStorage = require('./../Storage/room.storage');

    return {
        createRoom(username){
            var roomKey = newID();
            if(roomStorage.create(roomKey, username)){
                socket.join(roomKey);
                socket.gameInfo = { roomKey, username };
                socket.broadcast.emit("create-room", { roomKey, players: roomStorage.getRoom(roomKey) });
            }
        },
        pageLoaded(){
            socket.emit("page-loaded", roomStorage.rooms)
        },
        joinRoom({ roomKey, username }){
            if(roomStorage.join(roomKey, username)){
        
                socket.join(roomKey);
                socket.gameInfo = { roomKey, username };
                io.to(roomKey).emit("joined", roomKey);
    
            }
        },
        playerSnake(data){
            socket.broadcast.to(socket.gameInfo.roomKey).emit("player-snake", data);
        },
        disconnect(){
            if(socket.gameInfo){
                roomStorage.leave(socket.gameInfo.roomKey, socket.gameInfo.username);
                io.emit("refresh-list", roomStorage.rooms);
                console.log(roomStorage.rooms);
            }
        }
    };
}