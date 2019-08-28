var target_status = document.getElementById('target_status');
var target_ip = document.getElementById('target_ip');
var target_button = document.getElementById('target_button');
var websocket = null;
var websocket_url = null;

//Run on the page load
$(getDevicesStatus());

/***********************
******* TARGETS ********
************************/
$("#target_button1").click(function() {
  sendDeviceCommandReq("targets", "target1");
});
$("#target_button2").click(function() {
  sendDeviceCommandReq("targets", "target2");
});
$("#target_button3").click(function() {
  sendDeviceCommandReq("targets", "target3");
});
$("#target_button4").click(function() {
  sendDeviceCommandReq("targets", "target4");
});
$("#target_button5").click(function() {
  sendDeviceCommandReq("targets", "target5");
});

$("#allup_button").click(function() {
  sendDeviceCommandReq("targets", "allup");
});
$("#alldown_button").click(function() {
  sendDeviceCommandReq("targets", "alldown");
});
$("#cycle_button").click(function() {
  sendDeviceCommandReq("targets", "cycle");
});
$("#hitupdate_button").click(function() {
  var hitvalue = $("#hitinput").val();
  sendDeviceCommandReq("targets", "hitupdate", hitvalue);
});
$("#litupdate_button").click(function() {
  var litvalue = $("#litinput").val();
  sendDeviceCommandReq("targets", "litupdate", litvalue);
});


/*************************
******* SPACESHIP ********
**************************/
$("#ship_sweep_pan_btn").click(function() {
  sendDeviceCommandReq("ship", "sweepPan");
});
$("#ship_sweep_tilt_btn").click(function() {
  sendDeviceCommandReq("ship", "sweepTilt");
});
$("#ship_firebutton").click(function() {
	sendDeviceCommandReq("ship", "fireLaser");
});
$("#ship_firebutton_off").click(function() {
	sendDeviceCommandReq("ship", "fireLaserOff");
});
$("#ship_reset").click(function() {
	sendDeviceCommandReq("ship", "resetShip");
});

function sendDeviceCommandReq(device, cmd){
    $.ajax({
      type: "POST",
      url: "http://localhost:9083/liberty-demo-admin/adminapp/admin/txcmd/"+ device +"/" + cmd,
      success: success,
      error: fail,
      dataType: "json"
    });
}

function sendDeviceCommandReq(device, cmd, value){
    $.ajax({
      type: "POST",
      url: "http://localhost:9083/liberty-demo-admin/adminapp/admin/txcmd/"+ device +"/" + cmd + "/" + value,
      success: success,
      error: fail,
      dataType: "json"
    });
}

function getDevicesStatus() {
  $.get("http://localhost:9083/liberty-demo-admin/adminapp/admin/devices/targets", function(data) {
    showDevicesStatus(data, "targets");
  });
  $.get("http://localhost:9083/liberty-demo-admin/adminapp/admin/devices/ship", function(data) {
    showDevicesStatus(data, "ship");
  });
}

function showDevicesStatus(data, device) {
  console.log("GET DATA: " + JSON.stringify(data));
  if (device === "targets") {
    if (data.targets_connected === "true") {
      target_status.textContent = "connected";
      target_ip.textContent = data.targets_ip;
    }
    else {
      target_button.disabled = false;
      target_status.textContent = "not connected";
    }
  } else if (device === "ship") {
      if (data.ship_connected === "true") {
        ship_status.textContent = "connected";
        ship_ip.textContent = data.ship_ip;
      } else {
        ship_button.disabled = false;
        ship_status.textContent = "not connected";
      }
  }
}

function success() {
  console.log("success!");
}

function fail() {
  alert("Device not connected!");
}



////////////////Socket Code/////////////////
//$(init('/SentryTargetChallenge/shipsocket'));
//sendSocket("Hello Earthlings!");

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
  websocket_url = "ws://" + window.document.location.host + url;
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
      // Initiate the Space Ship
      //sendSocket("WebSocket Opened");
    }

    websocket.onclose = function(event) {
      websocket = null;
      webSocketConnected = false;
      console.log("Connection closed : " + event.code);
    }

    websocket.onmessage = function(event) {
      console.log("Message" + event.data);
    }
  } else if (payload) {
	  if (websocket.readyState == 1) {
		  websocket.send(payload);
	  }
  }

  console.log(".. sendSocket %o, %s", websocket, websocket_url);
  return websocket;
}

$("#menuButton").click(function() {
  //cleanupSocket();
  $.ajax({
    type: "POST",
    url: "http://localhost:9083/liberty-demo-admin/adminapp/admin/disconnect",
    success: pageRedirect,
    error: fail,
    dataType: "json"
  });
});

function pageRedirect() {
  window.location.replace("index.html");
}

function cleanupSocket(){
     // Write your business logic here
     console.log('clean up socket');
     sendSocket("resetShip");
     websocket.close();
}


history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
};