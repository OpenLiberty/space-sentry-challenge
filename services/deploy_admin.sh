#!/bin/bash
sudo docker build --tag=liberty-demo-admin liberty-demo-admin
sudo docker run --network=demo_net --ip=172.25.3.7 -v $PWD/liberty-demo-adminServer/jvm.options:/opt/ol/wlp/usr/servers/liberty-demo-adminServer/jvm.options -itd --name admin -p 9083:9083 -p 9449:9449  liberty-demo-admin