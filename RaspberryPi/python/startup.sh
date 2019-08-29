cd /home/pi/brianna/git/space-sentry-challenge/RaspberryPi/python
chmod +x welcome.py
python3 welcome.py
#sudo /home/pi/brianna/git/space-sentry-challenge/services/start.sh
cd /home/pi/brianna/git/space-sentry-challenge/RaspberryPi/python
chmod +x switch.py
nohup python3 switch.py >> outputswitch.log &
