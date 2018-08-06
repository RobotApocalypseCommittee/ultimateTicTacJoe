// A class to hold a match
const shortid = require("shortid");
const users = require("./user_store");
const matches = require("./matches");
const UTTTLogic = require("./UTTTLogic");

class Match {
  constructor(XOPolicy) {
    this.id = shortid.generate();
    this.board = UTTTLogic.generateEmptyBoard();
    this.next_move_criteria = null;
    this.playerIDs = [];

    switch (XOPolicy) {
      case 0:
        this.playerLetters = ["X", "O"];
        break;
      case 1:
        this.playerLetters = ["O", "X"];
        break;
      default:
        this.playerLetters = Math.random() >= 0.5 ? ["X", "O"] : ["O", "X"];
    }

  }

  broadcast(event, data) {
    for (let i = 0; i < this.playerIDs.length; i++) {
      users.get_user(this.playerIDs[i]).emit(event, data);
    }
  }

  players_on(event, callback) {
    for (let i = 0; i < this.playerIDs.length; i++) {
      users.get_user(this.playerIDs[i]).on(event, callback)
    }
  }

  add_player(playerID) {
    if (this.playerIDs.length < 2) {
      this.playerIDs.push(playerID);
      let replyPacket = {
        matchID: this.id,
        playerIndex: this.playerIDs.length - 1,
        playerLetter: this.playerLetters[this.playerIDs.length - 1]
      };
      // Notify user about game join
      users.get_user(playerID).emit("joined-game", replyPacket);
      // If user disconnects, game stops, and other user notified
      users.get_user(playerID).on("disconnect", () => {
        this.playerIDs.splice(this.playerIDs.indexOf(playerID), 1);
        this.broadcast("ended-game", {
          type: "disconnect",
          playerIndex: this.playerIDs.indexOf(playerID)
        });
        this.destroy();
      })
    } else {
      users.get_user(playerID).emit("invalid-operation", {
        type: "match-full",
        message: "You were too slow, and this match is already full."
      })
    }
  }

  begin_game() {
    this.broadcast("begin-game");
    this.players_on("turn-done", this.process_turn.bind(this));
    this.next_move_criteria = {
      playerIndex: 0,
      mainIndex: -1
    };
    this.broadcast("next-turn", this.next_move_criteria);

  }


  process_turn(turn_object) {
    console.log("Processing turn");
    turn_object.playerIndex = this.playerIDs.indexOf(turn_object.playerID);
    if (UTTTLogic.validateMove(this.board, this.next_move_criteria, turn_object)) {
      console.log("Valid turn received!");
      this.board.subGrids[turn_object.mainIndex][turn_object.subIndex] = turn_object.playerIndex;
      UTTTLogic.updateBoardWins(this.board);
      this.broadcast("updated-board", this.board);
      if (UTTTLogic.checkWin(this.board)) {
        let winPacket = {
          type: "win",
          playerIndex: UTTTLogic.getWin(this.board).winner
        };
        this.broadcast("ended-game", winPacket);
        this.destroy();
        return;
      }
      this.next_move_criteria = UTTTLogic.calculateNextCriteria(this.board, turn_object);
      this.broadcast("next-turn", this.next_move_criteria);
    } else {
      users.get_user(this.playerIDs[this.next_move_criteria.playerIndex]).emit("invalid-operation", {
        type: "invalid-move",
        message: "That move is invalid."
      })
    }
  }

  destroy() {
    for (let i = 0; i < this.playerIDs.length; i++){
      users.get_user(this.playerIDs[i]).removeAllListeners("turn-done")
    }
    matches.remove_match(this.id);
  }
}

module.exports = Match;