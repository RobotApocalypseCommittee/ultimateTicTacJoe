import React, {Component} from 'react';
import PlayGrid from "./PlayGrid";

export default class GameView extends Component {
  render(){
    return (
        <PlayGrid/>
    )
  }

  constructor(props) {
    super(props);
  }
}