chmod +x welcome.py
python3 welcome.py
sudo docker run -i -t -d --name space_s rasp-liberty:latest
cd /home/pi/brianna/guide-microprofile-health/finish && mvn liberty:start-server
cd /home/pi/brianna/guide-microprofile-metrics/finish && mvn install liberty:start-server
cd /home/pi/brianna/git/space-sentry-challenge/RaspberryPi/python
chmod +x switch.py
nohup python3 switch.py > outputswitch.log &