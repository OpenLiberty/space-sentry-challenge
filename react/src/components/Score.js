import React, {Component} from 'react';
import logo from "../images/logo.png";
import "../css/fonts/exo2.css"
import "../css/fonts/scpro.css"
import "../css/fonts/stm.css"
import "../css/reset.min.css"
import "../App.css"

class Score extends Component {
    constructor(props){
        super(props)
        this.state={
            source: null,
            scoreVal :document.getElementById('scoreVal'),
            score: 0
        }

        this.updateScore = this.updateScore.bind(this);
        this.startScoreCheck = this.startScoreCheck.bind(this);
    }

    componentDidMount(){
      this.startScoreCheck()
    }

    startScoreCheck() {
      //Create EventSource object
      var sourceNew = new EventSource(
        'http://localhost:9081/liberty-demo-game/gameapp/game/gamestream');

      sourceNew.onmessage = (e) => {
        this.updateScore(e);
      };
      this.setState({
        source: sourceNew
   })
    }

    updateScore(event) {
      console.log("EVENT DATA: " + event.data);
      var gameevent = JSON.parse(event.data);
      this.setState({
        score: gameevent.score
      })
      var score = parseInt(gameevent.score);
      if (score % 500 == 0 && score > 0) {
        //scoreMusic500.play();
      } else {
        //scoreMusic.play();
      }
    
    }


    render() {
       return (
        <div>
        <div className="col-xs-4 col-md-offset-2">
          <div id="scoreBoard">
          <div className="interface" className="column">
            <div className="display-container">
              <div id="gameText"> Your Score </div>
              <div className="score">
                <span id="scoreVal">{this.state.score}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      );
    }
  }

  export default Score;