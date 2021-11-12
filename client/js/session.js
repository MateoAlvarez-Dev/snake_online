let isJoined = false;

(() => {
    socket.emit("page-loaded", {});
})();


function startGame(data){
    isJoined = true;
    
    document.querySelector(".menu").style.display = "none";

    new GameCreator(document.querySelector(".render"), socket).start();
}


function registerName(e){
    if(e.which === 13){
        let inputValue = e.target.value;
        if(inputValue && inputValue.length > 4){
            window.username = inputValue;
            e.target.setAttribute("disabled", "true");
        }else{
            alert("El nombre debe tener mas de 4 caracteres");
        }
    }
}


function Login(done){
    if(window.username)
        return done(username);
    else
        alert("No hay nombre de usuario");
}


function joinGame(roomName){
    Login((myName) => {
        if(!isJoined){
            socket.emit("joinRoom", { username: myName, roomKey: roomName });
        }else{
            if(confirm("Tienes que salir de la sesion actual para poder entrar a otra, Salir?")) {
                window.location.reload();
            }
        }
    });
}


function createGame(){
    Login((myName) => {
        if(!isJoined){
            socket.emit("create-room", myName);
            document.querySelectorAll("button").forEach(el => el.setAttribute("disabled", "true"));
        }else{
            if(confirm("Tienes que salir de la sesion actual para poder entrar a otra, Salir?")){
                window.location.reload();
            }
        }
    });
}


function addRoom(gameInfo){
    let div = document.createElement("div");
    let gameList = document.querySelector(".game-list");
    let template = `
    <h3>GAME</h3>
    <p>
      PLAYERS: ${gameInfo.players.join("")}
    </p>
    <button onclick="joinGame('${gameInfo.roomKey}')">JOIN</button>`;
    
    div.innerHTML = template;
    div.className = "game-div";
    gameList.append(div);
}


function addMultipleRooms(rooms){
    let keys = Object.keys(rooms)
    keys.forEach(key => {
        addRoom({ roomKey: key, players: rooms[key] });
    })
}


function refreshList(rooms){
    let gameList = document.querySelector(".game-list");
    gameList.innerHTML = "";
    addMultipleRooms(rooms);
}


socket.on("page-loaded", addMultipleRooms);

socket.on("refresh-list", refreshList);

socket.on("create-room", addRoom);

socket.on("joined", startGame);