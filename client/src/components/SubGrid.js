import React, {Component} from 'react'
import gameState from "../GameState";
import GridSquare from './GridSquare';
import styled, {keyframes} from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`

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
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-delay: ${props=>props.delay+"ms"};
  animation-name: ${fadeInUp};
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
opacity: ${props=>props.hidden ? 0 : 0.7};
visibility: ${props=>props.hidden ? "hidden" : "visible"};
border-radius: 5px;
transition: visibility 0s linear ${props=>props.hidden ? "300ms" : "0s"}, opacity 300ms;
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
      floaterHidden: false
    };
    this.onHoverEnd = this.onHoverEnd.bind(this);
    this.onHoverBegin = this.onHoverBegin.bind(this);

  }



  onHoverBegin() {
    this.setState({floaterHidden: true});
  }

  onHoverEnd() {
    this.setState({floaterHidden: false})
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
    return (
      <Div className="main-grid-cell" delay={this.props.delay} onMouseEnter={this.onHoverBegin}
           onMouseLeave={this.onHoverEnd} onBlur={this.onHoverEnd}>
        {
          this.gridItems()
        }
        {this.props.overlayValue !== -1 &&
        <Floater
          onTouchStart={this.onHoverBegin}
          hidden={this.state.floaterHidden}>
          <P>{this.props.letterSet[this.props.overlayValue]}</P>
        </Floater> }
      </Div>
    );
  }
}

export default gameState.subscribe(["letterSet"], SubGrid);
