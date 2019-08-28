import React, {Component} from 'react';
import logo from "../images/logo.png";
import ".././App.css";
import LinkButton from './LinkButton'

class Index extends Component {
    render(){
        return (
            <div className="Index">
            <header className="App-header">
                <img src={logo} className="Logo" alt="logo" />
                <br/>
                <LinkButton route='/gameplay' name='Space Laser Challenge'/>
                <br/>
                <LinkButton route='' name='Settings'/> 
                <br/>
                <LinkButton route='/practice' name='Practice'/> 
            </header>
            </div>
        );
    }
}

export default Index;