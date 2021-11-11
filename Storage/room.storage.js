module.exports = {
    rooms: {},

    // USABLES
    create: function (roomID, username) {
        this.rooms[roomID] = [username];
        return true;
    },

    join: function (roomID, username) {
        if(this.canJoin(roomID, username)){
            this.rooms[roomID].push(username);
            return true;
        }
        return false;
    },

    leave: function (roomID, username) {
        this.rooms[roomID] = this.rooms[roomID].filter(user => user !== username);
        this.deleteRoom(roomID);
    },

    // UTILS
    canJoin: function (roomID, username) {
        if(this.rooms[roomID] && !this.rooms[roomID].includes(username) && this.rooms[roomID].length < 2){
            return true;
        }
        return false;
    },

    deleteRoom: function (roomID) {
        if(this.rooms[roomID].length === 0){
            delete this.rooms[roomID];
        }
    },
    
    getRoom: function (roomID) {
        return this.rooms[roomID];
    }
}