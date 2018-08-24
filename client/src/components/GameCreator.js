import React, {Component} from 'react';
import communicator from '../Communicator';

export default class GameCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      XOValue: 0,
      gridLockState: 0,
      joinCode: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.createGame = this.createGame.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this)
    this.joinGame = this.joinGame.bind(this)
  }

  createGame() {
    communicator.createGame(this.state.XOValue, this.state.gridLockState);
    console.log("Creating game with selected %s", this.state.XOValue);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = parseInt(event.target.value, 10);
    this.setState({
      [name]: value
    })
  }

  handleInputChange(event) {
    this.setState({
      joinCode: event.target.value
    })
  }

  joinGame() {
    window.location.search = "?" + this.state.joinCode
  }

  render() {
    return (
      <div style={{textAlign: "left", margin: "2em"}}>
        <form>
          <h4>Create Game</h4>
          <div className="row">
            <div className="six columns">
              <label htmlFor="xoselect">Your Letter</label>
              <select name="XOValue" value={this.state.XOValue} onChange={this.handleChange} className="u-full-width"
                      id="xoselect">
                <option value="0">X</option>
                <option value="1">O</option>
                <option value="2">Random</option>
              </select>
            </div>
            <div className="six columns">
              <label htmlFor="subgridcompletionselect">When is a subgrid locked?</label>
              <select name="gridLockState" value={this.state.gridLockState} onChange={this.handleChange}
                      className="u-full-width" id="subgridcompletionselect">
                <option value="1">When won</option>
                <option value="0">When full</option>
              </select>
            </div>
          </div>

          <button className="button-primary" type="button" onClick={this.createGame}>Create Game</button>
        </form>
        <form>
          <h4>Join Game</h4>
          <div className="row">
            <div className="twelve columns">
              <label htmlFor="joincodeentry">Game Code</label>
              <input type="text" className="u-full-width" id="joincodeentry" value={this.state.joinCode}
                     onChange={this.handleInputChange}/>
            </div>
          </div>
          <button className="button-primary" type="button" onClick={this.joinGame}>Join Game</button>
        </form>
      </div>
    )
  }
}
