import LCD_1in44
import LCD_Config

from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont
from PIL import ImageColor
from urllib.request import urlopen
import json
from pprint import pprint
from gpiozero import Button
#from Tkinter import *

font = ImageFont.truetype("ASMAN.TTF", 15)
buttonDown = Button("BCM19")
buttonUp = Button("BCM6")

def ifRunningDot(draw,state,location):
    if state=="UP":
        draw.ellipse((96,location-1,112,location+15),fill = "Green",outline = "Green")
    elif state=="LOAD":
        draw.ellipse((98,location+1,110,location+13),fill = "Orange",outline = "Orange")
    else:
        draw.ellipse((100,location+3,108,location+11),fill = "Red",outline = "Red")
    return

#try:
def main():
    LCD = LCD_1in44.LCD()
    
    print ("**********Init LCD**********")
    Lcd_ScanDir = LCD_1in44.SCAN_DIR_DFT  #SCAN_DIR_DFT = D2U_L2R
    LCD.LCD_Init(Lcd_ScanDir)
    
    #url = urlopen('')
    #data = json.loads(url.read().decode('utf-8'))
    
    with open('sample.json') as f:
        data = json.load(f)
    pprint(data)
    i=0
    location = 12
    while True:
        image = Image.new("RGB", (LCD.width, LCD.height), "BLACK")
        draw = ImageDraw.Draw(image)
        while i<len(data.get('checks')):
            draw.text((4, location), data.get('checks')[i].get('name'), fill = "WHITE", font=font)
            ifRunningDot(draw,data.get('checks')[i].get('state'),location)
            i += 1
            location += 25
            if location>128:
                break
        LCD.LCD_ShowImage(image,0,0)
        LCD_Config.Driver_Delay_ms(1000)
        if location<128:
            i=0
        location = 12
        
        #LCD_Config.Driver_Delay_ms(10000)
        '''
        while True:
            if buttonDown.is_pressed:
                break
                '''
        #while (True):
    
if __name__ == '__main__':
    main()

#except:
#   print("except")
#   GPIO.cleanup()


