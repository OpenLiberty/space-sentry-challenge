import React, {Component} from 'react';
import logo from "../images/logo.png";
import "../css/fonts/exo2.css"
import "../css/fonts/scpro.css"
import "../css/fonts/stm.css"
import "../css/reset.min.css"
import "../css/normalize.min.css"
import "../App.css"
import LinkButton from './LinkButton'
import $ from 'jquery'

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
            websocket :null,
            websocket_url :null,
        }
        this.showGameBoard = this.showGameBoard.bind(this)
        //this.runTimer = this.runTimer.bind(this)
        //this.runningTimer = this.runningTimer.bind(this)
        this.sendSocket = this.sendSocket.bind(this)
        this.init = this.init.bind(this)
        this.panShip = this.panShip.bind(this)
        this.tiltShip = this.tiltShip.bind(this)
        this.fireLaser = this.fireLaser.bind(this)
        this.startGame = this.startGame.bind(this)
        this.toggleBeamOff = this.toggleBeamOff.bind(this)
        this.toggleBeamOn = this.toggleBeamOn.bind(this)
      }


// var scoreMusic = $('#audio-score')[0];
// var scoreMusic500 = $('#audio-score500')[0];
// var laserSound = $('#audio-laser')[0];
// var countdownSound = $('#audio-cd')[0];

startGame() {
  this.showGameBoard();
  //this.runTimer();

  // Create EventSource object
  var source = new EventSource(
    'http://localhost:9081/liberty-demo-game/gameapp/game/gamestream');

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
  console.log("MoveRight=" + this.state.movePanRight + " MoveLeft=" + this.state.movePanLeft + " MoveUp=" + this.state.moveTiltUp + " MoveDown=" + this.state.moveTiltDown);
  if (e.which === 37 || e.which === 39) {
	  this.panShip();
	  //setTimeout(panShip, 250);
  } else if (e.which === 38 || e.which === 40) {
	  this.tiltShip();
	  //setTimeout(tiltShip, 250);
  } else if (e.which === 32) {
	  //laserSound.play();
	  this.fireLaser();
  }
}

toggleBeamOn() {
  $('.fire-key').css('background', '#2ecc71').css('box-shadow',
    '-1px 1px 0 #15B358, -2px 2px 0 #15B358, -3px 3px 0 #15B358, -4px 4px 0 #15B358'
  );
  $('.fire-key.press').css('box-shadow',
    '0px 0px 0 #15B358, 0px 0px 0 #15B358, 0px 0px 0 #15B358, -1px 1px 0 #15B358'
  );
  $('.fire-key:active').css('box-shadow',
    '0px 0px 0 #3C93D5, 0px 0px 0 #15B358, 0px 0px 0 #15B358, -1px 1px 0 #15B358'
  );

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
  } else {
	  // Do nothing
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
  } else {
	  // Do nothing
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
  this.init('localhost:9080/WebSocketLocal/shipsocket');
  this.setState({gameStarted: true})
  this.sendSocket("Hello Earthlings!");
  $("#gameShow").show();
}

/***********************************************************
 *********************** WEB SOCKET ************************
 ***********************************************************/
init(url) {
  console.log("init %o, %s, %s", this.state.websocket, url);
  if (this.state.websocket != null) {
    this.state.websocket.close();
    this.setState({websocket: null})
  }

  // Set the URL, always reset the use_encoder attribute
  this.setState({websocket_url: "ws://" + url})
  console.log(".. init %s, %s", url);

}


sendSocket(payload) {
  console.log("sendSocket %o, %s", this.state.websocket, this.state.websocket_url);
  if (this.state.websocket === null) {
    
    var websocket= new WebSocket('ws://localhost:9080/WebSocketLocal/shipsocket')
    websocket.onmessage = function(event) {
      console.log("Message" + event.data);
    }
    websocket.onerror = function(event) {
      console.log('Error: ' + event.data);
    }

    websocket.onopen = function(event) {
      console.log("Connection established!");
      // Start the Space Ship
      
      if (this.state.gameStarted === )
        this.sendSocket("startShip");
    }

    websocket.onclose = function(event) {
      this.setState({
        websocket:null
      })
      //webSocketConnected = false;
      console.log("Connection closed : " + event.code);
    }
    
  } else if (payload && this.state.gameStarted) {
    console.log("Sending message : ", payload);
      this.state.websocket.send(payload);
    }

    
    this.setState((state) => ({
      websocket: new WebSocket(state.websocket_url)
    }));
    

    

 
  

  console.log(".. sendSocket %o, %s", this.state.websocket, this.state.websocket_url);
  return this.state.websocket;
}

componentDidMount(){
  this.startGame();

$("#fireLaser").click(
  this.toggleBeamOff(),
  this.fireLaser()
);

// Mouse action
$("#arrowUp").mousedown(
	this.setState({
    moveTiltUp:true
  })
);
$("#arrowDown").mousedown(
  this.setState({
    moveTiltDown:true
  }));
$("#arrowLeft").mousedown(
  this.setState({
    movePanLeft:true
  }));
$("#arrowRight").mousedown(
  this.setState({
    movePanRight:true
  }));

$("#arrowUp").mouseup(
  this.tiltShip()
);
$("#arrowDown").mouseup(
  this.tiltShip()
);
$("#arrowLeft").mouseup(
  this.panShip()
);
$("#arrowRight").mouseup(
  this.panShip()
);

$("#stop_button").click(
  this.stopGame()
);
}




    render() {
       return (
        <div>
        <div className="row">   
        <div id="arrowKeys" className="col-md-12 col-centered text-center">
          <div className="arrow-key-container">
            <div id="arrowUp" className="arrow-key up" data-key="38" onClick={event => console.log("ArrowUp")} ></div><br/>
            <div id="arrowLeft" className="arrow-key left" data-key="37" onClick={event => console.log("ArrowLeft")}></div>
            <div id="arrowDown" className="arrow-key down" data-key="40" onClick={event => console.log("ArrowDown")}></div>
            <div id="arrowRight" className="arrow-key right" data-key="39" onClick={event => console.log("ArrowRight")}></div>
          </div>
        </div>
      </div>
        <div className="row">
          <div className="col-md-11 col-centered text-center">
            <div className="fire-key-container">
              <div id="fireLaser" className="fire-key fire" data-key="32" onClick={event => console.log(" ")}><span id="beamText">FIRE BEAM</span></div>
            </div>
          </div>
       </div>
       <div className="row">
        <div className="col-md-11 col-centered text-center">
          <LinkButton id="stop_button" className="secondary" route='/' name='Stop Game'/> 
        </div>
       </div>
      </div>
      );
    }
    
  }

  export default ArrowKeys;

  // <p tabIndex={-1}
  //                   onKeyDown={event => console.log(event.key)}>
  //                   Click to focus, then hit a key.
  //                   </p>