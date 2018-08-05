import React, {Component} from 'react'
import gameState from "../GameState";
import GridSquare from './GridSquare';
import styled from 'styled-components';
import 'animate.css';
import {getSubWin} from "../UTTLogic";

const Div = styled.div`
display: grid;
  grid-template-columns: repeat(3, 30%);
  grid-template-rows: repeat(3, 30%);
  grid-gap: 3.333%;
  place-content: center;
  background-color: var(--color-primary-4);
  padding: 1vmin;
  border-radius: 5px;
  position: relative;
  `;

const Floater = styled.div`
display: flex;
align-items: center;
justify-content: center;
position: absolute;
left: 2.5%;
top: 2.5%;
bottom: 2.5%;
right: 2.5%;
background-color: white;
opacity: 0.7;
visibility: visible;
border-radius: 5px;
transition: visibility 0s linear 0s, opacity 300ms;

.hiddenItem > & {
opacity: 0;
}

${Div}:hover & {
opacity: 0;
visibility: hidden;
transition: visibility 0s linear 300ms, opacity 300ms;
}
`;
const P = styled.span`
margin: 0;
line-height: 25vmin;
font-size: 25vmin;
font-family: 'Quicksand', sans-serif;
`;

class SubGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      class: "hiddenItem",
      rowWidth: 300,
    };

  }

  componentDidMount() {
    this.timeoutId = setTimeout(function () {
      this.setState({class: "animated fadeInUp main-grid-cell"});
    }.bind(this), this.props.delay);
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }


  gridItems() {
    let items = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        items.push(<GridSquare key={items.length}
                               row={j}
                               column={i}
                               active={this.props.active}
                               onClick={this.props.onCellClick.bind(null, items.length)}>
          {this.props.board[items.length] === -1
            ? ""
            : this.props.letterSet[this.props.board[items.length]]}
        </GridSquare>);
      }
    }
    return items;
  };

  render() {
    let floaterValue = getSubWin(this.props.board);
    return (
      <Div className={this.state.class}>
        {
          this.gridItems()
        }
        {floaterValue !== null && <Floater><P>{this.props.letterSet[floaterValue.winner]}</P></Floater> }
      </Div>
    );
  }
}

export default gameState.subscribe(["letterSet"], SubGrid);