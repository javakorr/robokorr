#include <SPI.h>
#include <WiFi.h>

#define DIRECTIONA 3
#define MOTORA 4

#define DIRECTIONB 6
#define MOTORB 5

String current_command = "";
String prev_command = String("DNTHNG");
boolean flag = 0;
 
char ssid[] = "TP-LINK_929252";      //  your network SSID (name)
char pass[] = "Jvk0rr3o91";   // your network password
int keyIndex = 0;            // your network key Index number (needed only for WEP)

int status = WL_IDLE_STATUS;

// Initialize the Wifi client library
WiFiClient client;

// server address:
char server[] = "robokorr.herokuapp.com";

unsigned long lastConnectionTime = 0;            // last time you connected to the server, in milliseconds
const unsigned long postingInterval = 2L * 1000L; // delay between updates, in milliseconds

void setup() {
  pinMode (MOTORA, OUTPUT);
  pinMode (DIRECTIONA, OUTPUT);
  pinMode (MOTORB, OUTPUT);
  pinMode (DIRECTIONB, OUTPUT);
  
  //Initialize serial and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }

  // check for the presence of the shield:
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    // don't continue:
    while (true);
  }

  // attempt to connect to Wifi network:
  while ( status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network. Change this line if using open or WEP network:
    status = WiFi.begin(ssid, pass);

    // wait 10 seconds for connection:
    delay(10000);
  }
}

void loop() {  
  while (client.available()) {    
     char c = client.read();
     
     if (flag == 1) {
       current_command += c;
     }
     
     if (c == '%') {
       flag = 1; 
     }
  }
  
  current_command.trim();
  
  if (current_command == "MVFRWRD") {
    analogWrite (MOTORA, 255);
    analogWrite (MOTORB, 255);
    
    digitalWrite (DIRECTIONA, 1); 
    digitalWrite (DIRECTIONB, 1);
    
    prev_command = "MVFRWRD";
  }
    
  else if (current_command == "DNTHNG") {
    analogWrite (MOTORA, 0);
    analogWrite (MOTORB, 0);
    
    prev_command = "DNTHNG";
  }
  
  else if (current_command == "MVBCK") {
    analogWrite (MOTORA, 255);
    analogWrite (MOTORB, 255);
    
    digitalWrite (DIRECTIONA, 0); 
    digitalWrite (DIRECTIONB, 0);
    
    prev_command = "MVBCK";
  }
  
  else if (current_command == "TRNRGHT") {
    if (prev_command != current_command) {
      analogWrite (MOTORA, 255);
      analogWrite (MOTORB, 255);
      
      digitalWrite (DIRECTIONA, 0); 
      digitalWrite (DIRECTIONB, 1);
      
      delay(500);
    }
    
    analogWrite (MOTORA, 0);
    analogWrite (MOTORB, 0);
    
    prev_command = "TRNRGHT";
  }
  
  else if (current_command == "TRNLFT") {
    if (prev_command != current_command) {
      analogWrite (MOTORA, 255);
      analogWrite (MOTORB, 255);
      
      digitalWrite (DIRECTIONA, 1); 
      digitalWrite (DIRECTIONB, 0);
      
      delay(500);
    }
      
    analogWrite (MOTORA, 0);
    analogWrite (MOTORB, 0);
    
    prev_command = "TRNLFT";
  }
  
  flag = 0;
  current_command = "";
  
  if (millis() - lastConnectionTime > postingInterval) {
    httpRequest();
  }
}

// this method makes a HTTP connection to the server:
void httpRequest() {
  // close any connection before send a new request.
  // This will free the socket on the WiFi shield
  client.stop();

  // if there's a successful connection:
  if (client.connect(server, 80)) {
    Serial.println("connecting...");
    // send the HTTP PUT request:
    client.println("GET /get_command HTTP/1.1");
    client.println("Host: robokorr.herokuapp.com");
    client.println("User-Agent: ArduinoWiFi/1.1");
    client.println("Connection: close");
    client.println();

    // note the time that the connection was made:
    lastConnectionTime = millis();
  }
  else {
    // if you couldn't make a connection:
    Serial.println("connection failed");
  }
}
