import React, {Component} from 'react';
import './App.css';

import GameView from "./components/GameView";
import GameCreator from './components/GameCreator'
import communicator from "./sockface";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: null,
      matchID: null,
      playerIndex: null,
      letterSet: null
    };
    communicator.subscribeToRegistration((userID)=>this.setState({userID}));
    if (window.location.hash) {
      this.state.gameID=window.location.hash.substring(1);
    }
    communicator.subscribeToJoin((playerIndex, playerLetter, matchID)=>{
      let letterSet = ["X", "O"];
      if (playerLetter === "O") letterSet.reverse();
      if (playerIndex === 1) letterSet.reverse();
      this.setState({matchID, playerIndex, letterSet});
    })
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <p> header - menus and shit </p>
            <h1 className="App-title">Welcome to ULTIMATE TIC TAC TOE</h1>
          </header>
          { this.state.matchID === null
              ? <GameCreator/>
              : <GameView matchID={this.state.matchID} playerIndex={this.state.playerIndex} letterSet={this.state.letterSet}/>
          }
        </div>
    );
  }
}

export default App;
