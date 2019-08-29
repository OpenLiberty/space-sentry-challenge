## To midify IP address：

- For health: change the url in line url = urlopen('http://localhost:9082/health') under while loop(below try:) inside switch.py
- For Matrics: change the url in file matrics.sh

## To modify buttons:

- The buttons are assigned at the beginning of switch.py.
- API for using GPIO: https://gpiozero.readthedocs.io/en/stable/recipes.html
- Wiki and port info for LCD hat: http://www.waveshare.net/wiki/1.44inch_LCD_HAT

## To load python software:

- Install Python3 and the libary included inside switch.py.
- Run startup.sh as the start up script.
- Set up start up script: https://www.wikihow.com/Execute-a-Script-at-Startup-on-the-Raspberry-Pi

- You may want to set a higher priority of the space-sentry wifi internet on pi, so that pi can connect to it first when other wifi exist
