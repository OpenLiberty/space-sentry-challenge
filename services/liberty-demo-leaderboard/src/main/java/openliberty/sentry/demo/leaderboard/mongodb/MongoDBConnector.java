package openliberty.sentry.demo.leaderboard.mongodb;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.enterprise.context.ApplicationScoped;

import org.bson.Document;

import com.mongodb.MongoClient;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoIterable;

import openliberty.sentry.demo.leaderboard.models.GameStat;
import openliberty.sentry.demo.leaderboard.models.MongoGameStat;

@ApplicationScoped
public class MongoDBConnector {
	private static final String DBNAME = "demodb"; 
	private static final String COLLECTION = "gamestats"; 
	private static final String TESTDBNAME = "testdb"; 
	private MongoDatabase database;
	private MongoClient mongoClient;
	private MongoCollection<Document> statsCollection;
	
	public MongoDBConnector() {
		mongoClient = new MongoClient("mongo", 27017);
	}
	
	public void connectDB(boolean testDB) {
		if (database == null) {
			if (testDB)
				database = mongoClient.getDatabase(TESTDBNAME);
			else
				database = mongoClient.getDatabase(DBNAME);
			
			if (!!!isCollectionExist(COLLECTION)) {
				database.createCollection(COLLECTION);
			}
			statsCollection = database.getCollection(COLLECTION);				
		}
	}
	
	private boolean isCollectionExist(final String cname) {
	    MongoIterable<String> collectionNames = database.listCollectionNames();
	    for (final String name : collectionNames) {
	        if (name.equalsIgnoreCase(cname)) {
	            return true;
	        }
	    }
	    return false;
	}
	
	
	public void insertStat(MongoGameStat stat){
		Document data = new Document();
		data.put("_id", stat.getId());
		data.put("playerId", stat.getPlayerId());
		data.put("score", stat.getScore());
		this.statsCollection.insertOne(data);;
	}
	
	public MongoGameStat getStat() {
		return null;
	}
	
	public void dropTestCollection() {
		if (database.getName().equals(TESTDBNAME)) {
			statsCollection.drop();
		}
	}
	
	public List<GameStat> getTopFive(){
		AggregateIterable<Document> output = this.statsCollection.aggregate(Arrays.asList(
		        //new Document("$group", new Document("_id","$_id").append("score", new Document("$max","$score"))),
		        new Document("$project",new Document("_id","$_id").append("playerId", "$playerId").append("score", 1)),
		        new Document("$sort", new Document("score", -1)),
		        new Document("$limit", 5)
				));
		
		List<GameStat> topFive = new ArrayList<>();
		for (Document dbObject : output)
		{
		    System.out.println(dbObject);
		    GameStat stat = new GameStat();
		    stat.setPid(dbObject.get("playerId").toString());
		    stat.setScore(Integer.parseInt(dbObject.get("score").toString()));
		    topFive.add(stat);			
		}
   	 	return topFive;

	}
}
