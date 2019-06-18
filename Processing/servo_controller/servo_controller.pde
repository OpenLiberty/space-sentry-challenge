import processing.serial.*;

import net.java.games.input.*;
import org.gamecontrolplus.*;
import org.gamecontrolplus.gui.*;

import cc.arduino.*;
import org.firmata.*;

ControlDevice cont;
ControlIO control;

Arduino arduino;

float thumb;

void setup() {
 size(360, 200); //controls window
 
 control = ControlIO.getInstance(this);
 cont = control.getMatchedDevice("ps4");
 
 if (cont == null) {
 println("Not a valid controller active");
 System.exit(-1);
}

//println(Arduino.list());
//String portname = "/dev/cu.usbmodem14201";
arduino = new Arduino(this, Arduino.list()[0], 57600);
//Arduino.list()[2] = portname;
  

arduino.pinMode(10, Arduino.SERVO);

}

public void getUserInput(){
  //assign float value 
  //access the controller
 thumb = map(cont.getSlider("servoPos").getValue(), -1, 1, 0, 180); //mapping provide a value based on input and servo signal boundary 
 
 //println(thumb); 
  
}

void draw(){
 getUserInput();
 background(0, 0, 0);
 background(thumb,100,255); 
 
 arduino.servoWrite(10, (int)thumb);
}
