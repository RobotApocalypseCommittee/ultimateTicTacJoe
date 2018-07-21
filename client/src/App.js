import React, {Component} from 'react';
import './App.css';

import GameView from "./components/GameView";
import GameCreator from './components/GameCreator'
import communicator from "./sockface";
import gamestate from "./GameState";
import gameStates from "./GameStates";
import ReactModal from 'react-modal';


class App extends Component {
  constructor(props) {
    super(props);
    communicator.subscribeToRegistration((userID) => {
      if (window.location.hash) {
        communicator.joinGame(window.location.hash.substring(1));
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
        <ReactModal isOpen={this.props.status === gameStates.DISCONNECTED} contentLabel="Connection Failed"
                    ariaHideApp={false}>
          <p>We cannot connect to the server, and so you cannot play :(</p>
          <p>Reload to attempt a reconnection</p>
          <button onClick={window.location.reload}>Reload</button>
        </ReactModal>
      </div>

    );
  }
}

export default gamestate.subscribe(["status"], App);
