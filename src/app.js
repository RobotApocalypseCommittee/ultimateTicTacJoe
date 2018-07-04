const app = require("express")();
const io = require("socket.io")();
app.io = io;
const matches = require("./matches");
const users = require("./user_store");
io.on("connection", (socket)=> {
    // Keep ID *TOP SECRET*
    let id = users.add_user(socket);
    socket.emit("user-registered", {
        playerID: id
    });

    socket.on("create-game", function(fn){
        let new_match = matches.create_match();
        new_match.add_player(socket);
    });
    socket.on("join-game", function (id) {
        let match = matches.get_match(id);
        match.add_player(socket);
        // An assumption
        match.begin_game();
    });
});

module.exports = app;