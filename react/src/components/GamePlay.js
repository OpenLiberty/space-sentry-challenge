import React, {Component} from 'react';
import logo from "../images/logo.png";
import "../App.css";
import LinkButton from './LinkButton'
import EnterName from './EnterName'

class GamePlay extends Component {
    render(){
        return (
            <div className="GamePlay">
            <header className="App-header">
                <img src={logo} className="Logo" alt="logo" />
                <br/>
                <EnterName underbar="Look for your name on our Leaderboards!!"/>
                <LinkButton route='/game' name='Start Game'/>
                <br/>
                <LinkButton route='/' name='Return to Main Menu'/> 
            </header>
            </div>
        );
    }
}

export default GamePlay;