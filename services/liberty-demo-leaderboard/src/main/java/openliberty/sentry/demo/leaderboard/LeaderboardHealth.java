package openliberty.sentry.demo.leaderboard;

import javax.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.health.Health;
import org.eclipse.microprofile.health.HealthCheck;
import org.eclipse.microprofile.health.HealthCheckResponse;


@Health
@ApplicationScoped
public class LeaderboardHealth implements HealthCheck {

  @Override
  public HealthCheckResponse call() {
  if (!LeaderboardResource.IS_CONNECTED) {
    return HealthCheckResponse.named(LeaderboardHealth.class.getSimpleName())
                              .withData("MongoDB", "not available").down()
                              .build();
  }
  return HealthCheckResponse.named(LeaderboardHealth.class.getSimpleName())
           
                            .withData("MongoDB", "available").up().build();
  }
  

}