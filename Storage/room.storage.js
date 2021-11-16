module.exports = {
    rooms: {},
    users: [],


    // USERS - METHODS
    createUser(username){
        this.users.push(username);
    },

    userLeave(username){
        this.users = this.users.filter(el => el !== username);
    },

    canCreateUser(username){
        return !this.users.includes(username);
    },


    // ROOMS - METHODS
    create(roomID, username) {
        this.rooms[roomID] = [username];
        return true;
    },

    join(roomID, username) {
        if(this.canJoin(roomID, username)){
            this.rooms[roomID].push(username);
            return true;
        }
        return false;
    },

    leave(roomID, username) {
        this.rooms[roomID] = this.rooms[roomID].filter(user => user !== username);
        this.deleteRoom(roomID);
    },

    // UTILS
    canJoin(roomID, username) {
        if(this.rooms[roomID] && !this.rooms[roomID].includes(username) && this.rooms[roomID].length < 2){
            return true;
        }
        return false;
    },

    deleteRoom(roomID) {
        if(this.rooms[roomID].length === 0){
            delete this.rooms[roomID];
        }
    },
    
    getRoom(roomID) {
        return this.rooms[roomID];
    }
}