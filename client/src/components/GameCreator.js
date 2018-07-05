import React, {Component} from 'react';

export default class GameCreator extends Component {
  createGame() {
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
          <button onClick={this.createGame}/>
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