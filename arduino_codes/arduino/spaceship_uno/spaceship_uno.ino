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

bool DEBUG = true;   //show more logs

/*********************************
    SERVO CONFIGURATION
**********************************/
Servo servoV;  // create servo object to control a servo
Servo servoH;  // create servo object to control a servo

// Initial Servo positions
int initVerPos = 128; //89
int initHorPos = 95;

// Initialize Servo positions
int currVerPos = initVerPos;
int currHorPos = initHorPos;

// Servo Min and Max positions
int servoVMin = 80; //30
int servoVMax = 180; //170
int servoHMin = 10;
int servoHMax = 170; 

// Servo increment/decrement step
int angleStepH = 5;
int angleStepV = 3; //6

/***********
    PINS
************/
// SERVO
const int SERVOPINV = 13;       // vertical servo (tilt)
const int SERVOPINH = 10;       // horizontal servo (pan)

// LEDs
const int LEDPIN1 = 4;
const int LEDPIN2 = 5;
const int LEDPIN3 = 6;
const int LEDPIN4 = 7;
const int LEDPIN5 = 8;
const int LEDPIN6 = 9;

// Array with Arduino pins containing LEDs in sequence
byte LEDpins[] = {4,5,6,7,8,9};

// LASER
const int LASERPIN = 11;

/*********************************
    GAME CONFIGURATION
**********************************/
bool isWifiConnected = true; // Default connected
bool isGameStarted = false;
bool laserOn = false;
bool game = false;

unsigned long previousMillis=0; // Will be used to track how long since last event "fired"
unsigned long interval = 170; // Delay to determine when we see the next LED
int LEDstate=0x01; // Variable to track which LED to turn on, start at 0001

void setup() {
  // Serial Communication between Arduino and Serial1 module
  Serial.begin(9600);
  Serial1.begin(9600);

  // Assign the pins to the Arduino
  // Led pins
  pinMode(LEDPIN1, OUTPUT);
  pinMode(LEDPIN2, OUTPUT);
  pinMode(LEDPIN3, OUTPUT);
  pinMode(LEDPIN4, OUTPUT);
  pinMode(LEDPIN5, OUTPUT);
  pinMode(LEDPIN6, OUTPUT);
  
  // Laser Pin
  pinMode(LASERPIN, OUTPUT);  

  // Servo Pins
  servoV.attach(SERVOPINV);
  servoH.attach(SERVOPINH);

  // Set initial start positions for servos
  servoV.write(initVerPos);
  servoH.write(initHorPos);   
  delay(1000);
  servoV.detach(); // Detach servos in order to prevent jitter
  servoH.detach();
  Serial.println("Arduino setup completed!");
}

void loop() {
  if (isWifiConnected && !isGameStarted) {
    cycleLeds();
  } 
  else {
    // Nothing is connected or started
    blinkLeds();
  }
  
  if(Serial1.available() > 0){
    String message = Serial1.readStringUntil('\n');
    if (message.length() > 2 && message.indexOf("?") == -1) {
      Serial.println("Received message from TCP Client: "+ message);
      if (find(message,"ping")){  //receives ping from wifi
          Serial1.println("ok");   
      } 
      else if (find(message, "GSTR")){
        Serial1.println("ok");   
        isGameStarted = true;
        gameCycleStart();
      } 
      else if (find(message, "GG")){
        Serial1.println("ok");   
        isGameStarted = false;
        resetShip();
      } 
      else if (find(message,"FIRE")){ // Fire Laser
        Serial1.println("ok");   
        fireLaser();
      }
      else if (find(message,"LSROFF")){ // Fire Laser
        Serial1.println("ok");   
        Serial.println("LASER OFF"); 
        fireLaserOff();
      } 
      else if (find(message,"PAN")){ // Fire Laser
        Serial1.println("ok");   
        Serial.println("Panning Spaceship"); 
        sweepPanShip(); 
      } 
      else if (find(message,"TILT")){ // Fire Laser
        Serial1.println("ok");   
        Serial.println("Tilting Spaceship"); 
        sweepTiltShip(); 
      } 
      else {
        Serial1.println("NC");
        Serial.println("\n"+ message + " is not a valid input");
      }
    }
  }
  delay(15);
}

