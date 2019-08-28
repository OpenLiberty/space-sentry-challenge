/*******************************************************************************
 * Copyright (c) 2019 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/

package openliberty.sentry.demo.game.websocket;

import java.io.IOException;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.websocket.CloseReason;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.eclipse.microprofile.metrics.Counter;
import org.eclipse.microprofile.metrics.Metadata;
import org.eclipse.microprofile.metrics.MetricRegistry;
import org.eclipse.microprofile.metrics.MetricType;
import org.eclipse.microprofile.metrics.MetricUnits;

import openliberty.sentry.demo.iot.Ship;
import openliberty.sentry.demo.iot.tcp.TCPCommand;

@ServerEndpoint(value = "/shipsocket")
@ApplicationScoped
public class ShipSocket {
	@Inject
	MetricRegistry registry;
	
	Metadata totalLaserFiredMetadata = new Metadata(
		    "totalLaser",                                // name
		    "total laser count",                               // display name
		    "total number of laser fired by all users",    // description
		    MetricType.COUNTER,                         // type
		    MetricUnits.NONE);                          // units
	
	Metadata laserFiredByUserMetadata = new Metadata(
		    "CurrentUser",                                // name
		    "laser count",                               // display name
		    "number of laser fired by current user",    // description
		    MetricType.COUNTER,                         // type
		    MetricUnits.NONE);                          // units
	
	Ship spaceShip = null;
	
	@OnOpen
	public void onOpen(Session session, EndpointConfig ec) throws Exception {
		// (lifecycle) Called when the connection is opened
		System.out.println("Websocket open!");
		spaceShip = Ship.getInstance();
	}

	@OnClose
	public void onClose(Session session, CloseReason reason) throws IOException {
		// (lifecycle) Called when the connection is closed
		System.out.println("Websocket closed!");
		spaceShip.disconnect();
	}

	@OnMessage
	public void receiveMessage(String message, Session session) throws Exception {
		// Called when a message is received. 
		// Single endpoint per connection by default --> @OnMessage methods are single threaded!
		// Endpoint/per-connection instances can see each other through sessions.
		
		Counter totalLasterCounter = registry.counter(totalLaserFiredMetadata);
		Counter laserFiredByUserCounter = registry.counter(laserFiredByUserMetadata);

		System.out.println("Got a message: " + message);
		
		if (spaceShip != null) {
			if (message.equals("startShip")) {
				long currentValue = laserFiredByUserCounter.getCount();
				laserFiredByUserCounter.dec(currentValue);
				
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
			else if (message.contains("H2L")) {
				System.out.println("Pan Direction: Left fast");
				spaceShip.sendCommand(TCPCommand.S_PANSHIP_LEFT_2);
			}			
			else if (message.contains("H2R")) {
				System.out.println("Pan Direction: Right fast");
				spaceShip.sendCommand(TCPCommand.S_PANSHIP_RIGHT_2);
			}
			else if (message.contains("V2U")) {
				System.out.println("Pan Direction: Up fast");
				spaceShip.sendCommand(TCPCommand.S_PANSHIP_UP_2);
			}			
			else if (message.contains("V2D")) {
				System.out.println("Pan Direction: Down fast");
				spaceShip.sendCommand(TCPCommand.S_PANSHIP_DOWN_2);
			}
			else if (message.equals("fireLaser")) {
				totalLasterCounter.inc();
				laserFiredByUserCounter.inc();
				spaceShip.sendCommand(TCPCommand.S_FIRELASER);
			} 
		}	
	}

	@OnError
	public void onError(Throwable t) throws Throwable {
		// (lifecycle) Called if/when an error occurs and the connection is disrupted
		t.printStackTrace();
	}
}
