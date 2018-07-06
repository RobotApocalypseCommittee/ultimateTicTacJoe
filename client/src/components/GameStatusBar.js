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
    this.statuses = [
        "Waiting for player to join",
        "Waiting for other player's turn",
        "Waiting for your turn"
    ]
  }
  render() {
    return (
        <Div><Input type="text" value={this.props.url} readOnly/><Item>{this.statuses[this.props.state]}</Item></Div>
    )
  }
}