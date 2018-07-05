import React, {Component} from 'react';
import styled from 'styled-components';

const Div = styled.div`
    background-color: var(--color-primary-3);
    padding-top: 1em;
    padding-bottom: 1em;
`;

export default class GameStatusBar extends Component {
  render() {
    return (
        <Div>{this.props.url}</Div>
    )
  }
}