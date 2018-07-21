import React, {Component} from 'react'
import gameState from "../GameState";
import GridSquare from './GridSquare';
import styled from 'styled-components';

const Div = styled.div`
display: grid;
  grid-template-columns: repeat(3, 30%);
  grid-template-rows: repeat(3, 30%);
  grid-gap: 3.333%;
  place-content: center;
  background-color: var(--color-primary-4);
  padding: 1vmin;
  border-radius: 5px;
  `;

class SubGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      class: "hiddenItem",
      rowWidth: 300,
      crossedCells: [],
      circledCells: [],
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
    return (
      <Div className={this.state.class}>
        {
          this.gridItems()
        }
      </Div>
    );
  }
}

export default gameState.subscribe(["letterSet"], SubGrid);