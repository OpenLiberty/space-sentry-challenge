package openliberty.sentry.demo.models;

public class GameStat {
	String pid;
	int score;
	
	public GameStat(String p, int s) {
		pid = p;
		score = s;
	}
	public String getPid() {
		return pid;
	}
	public void setPid(String pid) {
		this.pid = pid;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
}
