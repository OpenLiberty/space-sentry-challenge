#!/bin/bash
sudo docker run --network=demo_net --ip=172.25.3.3 -itd --name mongo -p 27017:27017 mongo
sudo docker build --tag=liberty-demo-leaderboard liberty-demo-leaderboard
sudo docker run --network=demo_net --ip=172.25.3.4 -itd -v $PWD/liberty-demo-leaderboardServer/jvm.options:/opt/ol/wlp/usr/servers/liberty-demo-leaderboardServer/jvm.options --name leaderboard -p 9082:9082 -p 9447:9447  liberty-demo-leaderboard