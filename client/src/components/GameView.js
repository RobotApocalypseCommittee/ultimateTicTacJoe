import React, {Component} from 'react';
import PlayGrid from "./PlayGrid";
import GameStatusBar from "./GameStatusBar";

export default class GameView extends Component {
  render(){
    let url = window.location.protocol + "//" + window.location.host + "/#" + this.props.matchID;
    return (
        <div>
          <GameStatusBar url={url}/>
          <PlayGrid/>
        </div>
    )
  }

  constructor(props) {
    super(props);
  }
}