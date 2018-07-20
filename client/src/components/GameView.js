import React, {Component} from 'react';
import PlayGridWithSubscription from "./PlayGrid";
import ReactModal from 'react-modal';
import GameStatusBar from "./GameStatusBar";
import gameState from "../GameState"


class GameView extends Component {

  render() {
    let url = window.location.protocol + "//" + window.location.host + "/#" + this.props.matchID;
    return (
      <div>
        <GameStatusBar url={url} state={this.props.status}/>
        <PlayGridWithSubscription hello={"hi"}/>
        <GameEndDialog isOpen={this.props.gameEnded} text={"hi"}/>
      </div>
    )
  }
}

class GameEndDialog extends Component {
  render() {
    return (
      <ReactModal isOpen={this.props.isOpen} contentLabel="Game Ended"  ariaHideApp={false}>
        <p>{this.props.text}</p>
        <button onClick={window.location.reload}>New Game</button>
      </ReactModal>
    )
  }
}

export default gameState.subscribe(["status", "matchID"], GameView);