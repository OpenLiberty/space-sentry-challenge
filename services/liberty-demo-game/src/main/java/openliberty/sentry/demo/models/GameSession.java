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

package openliberty.sentry.demo.models;

import java.io.IOException;
import java.util.concurrent.atomic.AtomicBoolean;

import openliberty.sentry.demo.iot.TargetArray;


public class GameSession implements Runnable{
	
	private boolean running = false;
	private AtomicBoolean iswaiting = new AtomicBoolean(false);
	private TargetArray targets;
	boolean targetsActivated = false;
	boolean isRankedGame = true;
	
	int score;
	String playerId;
	
	public GameSession(String pid, boolean isRanked){
		playerId = pid;
		isRankedGame = isRanked;
		targets = TargetArray.getInstance();
	}
	
	public boolean isRunning() {
		return running;
	}
	
	public boolean isRankedGame() {
		return isRankedGame;
	}
	
	public String getPID (){
		return playerId;
	}
	
	public int getSessionScore() {
		return score;
	}
	
	public synchronized void updateScore(){
		score += 100;
	}
	
    public void startGameSession() throws Exception {
		if (targets == null) {
			throw new Exception("Targets array is not connected. Game cannot be started");
		}
    	running = true;
    	targets.cycleAllTargets();
        Thread t = new Thread(this);
        t.setDaemon(true);
        t.start();
    }
    
    public synchronized void deactivateTargets() throws Exception {
    	System.out.println("Stop game cycle");
    	if (targetsActivated)
    		targets.stopGameCycle();
    	targetsActivated = false;
    	running = false;
    	iswaiting.set(false);
    }
	
    public void activateTargets() throws Exception {
    	if (!!!running)
    		running = true;
		try {
			targets.connect();
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		targets.startGameCycle();
		targetsActivated = true;
    }
    
	public synchronized void waitForHitUpdate(){
        try {
        	System.out.println("putting the thread to wait");
        	iswaiting.set(true);
        	wait();
        } catch (InterruptedException ex) {
            ex.printStackTrace();
        }		
	}
	
	@Override
	public void run() {
		// TODO Auto-generated method stub
		System.out.println("Start game on new thread " + String.valueOf(running));
		while (running){
			if (iswaiting.get()) {
				System.out.println("Detect the other thread in wait");
				try {
					System.out.println("Entering try block");
					String rxData = targets.getData();
					System.out.println("received rxData: "+ rxData);
					if (rxData != null) {
						if (rxData.contains("hit")) {
				            synchronized(this) {
				            	iswaiting.set(false);
				            	updateScore();
				                this.notifyAll();
				            }
						} else if (rxData.contains("end")){
				            synchronized(this) {
				            	iswaiting.set(false);
				            	running = false;
				                this.notifyAll();
				            }
						}
					} else {
						throw new IOException("Device disconnected, end game sesion");
					}
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
		            synchronized(this) {
		            	iswaiting.set(false);
		            	running = false;
		                this.notifyAll();
		            }
				}				
			}
		}
		System.out.println("finished running on game thread");
	}

}