void gameCycleStart() {
  Serial.println("Game Cycle Start!");
  game = true;
  if (isWifiConnected && isGameStarted) {
    turnOnAllLeds();
    sweepShip();
  }
  int gameTimer = 0;
  
   while (game) {
      if (Serial1.available() > 0){
        String message = Serial1.readStringUntil('\n');
        if (message.length() > 2 && message.indexOf("?") == -1){
            Serial.println("Received message from TCP Client for Game session: "+ message);
            if (find(message,"GG")){
              resetShip();
              Serial1.println("ok");   
            }
            else if (find(message,"LFT")){ // Horizontal servo angle Left
                Serial1.println("ok");   
                panSpaceShipLeft();
            }
            else if (find(message,"RGT")){ // Horizontal servo angle Right
                Serial1.println("ok");    
                panSpaceShipRight();
            }  
            else if (find(message,"UP")){ // Vertical servo angle Up
                Serial1.println("ok");   
                tiltSpaceShipUp();
            }
            else if (find(message,"DWN")){ // Vertical servo angle Down
                Serial1.println("ok");   
                tiltSpaceShipDown();
            }  
            else if (find(message,"FIRE")){ // Fire Laser
                fireLaser();
                Serial1.println("ok"); 
           }
        }
       }
       delay(15);
       if (laserOn) {
          gameTimer += 15;
       }
       if (laserOn && gameTimer >= 9000) {
          digitalWrite(LASERPIN, LOW); //Turn Laser off
          laserOn = false;
          gameTimer = 0;
       }      
   }
}

void resetShip() {
  game = false;
  isGameStarted = false;
  fireLaserOff();
  turnOffAllLeds();
  currHorPos = initHorPos;
  currVerPos = initVerPos;
  servoV.attach(SERVOPINV);
  servoH.attach(SERVOPINH);
  servoV.write(initVerPos); // reset servo positions
  servoH.write(initHorPos);
  delay(1000); 
  servoH.detach();
  servoV.detach();
}

void fireLaser() {
  Serial.println("FIRED"); 
  laserOn = true;
  digitalWrite(LASERPIN, HIGH); //Turn Laser on
}

void fireLaserOff() {
  laserOn = false;
  digitalWrite(LASERPIN, LOW); //Turn Laser off
}

void sweepShip() {
  sweepPanShip(); 
  sweepTiltShip(); 
}

void sweepPanShip() {
  int pos = 0;    // variable to store the servo position
  servoH.attach(SERVOPINH); //attach servo
  for (pos = servoHMin; pos <= servoHMax; pos += 1) { // goes from 0 degrees to 180 degrees
    // in steps of 1 degree
    servoH.write(pos);              // tell servo to go to position in variable 'pos'
    delay(25);                       // waits 15ms for the servo to reach the position
  }
  for (pos = servoHMax; pos >= initHorPos; pos -= 1) { // goes from 180 degrees to 0 degrees
    servoH.write(pos);              // tell servo to go to position in variable 'pos'
    delay(25);                       // waits 15ms for the servo to reach the position
  }
  servoH.detach();
}

void sweepTiltShip() {
  int pos = 0;    // variable to store the servo position
  servoV.attach(SERVOPINV); //attach servo
  for (pos = initVerPos; pos <= (servoVMax-20); pos += 1) { // goes from 180 degrees to 0 degrees
    servoV.write(pos);              // tell servo to go to position in variable 'pos'
    delay(25);                       // waits 15ms for the servo to reach the position
  }
  for (pos = (servoVMax-20); pos >= (servoVMin+10); pos -= 1) { // goes from 180 degrees to 0 degrees
    servoV.write(pos);              // tell servo to go to position in variable 'pos'
    delay(25);                       // waits 15ms for the servo to reach the position
  }
  for (pos = (servoVMin+10); pos <= initVerPos; pos += 1) { // goes from 0 degrees to 180 degrees
    // in steps of 1 degree
    servoV.write(pos);              // tell servo to go to position in variable 'pos'
    delay(25);                       // waits 15ms for the servo to reach the position
  }
  servoV.detach();
}


