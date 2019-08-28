/*******************************************************************************
 * Copyright (c) 2019 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
 
#include <Servo.h> // Include the Servo Library to control the servos


/*********************************
    ESP8266 MODULE CONFIGURATION
**********************************/
#define RX 2
#define TX 3

bool DEBUG = true;   //show more logs

/*********************************
    SERVO CONFIGURATION
**********************************/
Servo servoV;  // create servo object to control a servo
Servo servoH;  // create servo object to control a servo

// Initial Servo positions
int initVerPos = 95; //89
int initHorPos = 95;

// Initialize Servo positions
int currVerPos = initVerPos;
int currHorPos = initHorPos;

// Servo Min and Max positions
int servoVMin = 70; //30
int servoVMax = 120; //170
int servoHMin = 10;
int servoHMax = 170; 

// Servo increment/decrement step
int angleStepH = 2;
int angleStepV = 1; //6

int angleStepH2 = 10;
int angleStepV2 = 5; //6

/***********
    PINS
************/
// SERVO
const int SERVOPINV = 7;       // vertical servo (tilt)
const int SERVOPINH = 6;       // horizontal servo (pan)

void setup() {
  // put your setup code here, to run once:
  // Serial Communication between Arduino and ESP8266 module
  Serial.begin(9600);
  Serial2.begin(9600);

  // Servo Pins
  servoV.attach(SERVOPINV);
  servoH.attach(SERVOPINH);
  // Set initial start positions for servos
  servoV.write(initVerPos);
  servoH.write(initHorPos);   
  delay(1000);
  Serial.println("Arduino setup completed!");

}

void loop() {
  // put your main code here, to run repeatedly:

  if(Serial2.available() > 0){
    String message = Serial2.readStringUntil('\n');
    if (message.length() > 2 && message.indexOf("?") == -1) {
      Serial.println("Received message from TCP Client: "+ message);
      if (find(message,"ping")){  //receives ping from wifi
          Serial2.println("ok");   
      }
      else if (find(message,"LFT")) { // Horizontal servo angle Left
          Serial2.println("ok"); 
          panSpaceShipLeft(angleStepH);  
      }
      else if (find(message,"RGT")){ // Horizontal servo angle Right
          Serial2.println("ok");   
          panSpaceShipRight(angleStepH);
      }  
      else if (find(message,"UP")){ // Vertical servo angle Up
          tiltSpaceShipUp(angleStepV);
          Serial2.println("ok");   
      }
      else if (find(message,"DWN")){ // Vertical servo angle Down
          tiltSpaceShipDown(angleStepV);
          Serial2.println("ok");   
      }       
      else if (find(message,"L2FT")) { // Horizontal servo angle Left
          Serial2.println("ok"); 
          panSpaceShipLeft(angleStepH2);  
      }
      else if (find(message,"R2GT")){ // Horizontal servo angle Right
          Serial2.println("ok");   
          panSpaceShipRight(angleStepH2);
      }  
      else if (find(message,"U2P")){ // Vertical servo angle Up
          tiltSpaceShipUp(angleStepV2);
          Serial2.println("ok");   
      }
      else if (find(message,"D2WN")){ // Vertical servo angle Down
          tiltSpaceShipDown(angleStepV2);
          Serial2.println("ok");   
      }  else {
          Serial2.println("ok"); 
      }
    }
  }

}

void panSpaceShipLeft(int stepAngle) {
  if(!servoH.attached())
    servoH.attach(SERVOPINH);
  // LEFT
  currHorPos = servoH.read();
  if (currHorPos > servoHMin) {
    currHorPos = currHorPos - stepAngle;
  }
  if (currHorPos < servoHMin) {
     Serial.print("reached left.");
     currHorPos = servoHMin;
  } 
  servoH.write(currHorPos);
   // set servo to new angle
  
  //Serial.print("Moved to: ");
  //Serial.print(currHorPos);   // print the angle
}

void panSpaceShipRight(int stepAngle) {
  if(!servoH.attached())
    servoH.attach(SERVOPINH);
  // RIGHT
  currHorPos = servoH.read();
  if (currHorPos < servoHMax) {
    currHorPos = currHorPos + stepAngle;
  }

  if (currHorPos > servoHMax) {
    Serial.print("reached right.");
    currHorPos = servoHMax;
  } 
  servoH.write(currHorPos);

  
  //Serial.print("Moved to: ");
  //Serial.print(currHorPos);   // print the angle
}

void tiltSpaceShipUp(int stepAngle) {
  if(!servoV.attached())
    servoV.attach(SERVOPINV);
  // UP
  if (currVerPos < servoVMax) {
    currVerPos = currVerPos + stepAngle;
  }

  if (currVerPos > servoVMax) {
    currVerPos = servoVMax;
  } 
  servoV.write(currVerPos); // set servo to new angle
}

void tiltSpaceShipDown(int stepAngle) {
  if(!servoV.attached())
    servoV.attach(SERVOPINV);
  // DOWN
  if (currVerPos > servoVMin) {
    currVerPos = currVerPos - stepAngle;
  }

  if (currVerPos < servoVMin) {
    currVerPos = servoVMin;
  } 
  servoV.write(currVerPos); // set servo to new angle
}


/*
* Name: find
* Description: Function used to match two string
* Params: 
* Returns: true if match else false
*/
boolean find(String string, String value){
  if(string.indexOf(value)>=0)
    return true;
  return false;
}


