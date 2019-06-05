package openliberty.sentry.demo.leaderboard.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.Test;

import openliberty.sentry.demo.leaderboard.models.GameStat;
import openliberty.sentry.demo.leaderboard.models.MongoGameStat;
import openliberty.sentry.demo.leaderboard.mongodb.MongoDBConnector;


public class EndpointTest {
	
    //@Test
    public void testNewDataBase(){
    	System.out.println("test Data Base");
    	MongoDBConnector DB = new MongoDBConnector();
    	DB.connectDB(true);
    	DB.dropTestCollection();
    	MongoGameStat game1 = new MongoGameStat("A", 111);
    	DB.insertStat(game1);
    	MongoGameStat game2 = new MongoGameStat("B", 345);
    	DB.insertStat(game2);
    	MongoGameStat game3 = new MongoGameStat("C", 188);
    	DB.insertStat(game3);
    	MongoGameStat game4 = new MongoGameStat("D", 235);
    	DB.insertStat(game4);
    	MongoGameStat game5 = new MongoGameStat("E", 346);
    	DB.insertStat(game5);
    	MongoGameStat game6 = new MongoGameStat("F", 864);
    	DB.insertStat(game6);
    	MongoGameStat game7 = new MongoGameStat("G", 132);
    	DB.insertStat(game7);
    	List<GameStat> topFive = DB.getTopFive();
    	System.out.println(topFive.toString());
    	assertEquals("should return 5 elements in total", 5, topFive.size());
    	assertTrue("The first stat should be F", topFive.get(0).getPid().equals("F"));
    	assertTrue("The last stat should be C", topFive.get(4).getPid().equals("C"));
    	DB.dropTestCollection();
    }
}
