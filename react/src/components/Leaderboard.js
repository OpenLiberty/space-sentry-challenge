import React, {Component} from 'react';
import logo from "../images/logo.png";
import trophy from "../images/trophy.png";
import "../App.css"
import { Container, Card , Row, Col, Button} from 'react-bootstrap';
import "../css/fonts/exo2.css"
import "../css/fonts/exo.css"
import "../css/fonts/scpro.css"
import "../css/fonts/montserrat.css"
import "../css/fonts/stm.css"
import "../css/normalize.min.css"

class Leaderboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            finalScore: 0,
        }
        this.endGame = this.endGame.bind(this)
        this.showGameStats = this.showGameStats.bind(this)
    }

    endGame(){
        fetch("http://localhost:9081/liberty-demo-game/gameapp/game/score").then(res => res.json()).then((result) => this.showGameStats(result));
        //endMusic.play()
    }

    showGameStats(data){
        console.log("GET DATA: " + JSON.stringify(data));
        console.log("GET score: " + data.score);
        this.setState({
            finalScore: data.score
        });
        console.log("GET leaderboard: " + data.leaderboard);
    }

    componentDidMount(){
        this.endGame();
    }

    render(){
        return (
            <div className=""> 
                <header className="App-header">
                    <Container className="">
                        <Row>
                            <Col className="text-center">
                            <img src={logo} className="Logo-small" alt="OpenLibertyGameLogo"/>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row>
                            <div id="results" className="col-md-4 p-0">
                            <div id="message" className="m-0"> Challenge Over! </div>
                            <div id="finalScoreWrapper" className="m-0"> Your Score : {this.state.finalScore}</div>
                            <div id="board" className='leaderboard m-0'>
                                <h2 className="title"><img id="trophy" src={trophy}/>
                                LEADERBOARD
                                </h2>
                                <ol id="board" className="leaderboard"></ol>
                            </div>
                            <div id="tryAgain" className="m-0">
                                <button id="startOverBtn" className="pulse-button"> Restart Challenge ! </button>
                            </div>
                            </div>
                        </Row>
                        </Container>
                    </header>
                </div>

  
        );
    }
}

export default Leaderboard;
