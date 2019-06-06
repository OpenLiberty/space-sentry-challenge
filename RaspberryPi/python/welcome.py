import LCD_1in44
import LCD_Config

from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont
from PIL import ImageColor
import pygame
import os

#try:
def main():

    LCD = LCD_1in44.LCD()
    
    print ("**********Init LCD**********")
    Lcd_ScanDir = LCD_1in44.SCAN_DIR_DFT  #SCAN_DIR_DFT = D2U_L2R
    LCD.LCD_Init(Lcd_ScanDir)

    image = Image.new("RGB", (LCD.width, LCD.height), "WHITE")
    draw = ImageDraw.Draw(image)
    
    image = Image.open('open.jpeg')
    LCD.LCD_ShowImage(image,0,0)
    #os.system("cvlc speech.wav")
    pygame.mixer.init()
    pygame.mixer.music.load("full.wav")
    pygame.mixer.music.play()
    #while pygame.mixer.music.get_busy() == True:
    #    continue
    LCD_Config.Driver_Delay_ms(900)
    
    print ("***draw text")
    font = ImageFont.truetype("ASMAN.TTF", 85)
    image = Image.new("RGB", (LCD.width, LCD.height), "BLACK")
    draw = ImageDraw.Draw(image)
    draw.text((33, 22), 'O', fill = "WHITE", font=font)
    LCD.LCD_ShowImage(image,0,0)
    LCD_Config.Driver_Delay_ms(200) 
    image = Image.new("RGB", (LCD.width, LCD.height), "BLACK")
    draw = ImageDraw.Draw(image)
    draw.text((33, 22), 'P', fill = "WHITE", font=font)
    LCD.LCD_ShowImage(image,0,0)
    LCD_Config.Driver_Delay_ms(200)
    image = Image.new("RGB", (LCD.width, LCD.height), "BLACK")
    draw = ImageDraw.Draw(image)
    draw.text((33, 22), 'E', fill = "WHITE", font=font)
    LCD.LCD_ShowImage(image,0,0)
    LCD_Config.Driver_Delay_ms(200)
    image = Image.new("RGB", (LCD.width, LCD.height), "BLACK")
    draw = ImageDraw.Draw(image)
    draw.text((33, 22), 'N', fill = "WHITE", font=font)
    LCD.LCD_ShowImage(image,0,0)
    LCD_Config.Driver_Delay_ms(200)
    
    font = ImageFont.truetype("ASMAN.TTF", 30)
    image = Image.new("RGB", (LCD.width, LCD.height), "BLACK")
    draw = ImageDraw.Draw(image)
    draw.text((12, 50), 'LIBERTY', fill = "WHITE", font=font)
    LCD.LCD_ShowImage(image,0,0)
    LCD_Config.Driver_Delay_ms(800)
    
    image = Image.new("RGB", (LCD.width, LCD.height), "BLACK")
    draw = ImageDraw.Draw(image)
    LCD.LCD_ShowImage(image,0,0)
    
    #while (True):
    
if __name__ == '__main__':
    main()

#except:
#   print("except")
#   GPIO.cleanup()

