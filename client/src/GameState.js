import React, {Component} from "react";
import gameStates, {gameEndings} from "./GameStates";
import communicator from "./Communicator";
import {areEqualShallow} from "./utils";
import {generateEmptyBoard} from "./UTTLogic";

// TODO: Should probably be using redux, be CBA right now
// And yes, I did just implement a (worse) significant portion of redux-react etc.
class GameState {
  constructor() {
    this.subscribers = [];
    this.state = {
      userID: null,
      matchID: null,
      playerIndex: null,
      letterSet: null,
      turnCriteria: null,
      board: generateEmptyBoard(),
      ending: gameEndings.UNENDED,
      status: gameStates.WAITINGFORCONNECTION,
      error: null
    };
    communicator.subscribeToRegistration((userID) => {
      this.setState({userID, status: gameStates.PREGAME});
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
    communicator.subscribeToBoardUpdate((newBoard) => {
      this.setState({board: newBoard});
    });
    communicator.subscribeToDisconnect(() => {
      this.setState({
        error: {
          type: "disconnect",
          message: "We cannot connect to the server. Please try reloading, or waiting till later."
        }
      });
    });
    communicator.subscribeToTurnChange((playerIndex, mainIndex) => {
      if (playerIndex === this.state.playerIndex) {
        this.setState({
          turnCriteria: {mainIndex},
          status: gameStates.PERFORMINGTURN
        })
      } else {
        this.setState({
          status: gameStates.WAITFORTURN
        })
      }
    });
    communicator.subscribeToEndGame((type, playerIndex)=> {
      if (type === "win") {
        this.setState({
          ending: playerIndex === this.state.playerIndex ? gameEndings.WIN : gameEndings.LOSS,
          status: gameStates.GAMEENDED
        })
      } else {
        this.setState({
          ending: gameEndings.DISCONNECTION,
          status: gameStates.GAMEENDED
        });
      }
    });
    communicator.subscribeToError((type, message)=> {
      if (type !== "invalid-move") {
      this.setState({
        error: {
          type, message
        }
      })}
    })

  }

  setState(newState) {
    this.state = Object.assign(this.state, newState);
    this.emitUpdate();
  }

  _subscribe(fun) {
    this.subscribers.push(fun);
    return this.state
  }

  _unsubscribe(fun) {
    this.subscribers.splice(this.subscribers.indexOf(fun), 1);
  }

  // This is a HOC to auto provide props
  subscribe(desiredProps, WrappedComponent) {
    let thisGameState = this;

    // Desired Props is a list of the properties wanted fom state
    class WithSubscription extends Component {
      constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = desiredProps.reduce((a, e) => {
          a[e] = thisGameState.state[e];
          return a;
        }, {});
      }

      componentDidMount() {
        this.handleChange(thisGameState._subscribe(this.handleChange));
      }

      componentWillUnmount() {
        thisGameState._unsubscribe(this.handleChange)
      }

      handleChange(newState) {
        const subset = desiredProps.reduce((a, e) => {
          a[e] = thisGameState.state[e];
          return a;
        }, {});
        if (!areEqualShallow(subset, this.state)) {
          this.setState(subset);
        }
      }

      render() {
        return <WrappedComponent {...this.state} {...this.props}/>
      }
    }

    WithSubscription.displayName = `WithSubscription(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
    return WithSubscription;
  }

  emitUpdate() {
    this.subscribers.forEach((fun) => fun(this.state));
  }

}

export default new GameState();