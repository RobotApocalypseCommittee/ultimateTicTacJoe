// SOCKetinterFACE
// Contains code which handles most (basic) socket functionality
// NOT for game logic

import io from 'socket.io-client';

class Communicator {
  constructor(){
    this.playerID = null;
    this.socket = io("ws://" + window.location.host, {
      reconnection: false
    });
    window.io = this.socket;
    console.log("Connected Socket");
    this.subscribeToRegistration((id)=> this.playerID = id);
  }
  subscribeToRegistration(cb) {
    this.socket.on("user-registered", (obj)=>cb(obj.playerID));
  }
  subscribeToJoin(cb) {
    this.socket.on("joined-game", (obj)=>cb(obj.playerIndex, obj.playerLetter, obj.matchID));
  }
  subscribeToBoardUpdate(cb) {
    this.socket.on("updated-board", cb);
  }
  subscribeToDisconnect(cb){
    this.socket.on("disconnect", cb);
  }
  subscribeToBeginGame(cb){
    this.socket.on("begin-game", cb);
  }
  subscribeToTurnChange(cb){
    this.socket.on("next-turn", (obj)=>cb(obj.playerIndex, obj.mainIndex));
  }
  subscribeToEndGame(cb){
    this.socket.on("ended-game", (obj)=>cb(obj.type, obj.playerID))
  }

  emit(evtName, data){
    if (this.playerID !== null) {
      // Every packet must contain userID
      data.playerID = this.playerID;
      this.socket.emit(evtName, data);
      console.log("Emitted %s", evtName);
    } else {
      throw new Error("A playerID has not yet been assigned!");
    }
  }
  createGame(XOProtocol) {
    this.emit("create-game", {XOProtocol});
  }
  joinGame(matchID){
    this.emit("join-game", {matchID});
  }
  makeTurn(mainIndex, subIndex){
    this.emit("turn-done", {mainIndex, subIndex});
  }

}

export default new Communicator();