package io.openliberty.guides.system;

import javax.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.health.Health;
import org.eclipse.microprofile.health.HealthCheck;
import org.eclipse.microprofile.health.HealthCheckResponse;

import java.io.*;
import java.lang.Thread;

import com.mongodb.MongoClient;


@Health
@ApplicationScoped
public class LeaderboardHealth implements HealthCheck {



  public boolean isHealthy() {

      MongoClient mongoClient = new MongoClient("localhost", 27017);
      String path = System.getProperty("user.dir");
      int i = path.indexOf("liberty-demo-leaderboard");
      String path2 = path.substring(0,i);

      
      try{
         Thread.sleep(2000); //sleep for 2sec
         FileReader fr = new FileReader(path2 + "liberty-demo-leaderboard/target/liberty/wlp/usr/servers/liberty-demo-leaderboardServer/logs/messages.log");
         BufferedReader br = new BufferedReader(fr);
         String strLine;
         /* read log line by line */
         while((strLine = br.readLine()) != null){
          if(strLine.contains("MongoSocketOpenException")){
            return false;
          }
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
                              .withData("MongoDB", "not available").down()
                              .build();
  }
  return HealthCheckResponse.named(LeaderboardHealth.class.getSimpleName())
           
                            .withData("MongoDB", "available").up().build();
  }
  

}