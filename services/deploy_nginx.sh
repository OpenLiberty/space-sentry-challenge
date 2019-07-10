#!/bin/bash
sudo docker build --tag=liberty-demo-nginx liberty-demo-nginx
sudo docker run --network=demo_net --ip=172.25.3.8 -itd --name webapp-nginx -v $PWD/liberty-demo-nginx/html:/usr/share/nginx/html -p 9084:80 liberty-demo-nginx