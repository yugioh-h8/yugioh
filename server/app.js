const express = require("express")();
const http = require("http").Server(Express);
const socketio = require("socket.io")(Http);
const PORT = process.env.PORT || 3000;

var position = {
  poinPlayer1: 0,
  poinPlayer2: 0
};

var gameStart = {
  startGame1 : false,
  startGame2 : false,
}

Socketio.on("connection", socket => {
  socket.emit("position", position);

  socket.emit("start", gameStart);

  socket.on("move", data => {
    switch(data) {
      case "playerOneClick":
        position.poinPlayer1 += data;
        if (position.poinPlayer1 >= 100) {
          gameStart.startGame1 = false;
          gameStart.startGame2 = false;

          Socketio.emit("finish", position);
        }
        Socketio.emit("position", position);
        break;
      case "playerTwoClick":
        position.poinPlayer2 += data;
        if (position.poinPlayer2 >= 100) {
          gameStart.startGame1 = false;
          gameStart.startGame2 = false;

          Socketio.emit("finish", position);
        }
        Socketio.emit("position", position);
        break;
      }
  });

  socket.on("gameStart", data => {
    switch(data) {
      case "playerOneReady":
        gameStart.startGame1 = true;
        position.poinPlayer1 = 0;
        position.poinPlayer2 = 0;
        Socketio.emit("start", gameStart);
        break;
      case "playerTwoReady":
        gameStart.startGame2 = true;
        position.poinPlayer2 = 0;
        position.poinPlayer1 = 0;
        Socketio.emit("start", gameStart);
        break;
    }
  })
});


Http.listen(PORT, () => {
    console.log(`Listening at ${PORT}:...`);
});
