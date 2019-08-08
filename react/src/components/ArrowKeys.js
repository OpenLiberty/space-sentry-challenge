import React, {Component} from 'react';
import {Row} from 'react-bootstrap'
import "../css/fonts/exo2.css"
import "../css/fonts/scpro.css"
import "../css/fonts/stm.css"
import "../css/reset.min.css"
import "../css/normalize.min.css"
import "../App.css"
import LinkButton from './LinkButton'

class ArrowKeys extends Component {
    constructor(props){
        super(props)
        this.state={
            minutes:'00',
            seconds:'59',
            start: true,
            timerDisplay : document.querySelector(".timer-display"),
            scoreVal :document.getElementById('scoreVal'),
            beamText :document.getElementById('beamText'),
            countDownTime :1,
            movePanLeft :false,
            movePanRight :false,
            moveTiltUp :false,
            moveTiltDown :false,
            gameStarted :false,
            websocket : null,
            websocket_url :'ws://localhost:9080/WebSocketLocal/shipsocket',
        };
        this.showGameBoard = this.showGameBoard.bind(this);
        //this.runTimer = this.runTimer.bind(this)
        //this.runningTimer = this.runningTimer.bind(this)
        this.sendSocket = this.sendSocket.bind(this);
        this.init = this.init.bind(this);
        this.panShip = this.panShip.bind(this);
        this.tiltShip = this.tiltShip.bind(this);
        this.fireLaser = this.fireLaser.bind(this);
        this.startGame = this.startGame.bind(this);
        this.toggleBeamOff = this.toggleBeamOff.bind(this);
        this.toggleBeamOn = this.toggleBeamOn.bind(this);
        this.moveUp = this.moveUp.bind(this);
        this.moveDown = this.moveDown.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.arrowDown = this.arrowDown.bind(this);
        this.arrowUp = this.arrowUp.bind(this);
      }


// var scoreMusic = $('#audio-score')[0];
// var scoreMusic500 = $('#audio-score500')[0];
// var laserSound = $('#audio-laser')[0];
// var countdownSound = $('#audio-cd')[0];


startGame() {
  this.showGameBoard();
  //this.runTimer();

  // Create EventSource object
  // var source = new EventSource(
  //   'http://localhost:9081/liberty-demo-game/gameapp/game/gamestream');

  // source.onmessage = function(e) {
  //   updateScore(e);
  // };
}

stopGameSuccess() {
  //clearInterval(this.runningTimer);
  this.sendSocket("stopShip");
  this.setState({gameStarted: false})
  this.state.websocket.close();
  //pageRedirect();
}


stopGameFail() {
  alert("Unable to stop the game due to internal server error");
}
// Keyboard action
arrowDown(e) {
  e.preventDefault();
  if (e.which === 32) {
    const key = document.querySelector(`.fire-key[data-key="${e.which}"]`);
    key.classList.add('press');
  } else {
    const key = document.querySelector(`.arrow-key[data-key="${e.which}"]`);
    key.classList.add('press');
  }
  if (e.which === 37) {
    //console.log("Keyboard - Moving left!!");
    this.setState({movePanLeft: true})
  } else if (e.which === 39) {
    //console.log("Keyboard - Moving right!!");
    this.setState({movePanRight: true})
  } else if (e.which === 38) {
    //console.log("Keyboard - Moving up!!");
	this.setState({moveTiltUp : true})
  } else if (e.which === 40) {
    //console.log("Keyboard - Moving down!!");
	this.setState({moveTiltDown: true})
  } 
  this.panShip()
  this.tiltShip()
}

arrowUp(e) {
  e.preventDefault();
  if (e.which === 32) {
    const key = document.querySelector(`.fire-key[data-key="${e.which}"]`);
    key.classList.remove('press');
  } else {
    const key = document.querySelector(`.arrow-key[data-key="${e.which}"]`);
    key.classList.remove('press');
  }
  if (e.which === 32) {
	  //laserSound.play();
	  this.fireLaser();
  }
}

toggleBeamOn() {
  // $('.fire-key').css('background', '#2ecc71').css('box-shadow',
  //   '-1px 1px 0 #15B358, -2px 2px 0 #15B358, -3px 3px 0 #15B358, -4px 4px 0 #15B358'
  // );
  // $('.fire-key.press').css('box-shadow',
  //   '0px 0px 0 #15B358, 0px 0px 0 #15B358, 0px 0px 0 #15B358, -1px 1px 0 #15B358'
  // );
  // $('.fire-key:active').css('box-shadow',
  //   '0px 0px 0 #3C93D5, 0px 0px 0 #15B358, 0px 0px 0 #15B358, -1px 1px 0 #15B358'
  // );

}

toggleBeamOff() {
  //laserSound.play();
}

tiltShip() {
  if (this.state.moveTiltUp) {
	  console.log("Moving Up...");
	  this.sendSocket("VU");
	  this.setState({moveTiltUp: false})
  } 
  else if (this.state.moveTiltDown) {
	  console.log("Moving Down...");
	  this.sendSocket("VD");
	  this.setState({moveTiltDown: false})
  }
}


panShip() {
  if (this.state.movePanLeft) {
	  console.log("Moving Left...");
	  this.sendSocket("HL");
	  this.setState({movePanLeft: false})
  } 
  else if (this.state.movePanRight) {
	  console.log("Moving Right...");
	  this.sendSocket("HR");
	  this.setState({movePanRight: false})
  }
}

// updateScore(event) {
//   console.log("EVENT DATA: " + event.data);
//   var gameevent = JSON.parse(event.data);
//   scoreVal.textContent = gameevent.score;
//   var score = parseInt(gameevent.score);
//   if (score % 500 == 0 && score > 0) {
//     scoreMusic500.play();
//   } else {
//     scoreMusic.play();
//   }

// }

// displayTime(decSeconds) {
//   const minutes = Math.floor(decSeconds / 600);
//   const restDecSecs = decSeconds % 600;
//   const seconds = Math.floor(restDecSecs / 10);
//   const deciSeconds = restDecSecs % 10;

//   const displayMins = `${minutes < 10 ? "0" : ""}${minutes}`;
//   const displaySecs = `${seconds < 10 ? "0" : ""}${seconds}`;
//   const displayDecSecs = `${deciSeconds}`;

//   const display = `${displayMins}:${displaySecs}.${displayDecSecs}`;

//   timerDisplay.textContent = display;
// }

// runTimer() {
//   clearInterval(runningTimer);
//   let timer = 600;

//   // start interval
//   runningTimer = setInterval(() => {
//     const runTimer = timer--;
//     if (runTimer == 100) {
//       countdownSound.play();
//     }
//     // if time is up (reached max of 60 secs) stop timer
//     if (runTimer < countDownTime) {
//       timer = 600;
//     }

//     // display timer
//     displayTime(timer);
//   }, 100);
// }


fireLaser() {
  console.log("FIRE!");
  this.sendSocket("fireLaser");
}

showGameBoard() {
  this.setState({gameStarted: true})
  this.init('localhost:9080/WebSocketLocal/shipsocket');
  this.sendSocket("Hello Earthlings!");
}

/***********************************************************
 *********************** WEB SOCKET ************************
 ***********************************************************/
init(url) {
  console.log("init %o, %s, %s", this.state.websocket, url);
  if (this.state.websocket !== null) {
    console.log("yerr")
    this.state.websocket.close();
    this.setState({websocket: null});
  }

  // Set the URL, always reset the use_encoder attribute
  var finalurl = "ws://" + url;
  this.setState({websocket_url: finalurl})
  console.log(".. init %s", this.state.websocket_url);

}

sendSocket(payload) {
  console.log("sendSocket %o, %s", this.state.websocket, this.state.websocket_url);
  const self = this;
  if (this.state.websocket === null) { 

    var websocketNew = new WebSocket(this.state.websocket_url)
    websocketNew.onmessage = function(event) {
      console.log("Message" + event.data);
    }
    websocketNew.onerror = function(event) {
      console.log('Error: ' + event.data);
    }

    websocketNew.onopen = function(event) {
      console.log("Connection established!");
      // Start the Space Ship
      
      var startGame = self.state.gameStarted
      if (startGame) 
        self.sendSocket("starrrrtShip");
    }

    websocketNew.onclose = function(event) {
      this.setState({
        websocket:null
      })
      //webSocketConnected = false;
      console.log("Connection closed : " + event.code);
    }

    self.setState({
      websocket: websocketNew
    })
    
  } else if (payload && this.state.gameStarted) {
    console.log("Sending message : ", payload);
      this.state.websocket.send(payload);
    }
    //this.setState({websocket: websocketNew});

  console.log(".. sendSocket %o, %s", this.state.websocket, this.state.websocket_url);
  return this.state.websocket;
}

moveUp () {
  this.setState({
    moveTiltUp: true
  }, () => {
    this.tiltShip();
  }
  )
}

moveDown () {
  this.setState({
    moveTiltDown: true
  }, () => {
    this.tiltShip();
  }
  )
}

moveLeft () {
  this.setState({
    movePanLeft: true
  }, () => {
    this.panShip();
  }
  )
}

moveRight () {
  this.setState({
    movePanRight: true
  }, () => {
    this.panShip();
  }
  )
}

componentDidMount(){
  window.addEventListener('keyup', this.arrowUp);
  window.addEventListener('keydown', this.arrowDown);
  this.startGame();

}

    render() {
       return (
        <div>
        <Row>   
        <div id="arrowKeys" className="col-md-12 col-centered text-center">
          <div className="arrow-key-container">
            <div id="arrowUp" className="arrow-key up" data-key="38" onClick={event => this.moveUp() }></div><br/>
            <div id="arrowLeft" className="arrow-key left" data-key="37" onClick={event => this.moveLeft()}></div>
            <div id="arrowDown" className="arrow-key down" data-key="40" onClick={event => this.moveDown()}></div>
            <div id="arrowRight" className="arrow-key right" data-key="39" onClick={event => this.moveRight()}></div>
          </div>
        </div>
      </Row>
        <Row>
          <div className="col-md-11 col-centered text-center">
            <div className="fire-key-container">
              <div id="fireLaser" className="fire-key fire" data-key="32" onClick={event => this.fireLaser()}><span id="beamText">FIRE BEAM</span></div>
            </div>
          </div>
       </Row>
       <Row>
        <div className="col-md-11 col-centered text-center">
          <LinkButton id="stop_button" className="secondary" route='/' name='Stop Game'/> 
        </div>
       </Row>
      </div>
      );
    }
    
  }

  export default ArrowKeys;