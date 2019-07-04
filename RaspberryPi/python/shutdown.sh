cd /home/pi/brianna/guide-microprofile-health/finish && mvn liberty:stop-server
cd /home/pi/brianna/guide-microprofile-metrics/finish && mvn liberty:stop-server
cd /home/pi/brianna/git/space-sentry-challenge/RaspberryPi/python
pkill -f switch.py
sudo docker stop space_s
sudo docker rm space_s