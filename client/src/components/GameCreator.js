import React, {Component} from 'react';
import communicator from '../sockface';

export default class GameCreator extends Component {
  createGame() {
    communicator.createGame(this.state.XOValue);
    console.log("Creating game with selected %s", this.state.XOValue);
  }
  handleXOChange(event) {
    this.setState({XOValue: parseInt(event.target.value, 10)})
  }
  render(){
    return (
        <div>
          <select value={this.state.XOValue} onChange={this.handleXOChange}>
            <option value="0">X</option>
            <option value="1">O</option>
            <option value="2">Random</option>
          </select>
          <button className="button-primary" onClick={this.createGame}>Create Game</button>
        </div>
    )
  }

  constructor(props) {
    super(props);
    this.state = {
      XOValue: 0
    };
    this.handleXOChange = this.handleXOChange.bind(this);
    this.createGame = this.createGame.bind(this);
  }
}