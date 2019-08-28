const timerDisplay = document.querySelector(".timer-display");
var scoreVal = document.getElementById('scoreVal');
var beamText = document.getElementById('beamText');
const countDownTime = 1;
let runningTimer;
var movePanLeft = false;
var movePanRight = false;
var moveTiltUp = false;
var moveTiltDown = false;
var gameStarted = false;
var websocket = null;
var gamerControl = false;
var websocket_url = null;
window.addEventListener('keyup', arrowUp)
window.addEventListener('keydown', arrowDown)

history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };

var direction,
    movingTimeout = -1,
    FPS = 25;

function stopMoving() {
  clearTimeout(movingTimeout);
  movingTimeout = -1;
}

function startMoving(direction) {
  if (movingTimeout === -1) {      
    loop(direction);
  }
}

function loop(direction) {
  move(direction);
  movingTimeout = setTimeout(loop, 1000 / FPS, direction);
}

function move(direction) {
 console.log(gamerControl);
 if (gamerControl){
  moveShip(direction);
 }
}

function moveShip(direction) {
  console.log("moveShip")
  var cmd = "";
  if (direction == "left") {
    console.log("Moving Left...");
    cmd = "HL";
  } 
  else if (direction == "right") {
    console.log("Moving Right...");
    cmd = "HR";
  } else if (direction == "up") {
    console.log("Moving Up...");
    cmd = "VU";
  } else if (direction == "down") {
    console.log("Moving Down...");
    cmd = "VD";
  } else if (direction == "leftFast") {
    console.log("Moving Left Fast...");
    cmd = "H2L";
  } else if (direction == "rightFast") {
    console.log("Moving Right Fast...");
    cmd = "H2R";
  } else if (direction == "upFast") {
    console.log("Moving Up Fast...");
    cmd = "V2U";
  } else if (direction == "downFast") {
    console.log("Moving Down Fast...");
    cmd = "V2D";
  }else {
    // Do nothing
  }
  sendSocket(cmd);

}

$("#fireLaser").click(function() {
  /*  if (!beamToggle) {
      beamText.textContent = "BEAM OFF";
      toggleBeamOff();
      beamToggle = true;
    } else {
      beamText.textContent = "BEAM ON";
      toggleBeamOn();
      beamToggle = false;
    }*/
  toggleBeamOff();
  fireLaser();
});

// Mouse action
$("#arrowUp").mousedown(function() {
	moveTiltUp = true;
});
$("#arrowDown").mousedown(function() {
	moveTiltDown = true;
});
$("#arrowLeft").mousedown(function() {
	movePanLeft = true;
});
$("#arrowRight").mousedown(function() {
	movePanRight = true;
});

$("#arrowUp").mouseup(function() {
  tiltShip();
});
$("#arrowDown").mouseup(function() {
  tiltShip();
});
$("#arrowLeft").mouseup(function() {
  panShip();
});
$("#arrowRight").mouseup(function() {
  panShip();
});

$("#stop_button").click(function() {
  stopGame();
});

var scoreMusic = $('#audio-score')[0];
var scoreMusic500 = $('#audio-score500')[0];
var laserSound = $('#audio-laser')[0];
var countdownSound = $('#audio-cd')[0];

function startGame() {
  showGameBoard();

  runTimer();

  // Create EventSource object
  var source = new EventSource(
    'http://localhost:9081/liberty-demo-game/gameapp/game/gamestream');

  source.onmessage = function(e) {
    updateScore(e);
  };
}

function stopGame() {
      $.ajax({
      type: "POST",
      url: "http://localhost:9081/liberty-demo-game/gameapp/game/stopgame",
      success: stopGameSuccess,
      error: stopGameFail,
      dataType: "json"
    }); 
}

function stopGameSuccess() {
  clearInterval(runningTimer);
  sendSocket("stopShip");
  gameStarted = false;
  websocket.close();
  pageRedirect();
}


