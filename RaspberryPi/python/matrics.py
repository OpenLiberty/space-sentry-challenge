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
from prometheus_client.parser import text_string_to_metric_families
import requests
from requests.auth import HTTPBasicAuth
import os
#import numpy as np 
from matplotlib import pyplot as plt
#from numpy import empty
#from Tkinter import *

font = ImageFont.truetype("Open.ttf", 11)
font2 = ImageFont.truetype("Open.ttf", 22)
buttonDown = Button("BCM19")
buttonUp = Button("BCM6")

def plot(draw,state,location):
    if state=="UP":
        draw.ellipse((104,location-1,120,location+15),fill = "Green",outline = "Green")
    #elif state=="LOAD":
    #    draw.ellipse((106,location+1,118,location+13),fill = "Orange",outline = "Orange")
    else:
        draw.ellipse((106,location+1,118,location+13),fill = "Red",outline = "Red")
    return

def noUrl(draw):
    draw.text((10, 30), "No metrics", fill = "WHITE", font=font2)
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
    array = [0,0,0,0,0,0,0,0,0,0]
    while True:
        try:
        #metrics = urlopen('http://localhost:9080/metrics')
            i = 0
            while i<9:
                array[i]=array[i+1]
                i += 1
            os.system("./metrics.sh")
            with open('metrics.json') as f:
                plotdata = json.load(f)
            pprint(plotdata)
            memoryuse=plotdata.get('base').get('memory.usedHeap')
            print(memoryuse)
            array[9]= memoryuse
            maxCommited = plotdata.get('base').get('memory.committedHeap')
            print(maxCommited)
        #plotdata = metrics.read()
        #print(type(plotdata))
            LCD_Config.Driver_Delay_ms(1000)
            plt.rc_context({'axes.edgecolor':'white', 'xtick.color':'white', 'ytick.color':'white', 'figure.facecolor':'black'})
            plt.rcParams['axes.facecolor']='black'
            plt.rcParams['savefig.facecolor']='black'
            plt.figure(facecolor='black')
            plt.title("Memory Used Heap", fontsize=20,color='white')
            plt.ylim([0,maxCommited])
            plt.grid(1,which='major', axis='both', color='gray', linestyle='-', linewidth=2)
            #y = [0,1,2,3,4,5]
            #plt.yticks(y)
            #yticks = np.arange(0,5,0.5)
            #plt.yticks(range(0,5,1))
            plt.plot(array, linewidth = 6)
            #plt.show()
            plt.savefig("memoryuse.png")
            image = Image.new("RGB", (LCD.width, LCD.height), "BLACK")
            draw = ImageDraw.Draw(image)
            image = Image.open('memoryuse.png')
            resized_image = image.resize((128,128), Image.ANTIALIAS)
            resized_image.save('resized.png')
            LCD.LCD_ShowImage(resized_image,0,0)
        except:
            image = Image.new("RGB", (LCD.width, LCD.height), "BLACK")
            draw = ImageDraw.Draw(image)
            noUrl(draw)
            LCD.LCD_ShowImage(image,0,0)
            LCD_Config.Driver_Delay_ms(1000)
          
        #LCD_Config.Driver_Delay_ms(10000)
    
if __name__ == '__main__':
    main()

#except:
#   print("except")
#   GPIO.cleanup()
