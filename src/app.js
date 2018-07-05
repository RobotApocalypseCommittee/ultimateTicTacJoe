const app = require("express")();
const io = require("socket.io")();
app.io = io;
const matches = require("./matches");
const Match = require("./match");
const users = require("./user_store");
io.on("connection", (socket)=> {
    // Keep ID *TOP SECRET*
    let id = users.add_user(socket);
  socket.use((packet, next)=>{
    console.log("GOT PACKET");
    console.log(packet);
    if (packet[1].playerID !== id) {
      next(new Error("Invalid userID!"));
    } else {
      return next();
    }
  });
    socket.emit("user-registered", {
        playerID: id
    });

    socket.on("create-game", function(data){
      console.log("EXCITING");
        let new_match = new Match(data.XOProtocol);
        matches.add_match(new_match);
        new_match.add_player(data.playerID);
    });
    socket.on("join-game", function (data) {
        let match = matches.get_match(data.matchID);
        match.add_player(data.playerID);
        // An assumption
        match.begin_game();
    });
});

module.exports = app;