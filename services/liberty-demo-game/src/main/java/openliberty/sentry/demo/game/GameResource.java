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

package openliberty.sentry.demo.game;

import java.util.HashMap;
import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.sse.OutboundSseEvent;
import javax.ws.rs.sse.Sse;
import javax.ws.rs.sse.SseEventSink;

import org.eclipse.microprofile.metrics.Counter;
import org.eclipse.microprofile.metrics.Metadata;
import org.eclipse.microprofile.metrics.MetricRegistry;
import org.eclipse.microprofile.metrics.MetricType;
import org.eclipse.microprofile.metrics.MetricUnits;

import openliberty.sentry.demo.models.Game;
import openliberty.sentry.demo.models.GameEvent;
import openliberty.sentry.demo.models.GameStat;


@ApplicationScoped
@Path("game")
public class GameResource {
	
	@Inject
	Game game;
	
	@Inject
	MetricRegistry registry;
	
	Metadata laserFiredByUserMetadata = new Metadata(
		    "CurrentUser",                                // name
		    "laser count",                               // display name
		    "number of laser fired by current user",    // description
		    MetricType.COUNTER,                         // type
		    MetricUnits.NONE);                          // units
	
    @POST
    @Path("/{playerid}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response newGame(@PathParam("playerid")String playerId){
        // tag::method-contents[]
    	JsonObjectBuilder builder = Json.createObjectBuilder();
 		Counter laserFiredByUserCounter = registry.counter(laserFiredByUserMetadata);
 		int currCount = (int) laserFiredByUserCounter.getCount();
     	 try {
     		laserFiredByUserCounter.dec(currCount);
        	game.newGameSession(playerId, true);
			
		} catch (Exception e1) {
			// TODO Auto-generated catch block
				e1.printStackTrace();
	    	 builder.add("result", "failed");
	    	 builder.add("reason", e1.getMessage());
	    	 return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
	                    .entity(builder.build())
	                        .build();
			
		}
    	builder.add("result", "success");
    	builder.add("playerId", playerId);
   	 	return Response.ok(builder.build())
                 .build();
    }
    
    @POST
    @Path("practice/{playerid}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response newPracticeGame(@PathParam("playerid")String playerId){
        // tag::method-contents[]
    	 JsonObjectBuilder builder = Json.createObjectBuilder();
     	 try {
     		game.newGameSession(playerId, false);
			
		} catch (Exception e1) {
			// TODO Auto-generated catch block
				e1.printStackTrace();
	    	 builder.add("result", "failed");
	    	 builder.add("reason", e1.getMessage());
	    	 return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
	                    .entity(builder.build())
	                        .build();
			
		}
    	builder.add("result", "success");
    	builder.add("playerId", playerId);
   	 	return Response.ok(builder.build())
                 .build();
    }
    
    @POST
    @Path("stopgame")
    @Produces(MediaType.APPLICATION_JSON)
    public Response stopCurrentGame() {
    	JsonObjectBuilder builder = Json.createObjectBuilder();
		try {
			game.stopCurrentSession();
			builder.add("result", "success");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			builder.add("result", "error");
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(builder.build())
                        .build();
		}
   	 	return Response.ok(builder.build())
                 .build();
    }
    
    @GET
    @Path("score")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getScore() {
    	JsonObjectBuilder builder = Json.createObjectBuilder();
    	builder.add("score", String.valueOf(game.getScore()));
    	if (game.isRanked()) {
        	List<GameStat> topScores = game.getTopScores();
        	JsonArrayBuilder jsonStatsArray = Json.createArrayBuilder();
        	for (GameStat stat: topScores) {
        		JsonObjectBuilder job = Json.createObjectBuilder().add("pid", stat.getPid()).add("score", String.valueOf(stat.getScore()));
        		jsonStatsArray.add(job);
        	}
        	builder.add("leaderboard", jsonStatsArray);    		
    	}
    	builder.add("result", "success");
    	return Response.ok(builder.build()).build();
    }
    
    @GET
    @Path("gamestream")
    @Produces(MediaType.SERVER_SENT_EVENTS)
    public void gameDataStream(@Context SseEventSink eventSink, @Context Sse sse){
    	try {
			game.startSession();
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
        Runnable r = new Runnable() {
            @Override
            public void run() {
            	int hitcount = 0;
            	while (game.isCurrentSessionRunning()){
            		//game = Game.getInstance();
                    game.waitForHitUpdate();
                    hitcount++;
                    GameEvent ge = new GameEvent();
                    ge.setScore(game.getScore());
                    OutboundSseEvent event = sse.newEventBuilder()
                            .mediaType(MediaType.APPLICATION_JSON_TYPE)
                            .data(GameEvent.class, ge)
                            .build();
                    eventSink.send(event);
                    System.out.println("Sending data "+ "hit" + hitcount);
            	}
            	System.out.println("Finished running on End points");
            	try {
					game.stopCurrentSession();
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
            	System.out.println("game cleaned up successfully");
            }
        };
        new Thread(r).start();   	
    }
}
