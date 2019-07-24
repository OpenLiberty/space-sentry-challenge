import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import "../App.css";

class LinkButton extends Component {
    render(){
        return (
            <div className="LinkButton">
            <header className="App">
                <Link to={this.props.route}><Button size="lg" variant="primary">{this.props.name}</Button></Link>
            </header>
            </div>
        );
    }
}

export default LinkButton;
