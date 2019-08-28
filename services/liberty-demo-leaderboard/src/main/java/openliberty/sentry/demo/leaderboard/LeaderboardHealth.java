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

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.eclipse.microprofile.health.Health;
import org.eclipse.microprofile.health.HealthCheck;
import org.eclipse.microprofile.health.HealthCheckResponse;
import org.eclipse.microprofile.metrics.Counter;
import org.eclipse.microprofile.metrics.Metadata;
import org.eclipse.microprofile.metrics.MetricRegistry;
import org.eclipse.microprofile.metrics.MetricType;
import org.eclipse.microprofile.metrics.MetricUnits;

import java.net.URI;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.MediaType;


@Health
@ApplicationScoped
public class LeaderboardHealth implements HealthCheck {
	
	@Inject
	MetricRegistry registry;
	
	Metadata statsHitsCounterMetadata = new Metadata(
		    "statsHits",                                // name
		    "Stats Hits",                               // display name
		    "Number of hits on the /stats endpoint",    // description
		    MetricType.COUNTER,                         // type
		    MetricUnits.NONE);                          // units

	public boolean isHealthy() {
		try {
			String url = null;
			
		      try {
		      URI uri = new URI("http", null, "localhost", Integer.parseInt(System.getProperty("default.http.port")), "/", null, null);
		      
		      url = uri.toString();
		    //TODO: Take out metrics counter. Implemented for testing purpose  
			Counter statsHitsCounter = registry.counter(statsHitsCounterMetadata);
			statsHitsCounter.inc();
			
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
    return HealthCheckResponse.named(LeaderboardHealth.class.getSimpleName())
                              .withData("LeaderboardHealth", "not available").down()
                              .build();
  }
  return HealthCheckResponse.named(LeaderboardHealth.class.getSimpleName())
           
                            .withData("LeaderboardHealth", "available").up().build();
  }
  

}