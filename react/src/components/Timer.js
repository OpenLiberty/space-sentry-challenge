import React, {Component} from 'react';
import logo from "../images/logo.png";
import "../css/fonts/exo2.css"
import "../css/fonts/scpro.css"
import "../css/fonts/stm.css"
import "../css/reset.min.css"
import "../App.css"

class Timer extends Component {
    constructor(props){
        super(props)
        this.state={
            minutes:'00',
            seconds:'59',
            start: true
        }
        //this.intervalHandle;

        this.startCountDown = this.startCountDown.bind(this);
        this.tick = this.tick.bind(this);
    }

    componentDidMount(){
        this.timerID = setInterval(
            () => this.tick(),
            1000
          );    
    }

    tick() {
        var sec = this.state.seconds-1;
        this.setState({
          seconds: sec
        })
        if (sec < 10) {
          this.setState({
            seconds: "0" + this.state.seconds,
          })
        }
        if (sec === 0) {
        clearInterval(this.timerID);
        }
    }

    startCountDown() {
        this.intervalHandle = setInterval(this.tick, 1000);
        }

    render() {
       return (
        <div>
        <div className="col-xs-4 col-md-offset-2">
        <div id="timeLeft">
            <div id="timerBoard" className="interface" className="column">
              <div className="display-container">
                <div id="gameText"> Time Left </div>
                <div className="timer-display">
                  {this.state.minutes}:{this.state.seconds}
                </div>
              </div>
            </div>
        </div>
      </div>
      </div>
      );
    }
  }

  export default Timer;