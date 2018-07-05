import React, {Component} from 'react';
import './App.css';

import GameView from "./components/GameView";
import GameCreator from './components/GameCreator'
import {subscribeToRegistration} from "./sockface";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: null,
      gameID: null
    };
    subscribeToRegistration((userID)=>this.setState({userID}));
    if (window.location.hash) {
      this.state.gameID=window.location.hash.substring(1);
    }
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <p> header - menus and shit </p>
            <h1 className="App-title">Welcome to ULTIMATE TIC TAC TOE</h1>
          </header>
          { this.state.gameID === null
              ? <GameCreator/>
              : <GameView gameID={this.state.gameID}/>
          }
        </div>
    );
  }
}

export default App;
