#!/bin/bash
docker ps -aq
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)
docker rmi liberty-demo-leaderboard liberty-demo-game liberty-demo-nginx liberty-demo-admin
