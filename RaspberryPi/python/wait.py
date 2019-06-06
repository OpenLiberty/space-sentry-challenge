import LCD_1in44
import LCD_Config

from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont
from PIL import ImageColor
#from Tkinter import *

'''
def gif():
    canvas = Canvas(width = 300, height = 200, bg = 'yellow')
    canvas.pack(expand = YES, fill = BOTH)
    gif1 = PhotoImage(file = 'DrBunsen.gif')
    canvas.create_image(50, 10, image = gif1, anchor = NW)
    mainloop()
return
'''
font = ImageFont.truetype("ASMAN.TTF", 15)

def ifRunning(draw,contaner,location):
    if contaner==1:
        draw.text((77, location), 'Running', fill = "GREEN", font=font)
    else:
        draw.text((77, location), 'Stop', fill = "Red", font=font)
    return

def status(LCD,A,G,L,N,M):
    print ("***show container status")
    image = Image.new("RGB", (LCD.width, LCD.height), "BLACK")
    draw = ImageDraw.Draw(image)
    draw.text((2, 12), 'Admin:', fill = "WHITE", font=font)
    ifRunning(draw,A,12)
    draw.text((2, 37), 'Game:', fill = "WHITE", font=font)
    ifRunning(draw,G,37)
    draw.text((2, 62), 'Leaderboard:', fill = "WHITE", font=font)
    ifRunning(draw,L,62)
    draw.text((2, 87), 'nginx:', fill = "WHITE", font=font)
    ifRunning(draw,N,87)
    draw.text((2, 112), 'mango:', fill = "WHITE", font=font)
    ifRunning(draw,M,112)
    LCD.LCD_ShowImage(image,0,0)
    return

#try:
def main():
    LCD = LCD_1in44.LCD()
    
    print ("**********Init LCD**********")
    Lcd_ScanDir = LCD_1in44.SCAN_DIR_DFT  #SCAN_DIR_DFT = D2U_L2R
    LCD.LCD_Init(Lcd_ScanDir)
    
    status(LCD,1,1,1,0,1)
    
    #while (True):
    
if __name__ == '__main__':
    main()

#except:
#   print("except")
#   GPIO.cleanup()


