import React, {Component} from 'react';
import PlayGridWithSubscription from "./PlayGrid";
import ReactModal from 'react-modal';
import GameStatusBar from "./GameStatusBar";
import gameState from "../GameState"
import {gameEndings} from "../GameStates";
import {reload} from "../utils";

class GameView extends Component {

  render() {
    return (
      <React.Fragment>
        <GameStatusBar code={this.props.matchID} state={this.props.status}/>
        <PlayGridWithSubscription/>
        <WrappedGameEndDialog/>
      </React.Fragment>
    )
  }
}

function GameEndDialog(props) {
  let title, paragraph;
  if (props.ending === gameEndings.WIN) {
    title = "You have WON!";
    paragraph = "You beat the other player in ULTIMATE TIC TAC TOE!\nReload to continue your winning streak.";
  } else if (props.ending === gameEndings.LOSS) {
    title = "You have lost.";
    paragraph = "You were beaten by another player in ultimate tic tac toe.\nReload to get your revenge.";
  } else if (props.ending === gameEndings.DISCONNECTION) {
    title = "The other player disconnected.";
    paragraph = "The other player feared your might to such an extent that they fled.\nReload to find a braver opponent.";
  } else {
    title = "DONT LOOK";
    paragraph = "You shouldn't be seeing this.";
  }
    return (
      <ReactModal isOpen={props.ending !== gameEndings.UNENDED} contentLabel="Game Ended" ariaHideApp={false}>
        <h1>{title}</h1>
        <p>{paragraph}</p>
        <button onClick={reload}>Reload</button>
      </ReactModal>
    )

}

const WrappedGameEndDialog = gameState.subscribe(["ending"], GameEndDialog);

export default gameState.subscribe(["status", "matchID"], GameView);
