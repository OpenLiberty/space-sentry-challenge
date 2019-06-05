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

import openliberty.sentry.demo.leaderboard.models.GameStat;
import openliberty.sentry.demo.leaderboard.models.MongoGameStat;
import openliberty.sentry.demo.leaderboard.mongodb.MongoDBConnector;

@RequestScoped
@Path("/leaderboard")
public class LeaderboardResource {
	
	@Inject
	MongoDBConnector dbConnector;
	
	
    @GET
    @Path("top_scores")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listLeaderBoard() {
        // tag::method-contents[]
    	dbConnector.connectDB(false);
    	List<GameStat> topFive = dbConnector.getTopFive();
    	return Response.ok(topFive, MediaType.APPLICATION_JSON).build();
    }
    
    
    @POST
    @Path("write_score")
    @Consumes("application/json")
    @Produces("application/json")
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
