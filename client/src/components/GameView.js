import React, {Component} from 'react';
import PlayGrid from "./PlayGrid";
import ReactModal from 'react-modal';
import GameStatusBar from "./GameStatusBar";


export default class GameView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let url = window.location.protocol + "//" + window.location.host + "/#" + this.props.matchID;
    return (
      <div>
        <GameStatusBar url={url} state={1}/>
        <PlayGrid/>
        <GameEndDialog isOpen={this.props.gameEnded} text={"hi"}/>
      </div>
    )
  }
}

class GameEndDialog extends Component {
  render() {
    return (
      <ReactModal isOpen={this.props.isOpen} contentLabel="Game Ended">
        <p>{this.props.text}</p>
        <button onClick={window.location.reload}>New Game</button>
      </ReactModal>
    )
  }
}