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

package openliberty.sentry.demo.leaderboard;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.eclipse.microprofile.metrics.annotation.Counted;
import org.eclipse.microprofile.metrics.annotation.Timed;

import openliberty.sentry.demo.leaderboard.models.GameStat;
import openliberty.sentry.demo.leaderboard.models.MongoGameStat;
import openliberty.sentry.demo.leaderboard.mongodb.MongoDBConnector;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.*;
import org.eclipse.microprofile.faulttolerance.*;

@RequestScoped
@Path("/leaderboard")
public class LeaderboardResource {	
	@Inject
	MongoDBConnector dbConnector;
	
	public static boolean IS_CONNECTED;
	
    @GET
    @Path("top_scores")
    @Produces(MediaType.APPLICATION_JSON)
    @APIResponse(
                responseCode = "500",
                description = "Service unavilable")
    @Operation(
            summary = "Get top five users for the leaderboard",
            description = "Retrieves and returns top five users from the mongo databse")
    @Timeout(2000)
    public Response listLeaderBoard() {
        // tag::method-contents[]
    	dbConnector.connectDB(false);
    	IS_CONNECTED = dbConnector.getIsConnected();
    	List<GameStat> topFive = dbConnector.getTopFive();
    	return Response.ok(topFive, MediaType.APPLICATION_JSON).build();
    }
    
    
    @POST
    @Path("write_score")
    @Consumes("application/json")
    @Produces("application/json")
    @Operation(
            summary = "writes score")
    public Response writeStat(String gamestat) {
    	if (gamestat == null) {
    		return Response.noContent().build();
    	} else {
    		Jsonb jsonb = JsonbBuilder.create(); 
    		dbConnector.connectDB(false);
    		GameStat gstat = jsonb.fromJson(gamestat, GameStat.class);
    		MongoGameStat mstat = new MongoGameStat(gstat.getPid(), gstat.getScore());
    		dbConnector.insertStat(mstat);
    		return Response.ok(gamestat, MediaType.APPLICATION_JSON).build();
    	}
    }
}
