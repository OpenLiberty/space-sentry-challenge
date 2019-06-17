import processing.serial.*;

Serial myPort;  // Create object from Serial class

void setup()
{
 size(200,200); //make our canvas 200 x 200 pixels big
 String portName = "/dev/cu.usbmodem141101"; //change the 0 to a 1 or 2 etc. to match your port
 myPort = new Serial(this, portName, 9600);
}

//void draw() {
// if (mousePressed == true)
// {                           //if we clicked in the window
//  myPort.write('w');         //send a 1
//  myPort.write(0);
//  delay(100);
//  //myPort.write('l');
//  println("w");
// } else
// {                           //otherwise
// myPort.write('0');          //send a 0
// }
//}

void draw() {
  if (keyPressed) {
    if (key == 'w' || key == 'W') {
      myPort.write('w');         //send a 1
      myPort.write(0);
      delay(100);
      println("w");
    }
  }
  if (keyPressed) {
    if (key == 's' || key == 'S') {
      myPort.write('s');         //send a 1
      myPort.write(0);
      delay(100);
      println("s");
    }
  }
  if (keyPressed) {
    if (key == 'd' || key == 'D') {
      myPort.write('d');         //send a 1
      myPort.write(0);
      delay(100);
      println("d");
    }
  }
  if (keyPressed) {
    if (key == 'a' || key == 'A') {
      myPort.write('a');         //send a 1
      myPort.write(0);
      delay(100);
      println("s");
    }
  }
  rect(25, 25, 50, 50);
}
