# Liberty Space Sentry Challenge

## Introduction
Space Sentry Challenge is a fun and competitive laser tagging game build using Open Liberty, Arduinos and other IoT devices and circuitries.

## Prerequesites

1. Latest docker is installed
2. Git is installed
3. Bash Terminal or Git bash on Windows
4. Latest firmwares are installed on Spaceship and Target's Arduino boards
5. Wifi with SSID "ol_demo_wifi" and password "was4ever" 

## Local Deployment Instruction

1. Git clone the repository
```
git clone git@github.com:OpenLiberty/space-sentry-challenge.git
```

2. Run the following command
```
docker network create -d bridge --subnet 172.25.0.0/16 demo_net --attachable
```

3. Run the following command
```
./install.sh
```

## Start/Stop the Game

1. Start the Game
```
./start.sh
```

2. Go to the following URL to access the game. Use Firefox for best formatting.
```
http://localhost:9084
```

3. Stop the Game
```
./stop.sh
```

## Reconnecting hardware
After the hardwares being reconnected during demo, it is advised to redeploy admin and game serveices to avoid uncleaned Socket connections. Use the follow command to redeploy these two services.
```
./undeploy_admin.sh
./undeploy_game.sh
./deploy_admin.sh
./deploy_game.sh
```

## Uninstallation
```
./nuke_all.sh
```
