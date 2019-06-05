import LCD_1in44
import LCD_Config

from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont
from PIL import ImageColor
#from Tkinter import *

'''
def gif():
    # create the canvas, size in pixels
    canvas = Canvas(width = 300, height = 200, bg = 'yellow')
    # pack the canvas into a frame/form
    canvas.pack(expand = YES, fill = BOTH)
    # load the .gif image file
    # put in your own gif file here, may need to add full path
    # like 'C:/WINDOWS/Help/Tours/WindowsMediaPlayer/Img/mplogo.gif'
    gif1 = PhotoImage(file = 'DrBunsen.gif')
    # put gif image on canvas
    # pic's upper left corner (NW) on the canvas is at x=50 y=10
    canvas.create_image(50, 10, image = gif1, anchor = NW)
    # run it ...
    mainloop()
return
'''

#try:
def main():
    LCD = LCD_1in44.LCD()
    
    print ("**********Init LCD**********")
    Lcd_ScanDir = LCD_1in44.SCAN_DIR_DFT  #SCAN_DIR_DFT = D2U_L2R
    LCD.LCD_Init(Lcd_ScanDir)
    
    image = Image.new("RGB", (LCD.width, LCD.height), "WHITE")

    LCD.LCD_ShowImage(image,0,0)
    #LCD_Config.Driver_Delay_ms(500)
    
    image = Image.open('sky.bmp')
    LCD.LCD_ShowImage(image,0,0)
    
    #while (True):
    
if __name__ == '__main__':
    main()

#except:
#   print("except")
#   GPIO.cleanup()


