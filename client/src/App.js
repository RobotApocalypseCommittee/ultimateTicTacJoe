import React, {Component} from 'react';
import './App.css';

import GameView from "./components/GameView";
import GameCreator from './components/GameCreator'
import communicator from "./sockface";
import gameStates, {gameEndings} from "./GameStates";
import {generateEmptyBoard} from "./utils";
import ReactModal from 'react-modal';

// TODO: Should probably be using redux, be CBA right now
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: null,
        matchID: null,
        playerIndex: null,
        letterSet: null,
        board: null,
        ending: gameEndings.UNENDED,
      status: gameStates.DISCONNECTED
    };
    communicator.subscribeToRegistration((userID) => {
      this.setState({userID, status: gameStates.PREGAME});
      if (window.location.hash) {
        communicator.joinGame(window.location.hash.substring(1));
      }
    });
    communicator.subscribeToJoin((playerIndex, playerLetter, matchID) => {
      let letterSet = ["X", "O"];
      if (playerLetter === "O") letterSet.reverse();
      if (playerIndex === 1) letterSet.reverse();
      this.setState({
          matchID,
          letterSet,
          playerIndex,
          board: generateEmptyBoard(),
        status: gameStates.PREGAMESTART
      });
    });
    communicator.subscribeToBoardUpdate((newBoard)=>{
      this.setState({board:newBoard});
    });
    communicator.subscribeToDisconnect(()=>{
      this.setState({status:gameStates.DISCONNECTED});
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to ULTIMATE TIC TAC TOE</h1>
        </header>
        {this.state.status === gameStates.PREGAME
          ? <GameCreator/>
          :
          <GameView
            matchID={this.state.matchID}
            playerIndex={this.state.playerIndex}
            letterSet={this.state.letterSet}
            status={this.state.status}
            board={this.state.board}
          />
        }
        <ReactModal isOpen={this.state.status === gameStates.DISCONNECTED} contentLabel="Connection Failed">
          <p>We cannot connect to the server, and so you cannot play :(</p>
          <p>Reload to attempt a reconnection</p>
          <button onClick={window.location.reload}>Reload</button>
        </ReactModal>
      </div>

    );
  }
}

export default App;
