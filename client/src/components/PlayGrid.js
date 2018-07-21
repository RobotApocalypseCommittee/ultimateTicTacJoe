import React, {Component} from 'react';

import 'animate.css';
import styled from 'styled-components';
import gameState from "../GameState";
import gameStates from "../GameStates";
import communicator from "../sockface";
import SubGrid from "./SubGrid";

const gridSizeFactor = 4;
const subGridSizeFactor = 13;
const gridRowGapFactor = 50;
const subGridRowGapFactor = gridRowGapFactor * 3;

const Div = styled.div.attrs({
  minimumavailablespace: props =>
    (props.width < props.height
      ? props.width : props.height) * 0.9
})`
align-content: center;
justify-content: center;
  display: grid;
  grid-template-columns: repeat(3, ${props => props.minimumavailablespace / 3}px);
  grid-template-rows: repeat(3, ${props => props.minimumavailablespace / 3}px);
  grid-gap: 1vmin;
  background-color: var(--color-primary-1);
  flex-grow: 1;
  
  `;

class PlayGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crossedCells: [],
      circledCells: [],
      width: 0,
      height: 0
    };
    this.handleCellClick = this.handleCellClick.bind(this);
    this.throttleUpdates = this.throttleUpdates.bind(this);
  }


  handleCellClick(subSquare, cell) {
    console.log("Square: ", subSquare, ", Cell: ", cell);
    if (gameState.state.status === gameStates.PERFORMINGTURN) {
      communicator.makeTurn(subSquare, cell);
    }
  }

  componentDidMount() {
    this.resizeTimer = null;
    window.addEventListener("resize", this.throttleUpdates);
    this.updateSizing();
  }

  throttleUpdates() {
    if (!this.resizeTimer) {
      this.resizeTimer = setTimeout(() => {
        this.resizeTimer = null;
        this.updateSizing();
      }, 66);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.throttleUpdates);
    if (this.resizeTimer) {
      clearTimeout(this.resizeTimer);
    }
  }

  updateSizing() {
    const element = document.getElementById("playGrid");
    this.setState({
      width: element.clientWidth,
      height: element.clientHeight
    })
  }


  gridItems() {
    let items = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        items.push(
          <SubGrid delay={(i * 3 + j) * 100}
                   onCellClick={this.handleCellClick.bind(this, items.length)}
                   board={this.props.board[items.length]}
                   key={items.length}
          />);
      }
    }
    return items;
  };

  render() {
    return (
      <Div id="playGrid" width={this.state.width} height={this.state.height}>
        {
          this.gridItems()
        }
      </Div>
    );
  }
}

export default gameState.subscribe(["board", "playerIndex"], PlayGrid)