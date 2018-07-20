import React, {Component} from 'react';
import {Cell, Grid} from 'styled-css-grid';
import '../App.css';
import 'animate.css';
import gameState from "../GameState";
import gameStates from "../GameStates";
import communicator from "../sockface";

const gridSizeFactor = 4;
const subGridSizeFactor = 13;
const gridRowGapFactor = 50;
const subGridRowGapFactor = gridRowGapFactor * 3;

class PlayGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      crossedCells:[],
      circledCells:[],
      width: 0,
      height: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  }

  handleCellClick(subSquare, cell){
    console.log("Square: ", subSquare, ", Cell: ", cell);
    if (gameState.state.status === gameStates.PERFORMINGTURN) {
      communicator.makeTurn(subSquare, cell);
    }
  }


  gridItems(){
    let items = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        items.push(<Cell center middle key={i * 3 + j} left={j + 1} top={i + 1}>
          <SubGrid delay={(i * 3 + j) * 100}
                   onCellClick={this.handleCellClick.bind(this, items.length)}
                   board={this.props.board[items.length]}
          />
        </Cell>);
      }
    }
    return items;
  };

  render() {
    return (
      <Grid className="mainGrid animated fadeInUp"
            columns={"repeat(3, " + this.state.width / gridSizeFactor + "px)"}
            rows={"repeat(3, " + this.state.width / gridSizeFactor + "px)"}
            gap={this.state.width / gridRowGapFactor + "px"}
      >
        {
          this.gridItems()
        }
      </Grid>
    );
  }
}

export default gameState.subscribe(["board", "playerIndex"], PlayGrid)


const SubGrid = gameState.subscribe(["letterSet"], class extends PlayGrid {

  constructor(props) {
    super(props);
    this.state = {
      class: "hiddenItem",
      rowWidth: 300,
      crossedCells: [],
      circledCells: [],
      width: 0, height: 0
    };

  }

  componentDidMount() {
    this.timeoutId = setTimeout(function () {
      this.setState({class: "animated fadeInUp main-grid-cell"});
    }.bind(this), this.props.delay);
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({width: window.innerWidth, height: window.innerHeight});
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
      <Grid className={this.state.class}
            columns={"repeat( 3, " + this.state.width / subGridSizeFactor + "px )"}
            rows={"repeat( 3, " + this.state.width / subGridSizeFactor + "px )"}
            gap={this.state.width / subGridRowGapFactor + "px"}
      >
        {
          this.gridItems()
        }
      </Grid>
    );
  }
});

function GridSquare(props) {
  console.log("NOOT");
  return <Cell center middle className="sub-grid-cell"
               left={props.row + 1}
               top={props.column + 1}
               onClick={props.onClick}
  >
    <div>{props.children}</div>
  </Cell>
}
