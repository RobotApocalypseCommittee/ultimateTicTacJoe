// A class to hold a match
const shortid = require("shortid");
const users = require("./user_store");
const matches = require("./matches");

class Match {
  constructor(XOPolicy) {
    this.id = shortid.generate();
    this.board = [];
    for (var i = 0; i < 9; i++) {
      var subsquare = [];
      for (var j = 0; j < 9; j++) {
        subsquare.push(-1);
      }
      this.board.push(subsquare);
    }
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
        this.broadcast("end-game", {
          type: "disconnect",
          playerID: this.playerIDs.indexOf(playerID)
        });
        this.destroy();
      })
    } else {
      console.error("Cannot add more than two players!");
      return false;
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

  update_next_move_criteria(last_turn) {
    let criteria = {};
    // Swap indexes
    criteria.playerIndex = this.playerIDs.indexOf(last_turn.playerID) ? 0 : 1;
    criteria.mainIndex = last_turn.subIndex;
    if (this.board[criteria.mainIndex].indexOf("-") === -1) {
      // If square full, user can select any square(-1)
      criteria.mainIndex = -1;
    }
    this.next_move_criteria = criteria;
    return criteria;
  }

  was_valid_turn(turn_object) {
    return (
        // Correct Player made turn
        turn_object.playerIndex === this.next_move_criteria.playerIndex &&
        // Player is who they say they are
        turn_object.playerID === this.playerIDs[turn_object.playerIndex] &&
        // Player placed in correct main square
        (turn_object.mainIndex === this.next_move_criteria.mainIndex || this.next_move_criteria.mainIndex === -1) &&
        // Square was available for placement
        (this.board[turn_object.mainIndex][turn_object.subIndex] === -1)
    );
  }

  process_turn(turn_object) {
    if (this.was_valid_turn(turn_object)) {
      this.board[turn_object.mainIndex][turn_object.subIndex] = turn_object.playerIndex;
      this.broadcast("updated-board", this.board);
      if (this.checkForWins() !== -1) {
        let winPacket = {
          type: "win",
          playerID: this.checkForWins()
        };
        this.broadcast("ended-game", winPacket);
        this.destroy();
        return;
      }
      this.update_next_move_criteria(turn_object);
      this.broadcast("next-turn", this.next_move_criteria);
    }
  }

  destroy() {
    matches.remove_match(this.id);
  }
}

module.exports = Match;