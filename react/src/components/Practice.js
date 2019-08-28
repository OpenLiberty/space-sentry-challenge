import React, {Component} from 'react';
import logo from "../images/logo.png";
import "../App.css";
import LinkButton from './LinkButton'
import EnterName from './EnterName'
import PracticeModal from './PracticeModal'

class Practice extends Component {
    render(){
        return (
            <div className="Practice">
            <header className="App-header">
                <PracticeModal/>
                <img src={logo} className="Logo" alt="logo" />
                <br/>
                <LinkButton route='/game' name='Start Practice'/>
                <br/>
                <LinkButton route='/' name='Return to Main Menu'/> 
            </header>
            </div>
        );
    }
}

export default Practice;