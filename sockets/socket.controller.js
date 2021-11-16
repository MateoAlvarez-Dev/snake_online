module.exports = (socket, io) => {
    const { v4: uuidv4 } = require('uuid');
    const newID = () => uuidv4();
    const roomStorage = require('./../Storage/room.storage');

    return {
        createUser(username){
            if(roomStorage.canCreateUser(username)){
                roomStorage.createUser(username);
                socket.emit("create-user", username);
            }
        },
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

                socket.to(socket.gameInfo.roomKey).emit("disconnected");

                roomStorage.leave(socket.gameInfo.roomKey, socket.gameInfo.username);
                roomStorage.userLeave(socket.gameInfo.username);

                io.emit("refresh-list", roomStorage.rooms);

            }
        }
    };
}