function stopGameFail() {
  alert("Unable to stop the game due to internal server error");
}
// Keyboard action
function arrowDown(e) {
  e.preventDefault();
  console.log(e.which);
  if (e.which == 32) {
    const key = document.querySelector(`.fire-key[data-key="${e.which}"]`);
    key.classList.add('press');
  } else if (e.which == 37 || e.which == 65){
      const key = document.querySelector(`.arrow-key[data-key="37"]`);
      key.classList.add('press');
  } else if (e.which == 39 || e.which == 68){
      const key = document.querySelector(`.arrow-key[data-key="39"]`);
      key.classList.add('press');
  } else if (e.which == 38 || e.which == 87){
      const key = document.querySelector(`.arrow-key[data-key="38"]`);
      key.classList.add('press');
  } else if (e.which == 40 || e.which == 83){
      const key = document.querySelector(`.arrow-key[data-key="40"]`);
      key.classList.add('press');
  }
  if (e.which == 37) {
    //console.log("Keyboard - Moving left!!");
    startMoving("left");
    movePanLeft = true;
  } else if (e.which == 39) {
    startMoving("right");
    //console.log("Keyboard - Moving right!!");
    movePanRight = true;
  } else if (e.which == 38) {
    startMoving("up");
    //console.log("Keyboard - Moving up!!");
	  moveTiltUp = true;
  } else if (e.which == 40) {
    //console.log("Keyboard - Moving down!!");
    startMoving("down");
	  moveTiltDown = true;
  } else if (e.which == 65) {
    //console.log("Keyboard - Moving left!!");
    startMoving("leftFast");
    movePanLeft = true;
  } else if (e.which == 68) {
    startMoving("rightFast");
    //console.log("Keyboard - Moving right!!");
    movePanRight = true;
  } else if (e.which == 87) {
    startMoving("upFast");
    //console.log("Keyboard - Moving up!!");
    moveTiltUp = true;
  } else if (e.which == 83) {
    //console.log("Keyboard - Moving down!!");
    startMoving("downFast");
    moveTiltDown = true;
  }
}

function arrowUp(e) {
  e.preventDefault();
  if (e.which == 32) {
    const key = document.querySelector(`.fire-key[data-key="${e.which}"]`);
    key.classList.remove('press');
    //toggleBeamOff();
    /*if (!beamToggle) {
      beamText.textContent = "BEAM OFF";
      toggleBeamOff();
      beamToggle = true;
    } else {
      beamText.textContent = "BEAM ON";
      toggleBeamOn();
      beamToggle = false;
    }*/
  } else if (e.which == 37 || e.which == 65){
      const key = document.querySelector(`.arrow-key[data-key="37"]`);
      key.classList.remove('press');
  } else if (e.which == 39 || e.which == 68){
      const key = document.querySelector(`.arrow-key[data-key="39"]`);
      key.classList.remove('press');
  } else if (e.which == 38 || e.which == 87){
      const key = document.querySelector(`.arrow-key[data-key="38"]`);
      key.classList.remove('press');
  } else if (e.which == 40 || e.which == 83){
      const key = document.querySelector(`.arrow-key[data-key="40"]`);
      key.classList.remove('press');
  }
  console.log("MoveRight=" + movePanRight + " MoveLeft=" + movePanLeft + " MoveUp=" + moveTiltUp + " MoveDown=" + moveTiltDown);
  if (e.which == 37 || e.which == 39) {
	  //setTimeout(panShip, 250);
  } else if (e.which == 38 || e.which == 40) {
	  //setTimeout(tiltShip, 250);
  } else if (e.which == 32) {
	  laserSound.play();
	  fireLaser();
  }
  stopMoving();
}

