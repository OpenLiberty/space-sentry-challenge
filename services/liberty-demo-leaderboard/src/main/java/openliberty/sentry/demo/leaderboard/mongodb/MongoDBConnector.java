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

package openliberty.sentry.demo.leaderboard.mongodb;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.bson.Document;

import com.mongodb.MongoClient;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoIterable;

import openliberty.sentry.demo.leaderboard.models.GameStat;
import openliberty.sentry.demo.leaderboard.models.MongoGameStat;

import org.eclipse.microprofile.metrics.Counter;
import org.eclipse.microprofile.metrics.Metadata;
import org.eclipse.microprofile.metrics.MetricRegistry;
import org.eclipse.microprofile.metrics.MetricType;
import org.eclipse.microprofile.metrics.MetricUnits;



@ApplicationScoped
public class MongoDBConnector {
	private static final String DBNAME = "demodb"; 
	private static final String COLLECTION = "gamestats"; 
	private static final String TESTDBNAME = "testdb"; 
	private MongoDatabase database;
	private MongoClient mongoClient;
	private MongoCollection<Document> statsCollection;
	public static boolean isConnected = false;
	
	boolean test = false;
	
	@Inject
	MetricRegistry registry;
	
	Metadata statsHitsCounterMetadata = new Metadata(
		    "statsHits",                                // name
		    "Stats Hits",                               // display name
		    "Number of hits on the /stats endpoint",    // description
		    MetricType.COUNTER,                         // type
		    MetricUnits.NONE);                          // units
	
	Metadata totalHits = new Metadata(
		    "totalHits",                                // name
		    "total Hits",                               // display name
		    "Number of total on the endpoint",    // description
		    MetricType.COUNTER,                         // type
		    MetricUnits.NONE);                          // units

	
	public MongoDBConnector() {
			mongoClient = new MongoClient("mongo", 27017);
	}
	
	public void connectDB(boolean testDB) {
			if (database == null) {
				if (testDB) {
					database = mongoClient.getDatabase(TESTDBNAME);
				}else {
					database = mongoClient.getDatabase(DBNAME);
				}if (!!!isCollectionExist(COLLECTION)) {
					database.createCollection(COLLECTION);
				}
				statsCollection = database.getCollection(COLLECTION);				
			}
	}
	
	public static boolean getIsConnected() {
		return isConnected;
	}
	
	private boolean isCollectionExist(final String cname) {
		try {
		    MongoIterable<String> collectionNames = database.listCollectionNames();
		    for (final String name : collectionNames) {
		        if (name.equalsIgnoreCase(cname)) {
		        	isConnected = true;
		            return true;
		        }
		    }
		    isConnected = true;
		    return false;
		}catch(Exception e) {
			isConnected = false;
			database = null;
			return false;
		}
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
		Counter statsHitsCounter = registry.counter(statsHitsCounterMetadata);
		Counter totalHitsCounter = registry.counter(totalHits);
		
		//TODO: Take out metrics counter. Implemented for testing purpose
		totalHitsCounter.inc();
		statsHitsCounter.inc();
		if(!test) {
			int curr = (int) statsHitsCounter.getCount();
			statsHitsCounter.dec(curr);
		}
		
		List<GameStat> topFive = new ArrayList<>();
		
		try {
		AggregateIterable<Document> output = this.statsCollection.aggregate(Arrays.asList(
		        //new Document("$group", new Document("_id","$_id").append("score", new Document("$max","$score"))),
		        new Document("$project",new Document("_id","$_id").append("playerId", "$playerId").append("score", 1)),
		        new Document("$sort", new Document("score", -1)),
		        new Document("$limit", 5)
				));
		
		
		for (Document dbObject : output)
		{
		    System.out.println(dbObject);
		    GameStat stat = new GameStat();
		    stat.setPid(dbObject.get("playerId").toString());
		    stat.setScore(Integer.parseInt(dbObject.get("score").toString()));
		    topFive.add(stat);			
		}
   	 	return topFive;

	}catch(Exception e) {
		isConnected = false;
		return topFive;
	}
}
}
