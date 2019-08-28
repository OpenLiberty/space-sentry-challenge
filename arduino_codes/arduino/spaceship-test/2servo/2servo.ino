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
 
#include <Servo.h>

Servo servoLeft;          // Define left servo
Servo servoRight;         // Define right servo
int posUD = 0;
int posLR = 0;

void setup() { 
  Serial.begin(9600);
  servoLeft.attach(10);  // Set left servo to digital pin 10
  servoRight.attach(9);  // Set right servo to digital pin 9
} 

void loop() {            // Loop through motion tests
  char rx_byte;

  if(Serial.available()>0){
    rx_byte = Serial.read();
  }
  if(rx_byte == 'w') {
    posUD+=20;
    if(posUD>180)posUD=180;
    forward();
    Serial.flush();
  }
  if(rx_byte == 's'){
    posUD-=20;
    if(posUD<0)posUD=0;
    reverse();
  }
  if(rx_byte == 'a'){
    posLR+=20;
    if(posLR>180)posLR=180;
    turnLeft();
  }
  if(rx_byte == 'd'){
    posLR-=20;
    if(posLR<0)posLR=0;
    turnRight();
  }
}

// Motion routines for forward, reverse, turns, and stop
void forward() {
  servoLeft.write(posUD);
  delay(10);
}

void reverse() {
  servoLeft.write(posUD);
  delay(10);
}

void turnRight() {
  servoRight.write(posLR);
  delay(10);
}

void turnLeft() {
  servoRight.write(posLR);
  delay(10);
}
