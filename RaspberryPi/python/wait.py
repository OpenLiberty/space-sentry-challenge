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

font = ImageFont.truetype("Open.ttf", 11)
font2 = ImageFont.truetype("Open.ttf", 22)
buttonDown = Button("BCM19")
buttonUp = Button("BCM6")

def ifRunningDot(draw,state,location):
    if state=="UP":
        draw.ellipse((104,location-1,120,location+15),fill = "Green",outline = "Green")
    #elif state=="LOAD":
    #    draw.ellipse((106,location+1,118,location+13),fill = "Orange",outline = "Orange")
    else:
        draw.ellipse((106,location+1,118,location+13),fill = "Red",outline = "Red")
    return

def noUrl(draw):
    draw.text((10, 30), "No service", fill = "WHITE", font=font2)
    draw.text((15, 70), "Avaliable", fill = "WHITE", font=font2)
    
#try:
def main():
    LCD = LCD_1in44.LCD()
    
    print ("**********Init LCD**********")
    Lcd_ScanDir = LCD_1in44.SCAN_DIR_DFT  #SCAN_DIR_DFT = D2U_L2R
    LCD.LCD_Init(Lcd_ScanDir)
    
    #url = urlopen('http://localhost:9080/health')
    #data = json.loads(url.read().decode('utf-8'))
    
    #with open('sample.json') as f:
    #    data = json.load(f)
    #pprint(data)
    i=0
    location = 12
    while True:
        try:
            url = urlopen('http://localhost:9080/health')
            data = json.loads(url.read().decode('utf-8'))
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
        except:
            image = Image.new("RGB", (LCD.width, LCD.height), "BLACK")
            draw = ImageDraw.Draw(image)
            noUrl(draw)
            LCD.LCD_ShowImage(image,0,0)
            LCD_Config.Driver_Delay_ms(1000)
        
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


