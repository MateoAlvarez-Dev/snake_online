socket.on("create-user", onRegisterName);

socket.on("page-loaded", addMultipleRooms);

socket.on("refresh-list", refreshList);

socket.on("create-room", addRoom);

socket.on("room-created", onCreateGame);

socket.on("joined", startGame);