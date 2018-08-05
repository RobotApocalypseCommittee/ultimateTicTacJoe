import React, {Component} from 'react';
import styled from 'styled-components';
import communicator from "../Communicator";

const Div = styled.div`
    background-color: var(--color-primary-3);
    padding: 0.5em;
    display: flex;
    flex-wrap: nowrap;
`;
const Item = styled.div`
    flex: 2;
    margin: auto;
`;

const ItemSpan = styled.span`
border-radius: 5px;
padding: 0.5em;
background-color: ${props => props.error ? "#ff0000" : "transparent"};
box-shadow: 0 0 ${props => props.error ? "40px" : "0px"} #ff0000;
transition: background-color 3s, box-shadow 3s;
`;
const Input = styled.input`
  flex: 1;
  margin: auto;
`;

export default class GameStatusBar extends Component {
  constructor(props) {
    super(props);
    this.statuses = {
      PREGAME: "Game does not exist yet?",
      PREGAMESTART: "Waiting for other player to join.",
      WAITFORTURN: "Waiting for other player's turn.",
      PERFORMINGTURN: "Make your turn.",
      GAMEENDED: "Game Ended",
      DISCONNECTED: "You have been disconnected."
    };
    this.state = {
      errorMsg: null,
      error: false
    };
    this.transitionEnd = this.transitionEnd.bind(this);
    this.errorHandler = this.errorHandler.bind(this)
  }

  transitionEnd(event){
    console.log(this.state.error);
    if (event.propertyName === "background-color") {
      if (this.state.error) {
        this.setState({error: false})
      } else {
        this.setState({errorMsg: null})
      }
    }
  }

  errorHandler(type, message) {
    this.setState({errorMsg: message, error:true})
  }
  componentDidMount(){
    communicator.subscribeToError(this.errorHandler)
  }
  componentWillUnmount(){
    communicator.socket.off("invalid-operation", this.errorHandler)
  }


  render() {
    let message = this.state.errorMsg || this.statuses[this.props.state];
    return (
      <Div>
        <Input type="text" value={this.props.url} readOnly/>
        <Item><ItemSpan onTransitionEnd={this.transitionEnd} error={this.state.error}>{message}</ItemSpan></Item>
      </Div>
    )
  }
}