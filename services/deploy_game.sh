#!/bin/bash
sudo docker build --tag=liberty-demo-game liberty-demo-game
sudo docker run --network=demo_net --ip=172.25.3.6 -itd -v $PWD/liberty-demo-gameServer/jvm.options:/opt/ol/wlp/usr/servers/liberty-demo-gameServer/jvm.options --name game -p 9081:9081 -p 9445:9445  liberty-demo-game