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
import org.eclipse.microprofile.health.Health;
import org.eclipse.microprofile.health.HealthCheck;
import org.eclipse.microprofile.health.HealthCheckResponse;

@Health
@ApplicationScoped
public class MongoDBHealth implements HealthCheck {
	  @Override
	  public HealthCheckResponse call() {
	  if (!LeaderboardResource.IS_CONNECTED) {
	    return HealthCheckResponse.named(MongoDBHealth.class.getSimpleName())
	                              .withData("MongoDB", "not available").down()
	                              .build();
	  }
	  return HealthCheckResponse.named(MongoDBHealth.class.getSimpleName())
	           
	                            .withData("MongoDB", "available").up().build();
	  }
}
