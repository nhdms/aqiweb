#include "DHT.h"
#include <Arduino.h>
#include <ESP8266WiFi.h>

#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <WiFiManager.h>

#include <PubSubClient.h>

#define DHTPIN 4     // what digital pin the DHT22 is conected to
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

const char* mqtt_server =  "203.162.131.246"; //"203.162.131.246";
WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0;
char msg[50];
int value = 0;
int led1 = 0; // bao ow
int led2 = 2; // guy phi
int led3 = 5; // goan ninh

int measurePin = A0;
int ledPower = D6;

int samplingTime = 280;
int deltaTime = 40;
int sleepTime = 9680;

float voMeasured = 0;
float calcVoltage = 0;
float dustDensity = 0;
float lasttemp = 0;
float lasthum = 0;
float lastpm = 0;


const char* ssid     = "SYA_NODE";
const char* password = "12345678";

//const char* ssid     = "MrAndMiss";
//const char* password = "12345678";


void setupWifiEsp8266() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print(WL_CONNECTED);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(WiFi.status());
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect, just a name to identify the client
    if (client.connect("NODE_001")) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      //client.subscribe("ROOT_01_CONTROL_EVENTS");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}


void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i=0;i<length;i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void setupWIFIManager() {
  WiFiManager wifiManager;
  //reset saved settings
  //wifiManager.resetSettings();

  //set custom ip for portal
  //wifiManager.setAPConfig(IPAddress(10,0,1,1), IPAddress(10,0,1,1), IPAddress(255,255,255,0));

  //fetches ssid and pass from eeprom and tries to connect
  //if it does not connect it starts an access point with the specified name
  //here  "AutoConnectAP"
  //and goes into a blocking loop awaiting configuration
  wifiManager.autoConnect("SYA_NODE");
  //or use this for auto generated name ESP + ChipID
  //wifiManager.autoConnect();


  //if you get here you have connected to the WiFi
  Serial.println("connected...yeey :)");
  digitalWrite(led2, HIGH);
}
void setup() {
  Serial.begin(115200);
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);
  digitalWrite(led1, HIGH);
  //  Serial.println("IP address: ");
  pinMode(ledPower, OUTPUT);
  setupWIFIManager();
  //setupWifiEsp8266();
  dht.begin();
  Serial.println("Setup");
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);

}

void loop() {
  digitalWrite(ledPower, LOW); // power on the LED
  delayMicroseconds(samplingTime);

  voMeasured = analogRead(measurePin); // read the dust value

  delayMicroseconds(deltaTime);
  digitalWrite(ledPower, HIGH); // turn the LED off
  delayMicroseconds(sleepTime);

  calcVoltage = voMeasured * (3.3 / 1024);

  dustDensity = 0.17 * calcVoltage - 0.1;

  Serial.print("Raw Signal Value (0-1023): ");
  Serial.print(voMeasured);

  Serial.print(" - Voltage: ");
  Serial.print(calcVoltage);

  Serial.print(" - Dust Density: ");
  Serial.println(dustDensity);

  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();

  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t)) {
    h = lasthum;
    t = lasttemp;
  } 

  // Compute heat index in Celsius (isFahreheit = false)
  float hic = dht.computeHeatIndex(t, h, false);
  Serial.print(" %Hum: ");
  Serial.print(h);
  Serial.print(" *C: ");
  Serial.println(hic);

  if (!client.connected()) {
    reconnect();
  }

  client.loop();
  String message = String(ESP.getChipId()) + " " + String(h) + " " + String(hic) + " " + String(dustDensity);
  char messageToSend[message.length() + 1];
  message.toCharArray(messageToSend, message.length() + 1);
  Serial.print(message);
  Serial.print(messageToSend);
  if(client.connected()){
       client.publish("NODE_001", messageToSend);
  }
  delay(10000);
}
