import React, {Component} from 'react';
import {Grid, Cell} from 'styled-css-grid';
import '../App.css';
import styled from 'styled-components';
import 'animate.css';

export default class PlayGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentBoard: 0,
            playerTurn: 0,
            crossedCells: [],
            circledCells: []
        };
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
        console.log(items);
        return items;
    }
    
    render () {
        return (
            <div className="mainGrid animated fadeInUp" >
                <Grid
                    columns="repeat(3, 300px)"
                    rows="repeat(3, 300px)"
                    justifyContent="space-around"
                    gap="5px"
                >
                    {
                        this.gridItems()
                    }
                </Grid>
            </div>
        );
    }

    
}

class SubGrid extends PlayGrid {

    constructor() {
        super();
        this.state = {
            class: "hiddenItem",
            crossedCells: [],
            circledCells: []
        };
    }

    componentDidMount () {
        this.timeoutId = setTimeout(function () {
            this.setState({class: "animated fadeInUp main-grid-cell"});
        }.bind(this), this.props.delay);
        console.log(this.props.delay);
      } 
    
    componentWillUnmount () {
      if (this.timeoutId) {
         clearTimeout(this.timeoutId);
      }
    }

    gridItems = () => {
        var items = [];
        for (var i = 0; i < 3; i ++) {
            for (var j = 0; j < 3; j++) {
                items.push(<Cell center middle className="sub-grid-cell" key={i*3+j} left={j+1} top={i+1}>
                    {i*3+j}
                </Cell>);
            }
        }
        console.log(items);
        return items;
    }

        render () {
            return (
                <div className={this.state.class} >
                    <Grid
                        columns="repeat( 3, 80px )"
                        rows="repeat( 3, 80px )"
                        justifyContent="space-around"
                    >
                        {
                            this.gridItems()
                        }
                    </Grid>
                </div>
            );
        }
    }