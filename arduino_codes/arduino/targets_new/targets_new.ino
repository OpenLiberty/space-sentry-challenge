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
 
#include <Servo.h>        //The servo library we'll be using

//define total servos  
#define TOT_TARGETS 5


const int DIGI_PINS[5] = {3, 4, 5, 6, 7};
const int servDown[5] = {30, 35, 30, 35, 30};
const int servUp[5] = {115, 120, 125, 125, 133};


bool visitedTarget[5] = {true, false, false, false, false};

//true means stand position
bool targetStatus[5] = {true, false, false, false, false};
bool game = false;

#define LIT_LIMIT 1300  // laser usually hits 40-50. Ambient room lighting around 6-7

uint8_t servonum = 0;

String AP = "ol_demo_wifi";       // CHANGE ME
String PASS = "was4ever"; // CHANGE ME
char reply[500]; // you wouldn't normally do this
char ipAddress [20];
const bool printReply = true;
const char line[] = "-----\n\r";

bool DEBUG = true;   //show more logs

#define LDR A0            // Pin that outputs to the LDR : Analog Pin 0
Servo servos[5];              //Declares the servo object 
int LDRValue = 0;         // result of reading the analog pin
bool flag = true;         //Flag determines the position of the servo, 0 is 0 degrees, 1 is 180 degrees
int threshold = 800;      //Light intensity threshold for the LDR to trigger the servos



void setup() {
  Serial.begin(9600);

  //initialize target to down position except taget #1
  for (int i = 0; i < TOT_TARGETS; i++){
    servos[i].attach(DIGI_PINS[i]);
    if (i > 0)
       reverse(i);
  }

  delay(1000);
  Serial.println("Arduino setup completed!");
}



void loop() {
  gameCycleStart();
  delay(100);                       // wait a little
}


void forward(int servoNum) {
 servos[servoNum].write(servUp[servoNum]);
}


void reverse(int servoNum) {
 servos[servoNum].write(servDown[servoNum]);
}

int getTargetSensor(int servoNum) {
  int targetSensor = 0;
  switch (servoNum) {
    case 0:
      targetSensor = A6;
      break;
    case 1:
      targetSensor = A6;
      break;
    case 2:
      targetSensor = A6;
      break;
    case 3:
      targetSensor = A6;
    case 4:
      targetSensor = A6;
    default:
      // statements
      targetSensor = A6;
      break;
  }
  return targetSensor;
}

void gameCycleStart(){
  //cycleTargets();
  Serial.println("Game Cycle Start!");
  allTargetsDown();
  game = true;
  int count = 0;
  boolean servochanged = true;
  unsigned long startTime = millis();
  
  while (game) {

      // Drive each servo one at a time
      //Serial.println(servonum);
      // read the sensor and store it in the variable sensorReading:
      visitedTarget[servonum] = true;
    //  convert sensor output value
      int targetSensor = getTargetSensor(servonum);
      int litValue = analogRead(targetSensor);
      //int litValue = map(analogRead(targetSensor), 0, 1023, 0, 300);
      Serial.println(litValue);
      //Serial.println(touchValue);
      if (litValue > LIT_LIMIT) {      
          reverse(servonum);
          targetStatus[servonum] = false;
          //esp8266.println("validhit");
          if (count == 0){
            delay(500);
            //sendToWifi("\nvalidhit", 10, false);
          }
          count++;
          if (millis() - startTime > 62000){
            game = false;
            Serial.println("Exiting Game Cycle");
            break;
          }
          if (count > 0 && count % 5 == 0) {
            for (int i = 0; i < 5; i++) {
              visitedTarget[i] = false;
            }
          }
          servonum = random(0,5);
          while (visitedTarget[servonum]) {
            servonum = random(0,5);
          }
          servochanged = true;
          Serial.println("visitng servo");
          Serial.println(servonum);
          visitedTarget[servonum] = true;
          delay(2000);
      } else {
          if (millis() - startTime > 62000){
            game = false;
            Serial.println("Exiting Game Cycle");
            break;
          }
          forward(servonum);
          targetStatus[servonum] = true;
          if (servochanged){
            servochanged = false;
            delay(2000);
          }
      }
  }
  
  allTargetsDown();
  delay(1000);
}

void allTargetsDown() {
  for (int i = 0; i < 5; i++){
    visitedTarget[i] = false;
    targetStatus[i] = false;
    reverse(i);
    delay(200);
  }
}
