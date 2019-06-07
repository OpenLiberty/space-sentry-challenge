import LCD_1in44
import LCD_Config

from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont
from PIL import ImageColor
import pygame
import time

def shoot(LCD):
    pygame.mixer.init()
    pygame.mixer.music.load("laser.wav")
    pygame.mixer.music.play()
    time.sleep(1)
    image = Image.new("RGB", (LCD.width, LCD.height), "BLACK")
    draw = ImageDraw.Draw(image)
    #font = ImageFont.truetype('/usr/share/fonts/truetype/freefont/FreeMonoBold.ttf', 16)
    print ("***draw shooting screen")
    x1 = 28
    x2 = 100
    y1 = 96
    y2 = 128
    while x1<64 and x2>64 and y1>=0:
        draw.rectangle([(x1,y1),(x2,y2)],fill = "RED")
        x1 += 2
        x2 -= 2
        y1 -=32
        y2 -=32
        #time.sleep(0.0000001)
        LCD.LCD_ShowImage(image,0,0)    
    x1 = 28
    x2 = 100
    y1 = 96
    y2 = 128
    while x1<64 and x2>64 and y1>=0:
        draw.rectangle([(x1,y1),(x2,y2)],fill = "BLACK")
        x1 += 2
        x2 -= 2
        y1 -=32
        y2 -=32
        #time.sleep(0.0000001)
        LCD.LCD_ShowImage(image,0,0)
    return

def hit(LCD):
    image = Image.new("RGB", (LCD.width, LCD.height), "BLACK")
    draw = ImageDraw.Draw(image)
    #font = ImageFont.truetype('/usr/share/fonts/truetype/freefont/FreeMonoBold.ttf', 16)
    print ("***draw shooting screen")
    x = 64
    y = 64
    while x>=16 and y<=112:
        draw.rectangle([(x,x),(y,y)],fill = "GREEN")
        x -= 16
        y += 16
        #time.sleep(0.0000001)
        LCD.LCD_ShowImage(image,0,0)
    while x>=0 and y<=128:
        draw.rectangle([(x,x),(y,y)],fill = "BLUE")
        x -= 16
        y += 16
        #time.sleep(0.0000001)
        LCD.LCD_ShowImage(image,0,0)
        #'''     
    x = 64
    y = 64
    while x>=16 and y<=112:
        draw.rectangle([(x,x),(y,y)],fill = "Yellow")
        x -= 16
        y += 16
        #time.sleep(0.0000001)
        LCD.LCD_ShowImage(image,0,0)
    while x>=0 and y<=128:
        draw.rectangle([(x,x),(y,y)],fill = "Purple")
        x -= 16
        y += 16
        #time.sleep(0.0000001)
        LCD.LCD_ShowImage(image,0,0)
        
    x = 64
    y = 64
    while x>=16 and y<=112:
        draw.rectangle([(x,x),(y,y)],fill = "WHITE")
        x -= 16
        y += 16
        #time.sleep(0.0000001)
        LCD.LCD_ShowImage(image,0,0)
    while x>=0 and y<=128:
        draw.rectangle([(x,x),(y,y)],fill = "RED")
        x -= 16
        y += 16
        #time.sleep(0.0000001)
        LCD.LCD_ShowImage(image,0,0)
        #'''
    x = 64
    y = 64
    while x>=0 and y<=128:
        draw.rectangle([(x,x),(y,y)],fill = "BLACK")
        x -= 16
        y += 16
        #time.sleep(0.0000001)
        LCD.LCD_ShowImage(image,0,0)
    return

#try:
def main():
    LCD = LCD_1in44.LCD()
    
    print ("**********Init LCD**********")
    Lcd_ScanDir = LCD_1in44.SCAN_DIR_DFT  #SCAN_DIR_DFT = D2U_L2R
    LCD.LCD_Init(Lcd_ScanDir)
    
    shoot(LCD)
    hit(LCD)
    
    #while (True):
    
if __name__ == '__main__':
    main()

#except:
#   print("except")
#   GPIO.cleanup()


