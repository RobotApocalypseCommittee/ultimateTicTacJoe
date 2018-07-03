import React, {Component} from 'react';
import {Grid, Cell} from 'styled-css-grid';
import '../App.css';
import styled from 'styled-components';

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
                items.push(<Cell className="main-grid-cell" key={i*3+j} left={j+1} top={i+1}>
                    <SubGrid />
                </Cell>);
            }
        }
        console.log(items);
        return items;
    }
    
    render () {
        return (
            <div>
                <Grid columns={3}>
                    {
                        this.gridItems()
                    }
                </Grid>
            </div>
        );
    }

    
}

class SubGrid extends PlayGrid {

    gridItems = () => {
        var items = [];
        for (var i = 0; i < 3; i ++) {
            for (var j = 0; j < 3; j++) {
                items.push(<Cell className="sub-grid-cell" key={i*3+j} left={j+1} top={i+1}>
                    {i*3+j}
                </Cell>);
            }
        }
        console.log(items);
        return items;
    }

        render () {
            return (
                <Grid columns={3}>
                    {
                        this.gridItems()
                        }
                </Grid>
            );
        }
    
        
    }