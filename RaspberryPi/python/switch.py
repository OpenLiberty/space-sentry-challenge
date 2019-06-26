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
key1 = Button("BCM21")
key2 = Button("BCM20")

def ifRunningDot(draw,state,location):
    if state=="UP":
        draw.ellipse((104,location-1,120,location+15),fill = "Green",outline = "Green")
    #elif state=="LOAD":
    #    draw.ellipse((106,location+1,118,location+13),fill = "Orange",outline = "Orange")
    else:
        draw.ellipse((106,location+1,118,location+13),fill = "Red",outline = "Red")
    return

def noUrl(draw):
    draw.text((10, 30), "No data", fill = "WHITE", font=font2)
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
    array2 = [0,0,0,0,0,0,0,0,0,0]
    i=0
    location = 12
    while True:
        while True:
            if key2.is_pressed:
                while key2.is_pressed:
                    pass
                break
            try:
                url = urlopen('http://localhost:9082/health')
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
            
        while True:
            if key2.is_pressed:
                while key2.is_pressed:
                    pass
                break
            while (not key2.is_pressed):
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
                    if key1.is_pressed:
                        while key1.is_pressed:
                            pass
                        break     
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
                    plt.close()
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
                
            while (not key2.is_pressed):
                try:
                #metrics = urlopen('http://localhost:9080/metrics')
                    i = 0
                    while i<9:
                        array2[i]=array2[i+1]
                        i += 1
                    os.system("./metrics.sh")
                    with open('metrics.json') as f:
                        plotdata = json.load(f)
                    pprint(plotdata)
                    cpuload=plotdata.get('base').get('cpu.systemLoadAverage')
                    print(cpuload)
                    array2[9]= cpuload
                    #plotdata = metrics.read()
                    #print(type(plotdata))
                    if key1.is_pressed:
                        while key1.is_pressed:
                            pass
                        break
                    LCD_Config.Driver_Delay_ms(1000)
                    plt.rc_context({'axes.edgecolor':'white', 'xtick.color':'white', 'ytick.color':'white', 'figure.facecolor':'black'})
                    plt.rcParams['axes.facecolor']='black'
                    plt.rcParams['savefig.facecolor']='black'
                    plt.figure(facecolor='black')
                    plt.title("CPU Load Percentage", fontsize=20,color='white')
                    plt.ylim([0,1])
                    plt.grid(1,which='major', axis='both', color='gray', linestyle='-', linewidth=2)
                    #y = [0,1,2,3,4,5]
                    #plt.yticks(y)
                    #yticks = np.arange(0,5,0.5)
                    #plt.yticks(range(0,5,1))
                    plt.plot(array2, linewidth = 6, color='orange')
                    #plt.show()
                    plt.savefig("cpuload.png")
                    plt.close()
                    image = Image.new("RGB", (LCD.width, LCD.height), "BLACK")
                    draw = ImageDraw.Draw(image)
                    image = Image.open('cpuload.png')
                    resized_image = image.resize((128,128), Image.ANTIALIAS)
                    resized_image.save('cpuresized.png')
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

