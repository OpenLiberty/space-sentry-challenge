var websocket = null;
var websocket_url = null;

init('http://localhost:9081/liberty-demo-game/shipsocket');

function init(test, url) {
	console.log("init %o, %s, %s", websocket, url);
	if ( websocket !== null ) {
		websocket.close();
		websocket = null;
	}

	// Set the URL, always reset the use_encoder attribute
	websocket_url = "ws://" + window.document.location.host + url;
	use_encoder = false;
	console.log(".. init %s, %s", url);


}


function send() {
	var txt = document.getElementById('inputmessage').value;
	sendSocket(txt);
}

function sendSocket(payload) {
	console.log("sendSocket %o, %s", websocket, websocket_url);
	if ( websocket === null ) {
		websocket = new WebSocket(websocket_url);

		websocket.onerror = function(event) {
			document.getElementById('messages').innerHTML += 'Error: ' + event.data + '<br />';
		}

		websocket.onopen = function(event) {
			document.getElementById('messages').innerHTML += 'Connection established<br />';
			if ( payload ) {
				websocket.send(payload);
			}
		}

		websocket.onclose = function(event) {
			websocket = null;
			document.getElementById('messages').innerHTML += 'Connection closed: ' + event.code + '<br />';
		}

		websocket.onmessage = function(event) {
			document.getElementById('messages').innerHTML += event.data + '<br />';
		}
	} else if ( payload ) {
		websocket.send(payload);
	}

	console.log(".. sendSocket %o, %s", websocket, websocket_url);
	return websocket;
}