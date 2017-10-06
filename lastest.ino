//INCLUDE REGION
#include "DHT.h"
#include "SSD1306.h"
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <WiFiManager.h>
#include <PubSubClient.h>

//PIN REGION
#define DHTPIN D6
#define measurePin A0
#define ledPower D5
#define SDA D2
#define SCL D1

// DEFINE REGION
#define DHTTYPE DHT21

// CONSTRUCTOR REGION
DHT dht(DHTPIN, DHTTYPE);
SSD1306  display(0x3c, SDA, SCL); // d1 sda 
WiFiClient espClient;
PubSubClient client(espClient);

//GLOBAL VARIABLES
float hum = 0,
      temp = 0;
int samplingTime = 280,
    deltaTime = 40,
    sleepTime = 9680;
float voMeasured = 0,
      calcVoltage = 0,
      dustDensity = 0;

const char* mqtt_server =  "seeyourair.com";
char msg[50];
const char* ssid     = "SYA_NODE_002";
const char* password = "12345678";

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
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void setupWIFIManager() {
  WiFiManager wifiManager;
  //reset saved settings
  //wifiManager.resetSettings();
  
    IPAddress ip(192,168,1,5); 
  IPAddress gw(192,168,1,1); 
  IPAddress sn(255,255,255,0); 
  
  //set custom ip for portal
  //wifiManager.setAPConfig(IPAddress(10,0,1,1), IPAddress(10,0,1,1), IPAddress(255,255,255,0));
  wifiManager.setAPStaticIPConfig(ip, gw, sn);
  //fetches ssid and pass from eeprom and tries to connect
  //if it does not connect it starts an access point with the specified name
  //here  "AutoConnectAP"
  //and goes into a blocking loop awaiting configuration
  wifiManager.autoConnect("SYA_NODE_002", "12345678");
  //or use this for auto generated name ESP + ChipID
  //wifiManager.autoConnect();

  //if you get here you have connected to the WiFi
  Serial.println("connected...yeey :)");
}

// FUNCTION
void dhtRead() {
  hum = dht.readHumidity();
  temp = dht.readTemperature();
}


void dustRead() {
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
  String x = "PM: " + String(dustDensity);
}

void showALL() {
  display.setTextAlignment(TEXT_ALIGN_LEFT);
  display.setFont(ArialMT_Plain_16);
  String x = String("D.Am: ") + String(hum) + "%";
  String y = "N.Do: " + String(temp) + char(0176) + "C";
  display.drawString(0, 0, x);
  display.drawString(0, 20, y);
  String z = "PM: " + String(dustDensity);
  display.drawString(0, 40, z);
  display.display();
}
void setup() {
  Serial.begin(9600);
  pinMode(ledPower, OUTPUT);
  dht.begin();
  display.init();
  display.clear();
  display.setTextAlignment(TEXT_ALIGN_LEFT);
  display.setFont(ArialMT_Plain_10);
  display.drawString(0, 0, "Connecting wifi...");
  display.display();
  setupWIFIManager();
  display.drawString(0, 0, "Connecting wifi: OK");
  display.drawString(0, 20, "Connecting mqtt...");
  display.display();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  display.drawString(0, 20, "MQTT server: OK");
  display.display();
}

void loop() {
  display.clear();
  dhtRead();
  dustRead();
  showALL();
  delay(3000);
}
