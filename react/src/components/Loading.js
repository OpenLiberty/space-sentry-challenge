import React, {Component} from 'react';
import logo from "../images/logo.png";
import "../App.css"
import ReactPlayer from 'react-player'


class Loading extends Component {

    render(){
        return (
            <div className="Game"> 
                <header className="App-header">
                    <img src={logo} className="Logo" alt="logo" />
                    <ReactPlayer url='http://localhost:8000/terminal-cut.mp4' playing="true" width="1500px" height="500px"/>
                    
                </header>
            </div>
        );
    }
}

export default Loading;
