import React, {Component} from 'react';

import styled from 'styled-components';
import gameState from "../GameState";
import gameStates from "../GameStates";
import communicator from "../Communicator";
import SubGrid from "./SubGrid";

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
      communicator.makeTurn(this.props.playerIndex, subSquare, cell);
    }
  }

  componentDidMount() {
    this.resizeTimer = null;
    this.iosHackTimer = null;
    window.addEventListener("resize", this.throttleUpdates);
    this.updateSizing();
    this.checkIOSHackTimer();
  }

  throttleUpdates() {
    if (!this.resizeTimer) {
      this.resizeTimer = setTimeout(() => {
        this.resizeTimer = null;
        this.updateSizing();
        this.checkIOSHackTimer();
      }, 66);
    }
  }

  checkIOSHackTimer(){
    // IOS IS BAD
    if (this.iosHackTimer){
      clearTimeout(this.iosHackTimer);
    }
    this.iosHackTimer = setTimeout(()=>{
      this.iosHackTimer = null;
      this.updateSizing()
    }, 500)
  }


  componentWillUnmount() {
    window.removeEventListener("resize", this.throttleUpdates);
    if (this.resizeTimer) {
      clearTimeout(this.resizeTimer);
    }
    if (this.iosHackTimer){
      clearTimeout(this.iosHackTimer);
    }
  }

  updateSizing() {
    const element = document.getElementById("playGrid");
    this.setState({
      width: element.clientWidth,
      height: element.clientHeight
    });
    console.log("UPDATE SIZING")
  }


  gridItems() {
    let items = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        items.push(
          <SubGrid delay={(i * 3 + j) * 100}
                   onCellClick={this.handleCellClick.bind(this, items.length)}
                   board={this.props.board.subGrids[items.length]}
                   overlayValue={this.props.board.grid[items.length]}
                   key={items.length}
                   active={gameState.state.status === gameStates.PERFORMINGTURN && (gameState.state.turnCriteria.mainIndex === items.length || gameState.state.turnCriteria.mainIndex === -1)}
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
