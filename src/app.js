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
    if (packet[1].playerID !== id) {
      next(new Error("Invalid userID!"));
    } else {
      return next();
    }
  });
    socket.emit("user-registered", {
        playerID: id
    });
  console.log("User %s connected.", id);

    socket.on("create-game", function(data){
        let new_match = new Match(data.XOProtocol);
        matches.add_match(new_match);
        new_match.add_player(data.playerID);
      console.log("Player %s created match %s", data.playerID, new_match.id);
    });
    socket.on("join-game", function (data) {
        let match = matches.get_match(data.matchID);
      if (match) {
        match.add_player(data.playerID);
        console.log("Player %s joined match %s", data.playerID, match.id);
        // An assumption
        match.begin_game();

      } else {
        console.error("Could not find match %s", data.matchID);
      }
    });
});

module.exports = app;