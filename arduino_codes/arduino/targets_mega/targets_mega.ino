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
const int servDown[5] = {25, 38, 30, 40, 70};
const int servUp[5] = {110, 130, 125, 125, 160};
const int limits[5] = {290, 290, 290, 290, 290};


bool visitedTarget[5] = {true, false, false, false, false};

//true means stand position
bool targetStatus[5] = {true, false, false, false, false};
bool game = false;

#define LIT_LIMIT 290  // laser usually hits 280-290. Ambient room lighting around 250

int lit_limit = 290;
int threshold = 150;  // thresle used to store the last LED status, to toggle the light


uint8_t servonum = 0;

bool DEBUG = true;   //show more logs

Servo servos[5];              //Declares the servo object 
int LDRValue = 0;         // result of reading the analog pin

void setup() {
  Serial.begin(9600);
  Serial1.begin(9600);
  //initialize target to down position except taget #1
  for (int i = 0; i < TOT_TARGETS; i++){
    servos[i].attach(DIGI_PINS[i]);
    if (i > 0)
       reverse(i);
    else
      forward(i);
  }

  delay(1000);
  Serial.println("Arduino setup completed!");
}



void loop() {
  if(Serial1.available()>0){
    String message = Serial1.readStringUntil('\n');
    Serial.println("received message from TCP Client: "+ message);
    if (message.length() > 2){
      if(find(message,"ping")){  //receives ping from wifi
          Serial1.println("ok");   
      } else if (find(message, "T_AU")){
        Serial1.println("ok");  
        allTargetsUp();
      } else if (find(message, "T_AD")){
        Serial1.println("ok");  
        allTargetsDown();
      } else if (find(message, "GSTR")){
        Serial1.println("ok");  
        gameCycleStart();
      } else if (find(message, "T_C")){
        Serial1.println("ok");  
        cycleTargets();
      } else if (find(message, "GG")){
         Serial1.println("ok");  
      } else if (find(message, "T_X")){
         Serial1.println("ok");  
         dataStreamTxTest();
      } else if (find(message, "T_T")) {
         Serial1.println("ok");  
         toggleTarget(message);
      } else if (find(message, "T_LV")) {
         Serial1.println("ok");  
         updateLitValue(message);
      } else if (find(message, "T_HV")) {
         Serial1.println("ok");  
         updateHitValue(message);
      } else{
        Serial1.println("NC");  
        Serial.println("\n"+ message + " is not a valid input");
      }
    }
  }
  delay(100);
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
      targetSensor = A2;
      break;
    case 1:
      targetSensor = A3;
      break;
    case 2:
      targetSensor = A4;
      break;
    case 3:
      targetSensor = A5;
      break;
    case 4:
      targetSensor = A6;
      break;
    default:
      // statements
      targetSensor = A2;
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

      if(Serial1.available()>0){
        String message = readWifiSerialMessage();
        if (find(message,"GG")){
          sendToWifi("resethit", 10, false);
          game = false;
        }
      }

      // Drive each servo one at a time
      //Serial.println(servonum);
      // read the sensor and store it in the variable sensorReading:
      visitedTarget[servonum] = true;
    //  convert sensor output value
      int targetSensor = getTargetSensor(servonum);
      
      int litValue = map(analogRead(targetSensor), 0, 1023, 0, 300);
      Serial.println(litValue);
      //Serial.println(touchValue);
      if (litValue > limits[servonum]) {      
          reverse(servonum);
          targetStatus[servonum] = false;
          Serial1.println("validhit");
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
  sendToWifi("validend", 10, false);
  delay(1000);
  sendToWifi("validend", 10, false);
}

void dataStreamTxTest(){
  int count = 0;
  delay(10000);
  while (count < 5){
    sendToWifi("validhit", 10, false);
    count++;
    delay(3000);
  }
  sendToWifi("validend", 10, false);
  delay(1000);
  sendToWifi("validend", 10, false);
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

void allTargetsDown() {
  for (int i = 0; i < 5; i++){
    visitedTarget[i] = false;
    targetStatus[i] = false;
    reverse(i);
    delay(200);
  }
}

void allTargetsUp(){
    for (int i = 0; i < 5; i++){
      visitedTarget[i] = false;
      targetStatus[i] = true;
      forward(i);
      delay(600);
    }
}

void cycleTargets(){
  allTargetsDown();
  int count = 0;
  while (count <5){
    while (visitedTarget[servonum]) {
      servonum = random(0,5);
    }
    count++;
    forward(servonum);
    visitedTarget[servonum] = true;
    targetStatus[servonum] = true;
    delay(500);   
    reverse(servonum);
    targetStatus[servonum] = false;
  }
  if (count == 5) {
    for (int i = 0; i < 5; i++) {
      visitedTarget[i] = false;
      count--;
    }
  }
}

void updateLitValue(String arg){
  int newLit = arg.substring(5).toInt();
  lit_limit = newLit;
  Serial.println("new lit limit is now" + String(lit_limit));
}

void updateHitValue(String arg){
  int newHit = arg.substring(5).toInt();
  threshold = newHit;
  Serial.println("new lit limit is now" + String(threshold));
}

void toggleTarget(String arg){
  if (arg.equals("T_T1")){
      toggleTarget(0);
  } else if (find(arg, "T_T2")){
      toggleTarget(1);
  } else if (find(arg, "T_T3")){
      toggleTarget(2);
  } else if (find(arg, "T_T4")){
      toggleTarget(3);
  } else if (find(arg, "T_T5")) {
      toggleTarget(4);
  } else{
      toggleTarget(0);
  }
}

void toggleTarget(int servNum){
  Serial.println("toggle target" + servNum);
  if (targetStatus[servNum] == false){
    forward(servNum);
    targetStatus[servNum] = true;
  } else {
    reverse(servNum);
    targetStatus[servNum] = false;
  }
}


/*
* Name: sendToWifi
* Description: Function used to send data to ESP8266.
* Params: command - the data/command to send; timeout - the time to wait for a response; debug - print to Serial window?(true = yes, false = no)
* Returns: The response from the esp8266 (if there is a reponse)
*/
String sendToWifi(String command, const int timeout, boolean debug){
  String response = "";
  Serial1.print(command); // send the read character to the esp8266

  return response;
}

/*
* Name: readWifiSerialMessage
* Description: Function used to read data from ESP8266 Serial.
* Params: 
* Returns: The response from the esp8266 (if there is a reponse)
*/
String  readWifiSerialMessage(){
  char value[20]; 
  int index_count =0;
  while(Serial1.available()>0){
    value[index_count]=Serial1.read();
    index_count++;
    value[index_count] = '\0'; // Null terminate the string
  }
  String str(value);
  str.trim();
  return str;
}