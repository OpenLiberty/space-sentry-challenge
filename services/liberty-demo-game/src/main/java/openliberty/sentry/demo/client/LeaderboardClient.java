package openliberty.sentry.demo.client;

import java.util.HashMap;
import java.util.List;

import javax.enterprise.context.Dependent;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.ProcessingException;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.eclipse.microprofile.rest.client.annotation.RegisterProvider;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@Dependent
@RegisterRestClient
@RegisterProvider(UnknownUrlExceptionMapper.class)
public interface LeaderboardClient {
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/write_score")
	public Object writeStat(String gamestat) throws UnknownUrlException, ProcessingException;
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/top_scores")
	public List<HashMap> listLeaderBoard() throws UnknownUrlException, ProcessingException;
	
}
