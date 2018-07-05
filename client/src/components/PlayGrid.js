import React, {Component} from 'react';
import {Cell, Grid} from 'styled-css-grid';
import '../App.css';
import 'animate.css';

const gridSizeFactor = 4;
const subGridSizeFactor = 13;
const gridRowGapFactor = 50;
const subGridRowGapFactor = gridRowGapFactor*3;

export default class PlayGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentBoard: 0,
            playerTurn: 0,
            crossedCells: [],
            circledCells: [],
            width: 0, height: 0
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    gridItems = () => {
        var items = [];
        for (var i = 0; i < 3; i ++) {
            for (var j = 0; j < 3; j++) {
                items.push(<Cell center middle key={i*3+j} left={j+1} top={i+1}>
                    <SubGrid delay={(i*3+j)*100} />
                </Cell>);
            }
        }
        return items;
    };
    
    render () {
        return (
                <Grid className="mainGrid animated fadeInUp" 
                    columns={"repeat(3, " + this.state.width/gridSizeFactor+ "px)"}
                    rows={"repeat(3, " + this.state.width/gridSizeFactor+ "px)"}
                    gap={this.state.width/gridRowGapFactor+"px"}
                >
                    {
                        this.gridItems()
                    }
                </Grid>
        );
    }

    
}

class SubGrid extends PlayGrid {

    constructor() {
        super();
        this.state = {
            class: "hiddenItem",
            rowWidth: 300,
            crossedCells: [],
            circledCells: [],
            width: 0, height: 0
        };
        
    }

    componentDidMount () {
        this.timeoutId = setTimeout(function () {
            this.setState({class: "animated fadeInUp main-grid-cell"});
        }.bind(this), this.props.delay);
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
      } 
    
    componentWillUnmount () {
      if (this.timeoutId) {
         clearTimeout(this.timeoutId);
      }
      window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    gridItems = () => {
        var items = [];
        for (var i = 0; i < 3; i ++) {
            for (var j = 0; j < 3; j++) {
                items.push(<Cell center middle className="sub-grid-cell" key={i*3+j} left={j+1} top={i+1}>
                    <GridSquare />
                </Cell>);
            }
        }
        return items;
    };

        render () {
            return (
                    <Grid className={this.state.class}
                        columns={"repeat( 3, "+ this.state.width/subGridSizeFactor +"px )"}
                        rows={"repeat( 3, " + this.state.width/subGridSizeFactor +"px )"}
                        gap={this.state.width/subGridRowGapFactor+"px"}
                    >
                        {
                            this.gridItems()
                        }
                    </Grid>
            );
        }
    }

class GridSquare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            icon: 0
        }
    }

    render () {

        return (
            <div>B</div>
        )
    }
    
}