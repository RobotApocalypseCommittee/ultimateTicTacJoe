import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';

import PlayGrid from './components/PlayGrid.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p> header - menus and shit </p>
          <h1 className="App-title">Welcome to ULTIMATE TIC TAC TOE</h1>
        </header>
        <div className="main">
          Main grids and menus and gameplay stuff goes here
        </div>
        <PlayGrid />
      </div>
    );
  }
}

export default App;