void panSpaceShipLeft() {
  if(!servoH.attached())
    servoH.attach(SERVOPINH);
  // LEFT
  currHorPos = servoH.read();
  if (currHorPos > servoHMin) {
    currHorPos = currHorPos - angleStepH;
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

void panSpaceShipRight() {
  if(!servoH.attached())
    servoH.attach(SERVOPINH);
  // RIGHT
  currHorPos = servoH.read();
  if (currHorPos < servoHMax) {
    currHorPos = currHorPos + angleStepH;
  }

  if (currHorPos > servoHMax) {
    Serial.print("reached right.");
    currHorPos = servoHMax;
  } 
  servoH.write(currHorPos);

  
  //Serial.print("Moved to: ");
  //Serial.print(currHorPos);   // print the angle
}

void tiltSpaceShipUp() {
  if(!servoV.attached())
    servoV.attach(SERVOPINV);
  // UP
  if (currVerPos < servoVMax) {
    currVerPos = currVerPos + angleStepV;
  }

  if (currVerPos > servoVMax) {
    currVerPos = servoVMax;
  } 
  servoV.write(currVerPos); // set servo to new angle
}

void tiltSpaceShipDown() {
  if(!servoV.attached())
    servoV.attach(SERVOPINV);
  // DOWN
  if (currVerPos > servoVMin) {
    currVerPos = currVerPos - angleStepV;
  }

  if (currVerPos < servoVMin) {
    currVerPos = servoVMin;
  } 
  servoV.write(currVerPos); // set servo to new angle
}


void blinkLeds() {
  turnOnAllLeds();
  delay(1000);
  turnOffAllLeds();
  delay(1000);
}

void cycleLeds() {
  for (int x=0; x < 6; x++)
    digitalWrite(LEDpins[x], bitRead(LEDstate,x));

  // Get current time and determine how long since last check
  unsigned long currentMillis = millis();
  if ((unsigned long)(currentMillis - previousMillis) >= interval) { 
    previousMillis = currentMillis;
 
      // Use "<<" to "bit-shift" everything to the left once
      LEDstate = LEDstate << 1;
      // 0x20 is the "last" LED, another shift makes the value 0x40
      if (LEDstate == 0x40) {
        // turn on the one before "0x01"
        LEDstate = 0x01;
      }
  }
}

void turnOnAllLeds() {
  digitalWrite(LEDPIN1, HIGH);    // turn on LED1 
  digitalWrite(LEDPIN2, HIGH);    // turn on LED2
  digitalWrite(LEDPIN3, HIGH);    // turn on LED3 
  digitalWrite(LEDPIN4, HIGH);    // turn on LED4
  digitalWrite(LEDPIN5, HIGH);    // turn on LED5
  digitalWrite(LEDPIN6, HIGH);    // turn on LED6    
}

void turnOffAllLeds() {
  digitalWrite(LEDPIN1, LOW);     // turn off LED1
  digitalWrite(LEDPIN2, LOW);     // turn off LED2
  digitalWrite(LEDPIN3, LOW);     // turn off LED3
  digitalWrite(LEDPIN4, LOW);     // turn off LED4
  digitalWrite(LEDPIN5, LOW);     // turn off LED5
  digitalWrite(LEDPIN6, LOW);     // turn off LED6
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

unsigned int degree2ms(unsigned int degrees)
{
  return  1000 + (degrees * 150  + 13) / 27;
}


