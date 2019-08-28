import React, {Component} from 'react';
import logo from "../images/logo.png";
import "../App.css"
import Timer from './Timer'
import Score from './Score'
import ArrowKeys from './ArrowKeys'
import { Container, Card , Row, Col} from 'react-bootstrap';

class Game extends Component {

    render(){
        return (
            <div className="Game"> 
                <header className="App-header">
                    <img src={logo} className="Logo" alt="logo" />
                    <div className="container">
                    <Container className="justify-center display-container">
                        <Row>
                        <p id="gameInstText" className="text-center">Press the arrow keys below or use the arrow keys on your keyboard to move the OpenLiberty Spaceship. 
                        <br/>Press the FIRE button below or the space bar on your keyboard to fire the beam!</p>
                            <Col>
                            <Timer/>
                            
                        
                        </Col>
                        <Col className="justify-center">
                            <Score/>
                           
                        </Col>
                        </Row>
                    

                    </Container>
                    <ArrowKeys/>
                    
                    </div>
                </header>
            </div>
        );
    }
}

export default Game;
