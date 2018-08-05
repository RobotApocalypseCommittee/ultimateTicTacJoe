import React, {Component} from 'react';
import './App.css';

import GameView from "./components/GameView";
import GameCreator from './components/GameCreator'
import communicator from "./Communicator";
import gamestate from "./GameState";
import gameStates from "./GameStates";
import ReactModal from 'react-modal';
import {reload} from './utils';

class App extends Component {
  constructor(props) {
    super(props);
    communicator.subscribeToRegistration((userID) => {
      if (window.location.search) {
        communicator.joinGame(window.location.search.substring(1));
      }
    });

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to ULTIMATE TIC TAC TOE</h1>
        </header>
        {this.props.status === gameStates.PREGAME || this.props.status === gameStates.DISCONNECTED
          ? <GameCreator/>
          : <GameView/>
        }

        <WrappedErrorDialog/>
      </div>
    );
  }
}

function ErrorDialog(props) {
  if (props.error !== null) {
    return <ReactModal isOpen={props.error !== null} contentLabel="Game Error" ariaHideApp={false}>
      <p>{props.error.message}</p>
      <button onClick={reload}>Reload</button>
    </ReactModal>
  } else {
    return null;
  }
}
const WrappedErrorDialog = gamestate.subscribe(["error"], ErrorDialog);

export default gamestate.subscribe(["status"], App);
