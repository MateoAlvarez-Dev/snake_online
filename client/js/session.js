let isJoined = false;

(() => {
    socket.emit("page-loaded", {});
})();


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
})


function startAlertAudio(){
    let audio = document.getElementById("alert-audio");
    audio.currentTime = 0;
    audio.play();
}


function startInGameMusic(){
    let audio = document.getElementById("in-game-audio");
    audio.currentTime = 0;
    audio.play();
}


function startGame(){
    let count = 3;
    let countDiv = document.querySelector("#n-count");

    isJoined = true;
    
    document.querySelector(".menu").style.display = "none";
    countDiv.style.display = "initial";
    
    let interval = setInterval(() => {
        countDiv.innerText = count;
        if(count === 0){
            let actualGame = new GameCreator(document.querySelector(".render"), socket);

            actualGame.start(() => Swal.fire('YOU DIE!', 'Omg you died, bye bye!', 'error') /* PLAYER DIES CALLBACK */);
            actualGame.onPlayerLeave(() => createAlert("error", "The Player Lost and Leave the Game :("));

            startInGameMusic();
            clearInterval(interval);
        }
        count--;
    }, 1000)
}


function createAlert(icon, title){
    Toast.fire({
        icon: icon,
        title: title
    });
    startAlertAudio();
}


function registerName(e){
    if(e.which === 13){
        let inputValue = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "").replace(/[ ]+/g, "");
        if(inputValue && inputValue.length > 4){
            socket.emit("create-user", inputValue);
        }else{
            createAlert('error', 'The username need to have at least 4 characters');
        }
    }
}


function onRegisterName(username){
    window.username = username;
    document.querySelector("#usrname").setAttribute("disabled", "true");
    createAlert('success', 'You now have a username! :D');
}


function Login(done){
    if(window.username)
        return done(username);
    else
        createAlert('error', 'You dont have a username! :O');
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
        }else{
            if(confirm("Tienes que salir de la sesion actual para poder entrar a otra, Salir?")){
                window.location.reload();
            }
        }
    });
}


function onCreateGame(){
    document.querySelectorAll("button").forEach(el => el.setAttribute("disabled", "true"));
    createAlert('success', 'Game Created! :)');
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