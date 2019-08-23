#!/bin/bash
sudo docker ps -aq
sudo docker stop $(sudo docker ps -aq)
sudo docker rm $(sudo docker ps -aq)
sudo docker rmi liberty-demo-leaderboard liberty-demo-game liberty-demo-nginx liberty-demo-admin nginx
