import React, {Component} from 'react';
import logo from "../images/logo.png";
import "../App.css"
import ReactPlayer from 'react-player'
import {Redirect} from 'react-router-dom'


class Loading extends Component {
    constructor(props){
        super(props)
        this.state ={
            redirect: false
        }
    }

    componentDidMount() {
        this.id = setTimeout(() => this.setState({redirect:true}), 12000)
    }

    componentWillUnmount(){
        clearTimeout(this.id)
    }

    render(){
        return this.state.redirect
        ? <Redirect to="/game"/>
        :    <div className="Game"> 
                <header className="App-header">
                    <img src={logo} className="Logo" alt="logo" />
                    <ReactPlayer url='http://localhost:8000/terminal-cut.mp4' playing width="1500px" height="500px"/>
                    
                </header>
            </div>
        
    }
}

export default Loading;
