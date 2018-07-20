import React, {Component} from 'react';
import styled from 'styled-components';

const Div = styled.div`
    background-color: var(--color-primary-3);
    padding: 0.5em;
    display: flex;
    flex-wrap: nowrap;
`;
const Item = styled.span`
    flex: 1;
    margin: auto;
`;
const Input = styled.input`
  flex: 1;
  margin: auto;
`;

export default class GameStatusBar extends Component {
  constructor(props){
    super(props);
    this.statuses = {
      PREGAME: "Game does not exist yet?",
      PREGAMESTART: "Waiting for other player to join.",
      WAITFORTURN: "Waiting for other player's turn.",
      PERFORMINGTURN: "Make your turn.",
      GAMEENDED: "Game Ended",
      DISCONNECTED: "You have been disconnected."
    };
  }
  render() {
    return (
        <Div>
          <Input type="text" value={this.props.url} readOnly/>
          <Item>{this.statuses[this.props.state]}</Item>
        </Div>
    )
  }
}