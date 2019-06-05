package openliberty.sentry.demo.models;

import java.net.MalformedURLException;
import java.net.URL;
import java.net.UnknownHostException;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.ws.rs.ProcessingException;

import org.apache.commons.lang3.exception.ExceptionUtils;
import org.eclipse.microprofile.rest.client.RestClientBuilder;

import openliberty.sentry.demo.client.LeaderboardClient;
import openliberty.sentry.demo.client.UnknownUrlException;
import openliberty.sentry.demo.client.UnknownUrlExceptionMapper;

@ApplicationScoped
public class Game {

	GameSession session;
	boolean isRanked;
	LinkedList<GameStat> leaderBoardCache;
	
	private final String DEFAULT_PORT = "9082";
	
	private final String DEFAULT_HOST = "leaderboard";
	
	public boolean isCurrentSessionRunning() {
		return session.isRunning();
	}

	public void newGameSession(String pid, boolean ranked) throws Exception {
		session = new GameSession(pid, ranked);
		session.startGameSession();
		isRanked = ranked;
	}

	public void stopCurrentSession() throws Exception {
		session.deactivateTarets();
		if (session.isRankedGame) {
			GameStat stat = new GameStat(session.getPID(), session.getSessionScore());
			writeStatWithGivenHostName(DEFAULT_HOST, stat);
		}
	}

	public void startSession() throws Exception {
		session.activateTargets();
	}

	public int getScore() {
		return session.score;
	}
	
	public boolean isRanked() {
		return isRanked;
	}
	
	public List<GameStat> getTopScores(){
		return getTopScoreWithGivenHostName(DEFAULT_HOST);
	}

	public void waitForHitUpdate() {
		session.waitForHitUpdate();
	}

	// tag::builder[]
	private void writeStatWithGivenHostName(String hostname, GameStat gamestat) {
		String customURLString = "http://" + hostname + ":" + DEFAULT_PORT + "/liberty-demo-leaderboard/app/leaderboard";
		URL customURL = null;
		System.out.println("customURLString is: " + customURLString);
		try {
			Jsonb jsonb = JsonbBuilder.create(); 
			customURL = new URL(customURLString);
			LeaderboardClient customRestClient = RestClientBuilder.newBuilder().baseUrl(customURL)
					.register(UnknownUrlExceptionMapper.class).build(LeaderboardClient.class);
			String jsonStat = jsonb.toJson(gamestat);
			customRestClient.writeStat(jsonStat);
			if (leaderBoardCache == null)
				leaderBoardCache = new LinkedList<GameStat>();
			if (leaderBoardCache.size() < 5) {
				leaderBoardCache.add(gamestat);
			} else {
				if (gamestat.getScore() > leaderBoardCache.getLast().getScore()) {
					leaderBoardCache.removeLast();
					leaderBoardCache.addLast(gamestat);
				}
			}
			Collections.sort(leaderBoardCache, new Comparator<GameStat>() {
			    @Override
			    public int compare(GameStat g1, GameStat g2) {
			        if (g2.getScore() < g1.getScore())
			        	return -1;
			        else if (g2.getScore() > g1.getScore())
			        	return 1;
			        else
			        	return g2.getPid().compareTo(g1.getPid());
			    }
			});
		} catch (ProcessingException ex) {
			handleProcessingException(ex);
		} catch (UnknownUrlException e) {
			System.err.println("The given URL is unreachable.");
		} catch (MalformedURLException e) {
			System.err.println("The given URL is not formatted correctly.");
		}
	}
	
	private List<GameStat> getTopScoreWithGivenHostName(String hostname){
		String customURLString = "http://" + hostname + ":" + DEFAULT_PORT + "/liberty-demo-leaderboard/app/leaderboard";
		URL customURL = null;
		System.out.println("customURLString is: " + customURLString);
		try {
			if (leaderBoardCache == null) {
				leaderBoardCache = new LinkedList<GameStat>();
				customURL = new URL(customURLString);
				LeaderboardClient customRestClient = RestClientBuilder.newBuilder().baseUrl(customURL)
						.register(UnknownUrlExceptionMapper.class).build(LeaderboardClient.class);
				List<HashMap> resultMap = customRestClient.listLeaderBoard();	
				for (HashMap h: resultMap) {
					String pid = String.valueOf(h.get("pid"));
					int score = Integer.valueOf(String.valueOf(h.get("score")));
					GameStat stat = new GameStat(pid, score);
					leaderBoardCache.add(stat);
				}
			} 
			Collections.sort(leaderBoardCache, new Comparator<GameStat>() {
			    @Override
			    public int compare(GameStat g1, GameStat g2) {
			        if (g2.getScore() < g1.getScore())
			        	return -1;
			        else if (g2.getScore() > g1.getScore())
			        	return 1;
			        else
			        	return g2.getPid().compareTo(g1.getPid());
			    }
			});
			return leaderBoardCache;
			
		} catch (ProcessingException ex) {
			handleProcessingException(ex);
		} catch (UnknownUrlException e) {
			System.err.println("The given URL is unreachable.");
		} catch (MalformedURLException e) {
			System.err.println("The given URL is not formatted correctly.");
		}
		return null;
	}

	private void handleProcessingException(ProcessingException ex) {
		Throwable rootEx = ExceptionUtils.getRootCause(ex);
		if (rootEx != null && rootEx instanceof UnknownHostException) {
			System.err.println("The specified host is unknown.");
		} else {
			throw ex;
		}
	}

}
