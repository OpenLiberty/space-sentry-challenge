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
 
#include <ESP8266WiFi.h>
#include <WiFiClient.h>

// Hardcode WiFi parameters as this isn't going to be moving around.
const char* ssid = "ol_demo_wifi";
const char* password = "was4ever";

// Start a TCP Server on port 5045
WiFiServer server(5045);
WiFiClient client;
void setup() {
  Serial.begin(9600);
  WiFi.begin(ssid,password);
  Serial.println("");
  //Wait for connection
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.print("Connected to "); Serial.println(ssid);
  Serial.print("IP Address: "); Serial.println(WiFi.localIP());
  
  // Start the TCP server
  server.begin();
  server.setNoDelay(1);
}

void loop() {
    if (!client.connected()) {
        // try to connect to a new client
        client = server.available();
        client.setNoDelay(1);
    } else {
        // read data from the connected client
        if (client.available() > 0) {
            String message = client.readStringUntil('\n');
            message.trim();
            Serial.println(message);
        }
    }
    
    if (Serial.available() > 0) {
      // read the incoming byte:
      String uno_resp = Serial.readStringUntil('\n');
      uno_resp.trim();
      // say what you got:
      client.println(uno_resp);
    }  
} 
/*
String  readWifiSerialMessage(){
  char value[100]; 
  int index_count =0;
  while(client.available()>0){
    value[index_count]=client.read();
    index_count++;
    value[index_count] = '\0'; // Null terminate the string
  }
  String str(value);
  str.trim();
  return str;
}*/
