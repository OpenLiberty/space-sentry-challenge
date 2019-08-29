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

package openliberty.sentry.demo.admin;

import java.io.IOException;
import javax.enterprise.context.ApplicationScoped;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import openliberty.sentry.demo.iot.tcp.TCPUtils;
import openliberty.sentry.demo.iot.Ship;
import openliberty.sentry.demo.iot.TargetArray;
import openliberty.sentry.demo.iot.tcp.TCPCommand;

@ApplicationScoped
@Path("admin")
public class AdminResource {

    @GET
    @Path("devices/{device}")
    @Produces(MediaType.APPLICATION_JSON)
	public JsonObject getDevicesStat(@PathParam("device")String device) {
    	
        // tag::method-contents[]
    	JsonObjectBuilder builder = Json.createObjectBuilder();
    	//return target and ship ip and port and connection status
    	if (device.equals("targets")) {
        	String targets_ip = "n/a";
        	int targets_port = -1;
        	boolean targets_connected = false;
        	TargetArray targets = TargetArray.getInstance();
        	if (targets != null) {
            	targets_ip = targets.getIP();
            	targets_port = targets.getPort();
            	targets_connected = targets.isConnected();
        	}
        	
        	builder.add("result", "success");
        	builder.add("targets_ip", targets_ip);
        	builder.add("targets_port", String.valueOf(targets_port));
        	builder.add("targets_connected", String.valueOf(targets_connected));
    		return builder.build();
    	}
    	
    	if (device.equals("ship")) {
    		String ship_ip = "n/a";
        	int ship_port = -1;
        	boolean ship_connected = false;
        	Ship spaceShip = Ship.getInstance();
        	if (spaceShip != null) {
            	ship_ip = spaceShip.getIP();
            	ship_port = spaceShip.getPort();
            	ship_connected = spaceShip.isConnected();
        	}
        	
        	builder.add("result", "success");
        	builder.add("ship_ip", ship_ip);
        	builder.add("ship_port", String.valueOf(ship_port));
        	builder.add("ship_connected", String.valueOf(ship_connected));
    		return builder.build();
    		
    	}

		return builder.build();
	}
    
    @POST
    @Path("txcmd/{device}/{cmd}{value : (/[0-9]+)?}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response postEspCmd(@PathParam("device")String device, @PathParam("cmd")String cmd, @PathParam("value")String value) {
        // tag::method-contents[]
    	JsonObjectBuilder builder = Json.createObjectBuilder();
    	System.out.println("Device: " + device + " Cmd: " + cmd + " Value: " + value);
    	//corner cases
    	if (device == null || device.isEmpty()) {
    		return Response.status(Response.Status.BAD_REQUEST)
                    .entity("ERROR: Device is not specified")
                        .build();
    	}
    	
    	if (!!!device.equals("targets") && !!!device.equals("ship")) {
    		return Response.status(Response.Status.BAD_REQUEST)
                    .entity("ERROR: Device unknown")
                        .build();  
    	}
    	
    	if (device.equals("targets")) {
    		TCPCommand tcmd = TCPUtils.convertRequestCmdStringToTCPCommand(device, cmd);
    		if (tcmd != null) {
    			TargetArray targets = TargetArray.getInstance();
    			if (targets != null) {
    				if (value != null && !!!value.equals("undefined")) {
    					targets.sendCommand(tcmd, value);
    				} else {
    					targets.sendCommand(tcmd);
    				}
    			} else
    				return Response.status(Response.Status.SERVICE_UNAVAILABLE)
    	                     .entity("ERROR: Device is not connected")
    	                         .build();
    		} else {
    			return Response.status(Response.Status.SERVICE_UNAVAILABLE)
	                     .entity("ERROR: unknown command")
	                         .build();
    		}
    	}
    	
    	if (device.equals("ship")) {
    		TCPCommand tcmd = TCPUtils.convertRequestCmdStringToTCPCommand(device, cmd);
    		if (tcmd != null) {
    			Ship spaceShip = Ship.getInstance();
    			if (spaceShip != null) {
    				if (value == null || value.equalsIgnoreCase("undefined"))
    					spaceShip.sendCommand(tcmd);
    				else
    					spaceShip.sendCommand(tcmd, value);
    			}
    			
    		} else {
    			return Response.status(Response.Status.SERVICE_UNAVAILABLE)
	                     .entity("ERROR: unknown command")
	                         .build();
    		}
    	}
    	
    	builder.add("result", "success"); 
    	return Response.ok(builder.build()).build(); 	
    }

    @POST
    @Path("disconnect")
    @Produces(MediaType.APPLICATION_JSON)
    public Response disconnectDevices() {
        // tag::method-contents[]
        JsonObjectBuilder builder = Json.createObjectBuilder();
        System.out.println("Disconnecting devices");
        TargetArray targets = TargetArray.getInstance();
        Ship spaceShip = Ship.getInstance();
        try {
        	if (targets != null)
        		targets.disconnect();
        	if (spaceShip != null)
        		spaceShip.disconnect();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return Response.status(Response.Status.SERVICE_UNAVAILABLE)
                    .entity(e.getMessage())
                        .build();
        }
        builder.add("result", "success"); 
        return Response.ok(builder.build()).build();    
    }
	
}
