// SOCKetinterFACE
// Contains code which handles most (basic) socket functionality
// NOT for game logic

import io from 'socket.io-client';

class Communicator {
  constructor(){
    this.playerID = null;
    this.socket = io(window.location.protocol + "//" + window.location.host);
    this.subscribeToRegistration((id)=> this.playerID = id);
  }
  subscribeToRegistration(cb) {
    this.socket.on("user-registered", (obj)=>cb(obj.playerID));
  }
  subscribeToJoin(cb) {
    this.socket.on("joined-game", (obj)=>cb(obj.playerIndex, obj.playerLetter, obj.matchID));
  }
  emit(evtName, data){
    if (this.playerID !== null) {
      // Every packet must contain userID
      data.playerID = this.playerID;
      this.socket.emit(evtName, data);
      console.log("Emitted %s", evtName);
    } else {
      throw "A playerID has not yet been assigned!";
    }
  }
  createGame(XOProtocol) {
    this.emit("create-game", {XOProtocol});
  }
  joinGame(matchID){
    this.emit("join-game", {matchID});
  }

}

export default new Communicator();