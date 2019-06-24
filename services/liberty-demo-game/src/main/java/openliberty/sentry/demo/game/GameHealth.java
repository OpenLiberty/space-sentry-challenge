package openliberty.sentry.demo.game;

import javax.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.health.Health;
import org.eclipse.microprofile.health.HealthCheck;
import org.eclipse.microprofile.health.HealthCheckResponse;

import java.net.URI;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.MediaType;


@Health
@ApplicationScoped
public class GameHealth implements HealthCheck {

	public boolean isHealthy() {
		try {
			String url = null;
			
		      try {
		      URI uri = new URI("http", null, "localhost", Integer.parseInt(System.getProperty("default.http.port")), "/", null, null);
		      
		      url = uri.toString();
		      }catch (Exception e) {
		      System.out.println("URISyntaxException");
		      }

		      Client client = ClientBuilder.newClient();
		      Response response = client.target(url).request(MediaType.APPLICATION_JSON)
		                                .get();
		      if (response.getStatus() != 200) {
		        return false;
		      }
		      return true;
		    } catch (Exception e) {
		      return false;
		    }
	}
	

  @Override
  public HealthCheckResponse call() {
  if (!isHealthy()) {
    return HealthCheckResponse.named(GameHealth.class.getSimpleName())
                              .withData("GameHealth", "not available").down()
                              .build();
  }
  return HealthCheckResponse.named(GameHealth.class.getSimpleName())
           
                            .withData("GameHealth", "available").up().build();
  }
  

}