function toggleBeamOn() {
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

function toggleBeamOff() {
  /*$('.fire-key').css('background', '#e74c3c').css('box-shadow',
    '-1px 1px 0 #CE3323, -2px 2px 0 #CE3323, -3px 3px 0 #CE3323, -4px 4px 0 #CE3323'
  );
  $('.fire-key.press').css('box-shadow',
    '0px 0px 0 #CE3323, 0px 0px 0 #CE3323, 0px 0px 0 #CE3323, -1px 1px 0 #CE3323'
  );
  $('.fire-key:active').css('box-shadow',
    '0px 0px 0 #CE3323, 0px 0px 0 #CE3323, 0px 0px 0 #CE3323, -1px 1px 0 #CE3323'
  );*/
  laserSound.play();
}






function updateScore(event) {
  console.log("EVENT DATA: " + event.data);
  var gameevent = JSON.parse(event.data);
  scoreVal.textContent = gameevent.score;
  var score = parseInt(gameevent.score);
  if (score % 500 == 0 && score > 0) {
    scoreMusic500.play();
  } else {
    scoreMusic.play();
  }

}

function displayTime(decSeconds) {
  const minutes = Math.floor(decSeconds / 600);
  const restDecSecs = decSeconds % 600;
  const seconds = Math.floor(restDecSecs / 10);
  const deciSeconds = restDecSecs % 10;

  const displayMins = `${minutes < 10 ? "0" : ""}${minutes}`;
  const displaySecs = `${seconds < 10 ? "0" : ""}${seconds}`;
  const displayDecSecs = `${deciSeconds}`;

  const display = `${displayMins}:${displaySecs}.${displayDecSecs}`;

  timerDisplay.textContent = display;
}

function runTimer() {
  clearInterval(runningTimer);
  let timer = 600;

  // start interval
  runningTimer = setInterval(() => {
    const runTimer = timer--;
    if (runTimer == 100) {
      countdownSound.play();
    }
    // if time is up (reached max of 60 secs) stop timer
    if (runTimer < countDownTime) {
      stopGameSuccess();
      return;
    }

    // display timer
    displayTime(timer);
  }, 100);
}

function pageRedirect() {
  setTimeout(function() {
  window.location.href = "results.html";
  }, 0);
}

function fireLaser() {
  console.log("FIRE!");
 if (gamerControl){
  sendSocket("fireLaser");
 }
  
}

/**********************************************************
 *********************** TERMINAL **************************
 ***********************************************************/
var bgMusic = $('#audio-bg')[0],
  playing = true;

bgMusic.addEventListener('ended', function() {
  this.currentTime = 0;
  if (playing) {
    this.play();
  }
}, false);

bgMusic.play();

var bind = Function.prototype.bind,
  $append = bind.call(Element.prototype.appendChild, document.querySelector(
    "output")),
  $new = bind.call(Document.prototype.createElement, document),
  $text = bind.call(Document.prototype.createTextNode, document),
  $rnd = function() {
    return 0;
  },
  $promise = function(thenFn) {
    var args, promise, wait, slice = Array.prototype.slice,
      isResolved = false;
    var promise = {
      wait: function(ms) {
        wait = ms;
        return promise;
      },
      then: function() {
        args = slice.call(arguments);
        return promise = $promise(thenFn);
      },
      resolve: function() {
        isResolved = true;
        if (args) {
          var next = Function.prototype.bind.apply(thenFn, [undefined].concat(
            args).concat([promise]));
          wait ? setTimeout(next, wait) : next();
          if (jQuery.inArray("#", args) != -1) {
            bgMusic.pause();
            setTimeout("startGame()", 2500);
          }
        }
      }
    };
    return promise;
  };

var process = function(target, chars, promise) {
  var first = chars[0],
    rest = chars.slice(1);
  if (!first) {
    promise.resolve();
    return;
  }
  target.appendChild(first);
  setTimeout(process.bind(undefined, target, rest, promise), $rnd());
}

var type = function(text, promise) {
  var chars = text.split("").map($text);
  promise = promise || $promise(type);
  $append($new("br"));
  process($append($new("q")), chars, promise);
  return promise;
};
printToTerminal();

function printToTerminal() {
  $("#gameShow").hide();
  gamerControl = false;
  // Start WebSocket
  init('localhost:9081/liberty-demo-game/shipsocket');
  gameStarted = true;
  sendSocket("Hello Earthlings!");

  type("Initiating systems...")
    .then("Connecting to Target and Spaceship systems... ")
    .then("Engaging all Targets... OK")
    .wait(2500)
    .then("Starting the Spaceship... OK")
    .wait(4500)
    .then("Laser Energy output... 98.9%")
    .wait(1500)
    .then("All systems are green")
    .wait(1000)
    .then("#");
}

function showGameBoard() {
  $("#terminalShow").hide();
  $("#gameShow").show();
  gamerControl = true;
}

/***********************************************************
 *********************** WEB SOCKET ************************
 ***********************************************************/
function init(url) {
  console.log("init %o, %s, %s", websocket, url);
  if (websocket != null) {
    websocket.close();
    websocket = null;
  }

  // Set the URL, always reset the use_encoder attribute
  websocket_url = "ws://" + url;
  console.log(".. init %s, %s", url);

}


function sendSocket(payload) {
  console.log("sendSocket %o, %s", websocket, websocket_url);
  if (websocket === null) {
    websocket = new WebSocket(websocket_url);

    websocket.onerror = function(event) {
      console.log('Error: ' + event.data);
    }

    websocket.onopen = function(event) {
      console.log("Connection established!");
      // Start the Space Ship
      
      if (gameStarted)
        sendSocket("startShip");
    }

    websocket.onclose = function(event) {
      websocket = null;
      webSocketConnected = false;
      console.log("Connection closed : " + event.code);
    }

    websocket.onmessage = function(event) {
      console.log("Message" + event.data);
    }
  } else if (payload && gameStarted) {
	console.log("Sending message : ", payload);
    websocket.send(payload);
  }

  console.log(".. sendSocket %o, %s", websocket, websocket_url);
  return websocket;
}
