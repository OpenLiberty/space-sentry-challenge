package openliberty.sentry.demo.game.websocket;

import javax.websocket.CloseReason;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import openliberty.sentry.demo.iot.Ship;
import openliberty.sentry.demo.iot.tcp.TCPCommand;

@ServerEndpoint(value = "/shipsocket")
public class ShipSocket {
	Ship spaceShip = null;
	
	@OnOpen
	public void onOpen(Session session, EndpointConfig ec) throws Exception {
		// (lifecycle) Called when the connection is opened
		System.out.println("Websocket open!");
		spaceShip = Ship.getInstance();
	}

	@OnClose
	public void onClose(Session session, CloseReason reason) {
		// (lifecycle) Called when the connection is closed
		System.out.println("Websocket closed!");
	}

	@OnMessage
	public void receiveMessage(String message, Session session) throws Exception {
		// Called when a message is received. 
		// Single endpoint per connection by default --> @OnMessage methods are single threaded!
		// Endpoint/per-connection instances can see each other through sessions.

		System.out.println("Got a message: " + message);
		
		if (spaceShip != null) {
			if (message.equals("startShip")) {
				spaceShip.startShip();
			} 
			else if (message.equals("stopShip")) {
				spaceShip.stopShip();	
			}
			else if (message.contains("HL")) {
				System.out.println("Pan Direction: Left");
				spaceShip.sendCommand(TCPCommand.S_PANSHIP_LEFT);
			}			
			else if (message.contains("HR")) {
				System.out.println("Pan Direction: Right");
				spaceShip.sendCommand(TCPCommand.S_PANSHIP_RIGHT);
			}
			else if (message.contains("VU")) {
				System.out.println("Pan Direction: Up");
				spaceShip.sendCommand(TCPCommand.S_PANSHIP_UP);
			}			
			else if (message.contains("VD")) {
				System.out.println("Pan Direction: Down");
				spaceShip.sendCommand(TCPCommand.S_PANSHIP_DOWN);
			}
			else if (message.equals("fireLaser")) {
				spaceShip.sendCommand(TCPCommand.S_FIRELASER);
			} 
		}	
	}

	@OnError
	public void onError(Throwable t) {
		// (lifecycle) Called if/when an error occurs and the connection is disrupted
		System.out.println("Something went wrong! : " + t.getMessage());
	}
}
