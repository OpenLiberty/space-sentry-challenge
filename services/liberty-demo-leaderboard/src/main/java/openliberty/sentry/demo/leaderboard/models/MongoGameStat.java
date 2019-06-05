package openliberty.sentry.demo.leaderboard.models;

import java.util.Date;
import java.util.concurrent.atomic.AtomicInteger;

import org.bson.types.ObjectId;

public class MongoGameStat {
	private ObjectId id;
	private String playerId;
	private int score;
	private static final AtomicInteger gameCounter = new AtomicInteger(0); 
	
	public MongoGameStat(String pid, ObjectId oid, int s) {
		// TODO Auto-generated constructor stub
		playerId = pid;
		id = oid;
		score = s;
	}
	
	public MongoGameStat(String pid, int s) {
		int gameId = gameCounter.incrementAndGet();
		id = new ObjectId(new Date(System.currentTimeMillis()), gameId);
		playerId = pid;
		score = s;
	}
	
	public String getPlayerId() {
		return playerId;
	}
	
	public int getScore() {
		return score;
	}	
	
	public int getGameId() {
		return id.getCounter();
	}
	
	public ObjectId getId() {
		return id;
	}
}
