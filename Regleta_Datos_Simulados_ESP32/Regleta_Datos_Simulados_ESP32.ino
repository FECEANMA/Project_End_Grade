#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

#define WIFI_SSID     "FCC CORP."
#define WIFI_PASSWORD "18212004F"
#define SERVER_URL    "http://192.168.1.102:3000/energy/monitor" // Reemplaza con tu URL real

void setup() {
  Serial.begin(115200);

  // Conectar a WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando a WiFi...");
  }
  Serial.println("Conectado a WiFi!");
}

void loop() {
  // Simular datos de voltaje y corriente
  float voltage = readVoltage();
  float current = readCurrent();

  // Calcular la potencia (en watts)
  float power = voltage * current;

  Serial.printf("Voltaje: %.2f V, Corriente: %.2f A, Potencia: %.2f W\n", voltage, current, power);
  Serial.println(WiFi.localIP());


  // Enviar los datos al backend solo si la potencia es válida
  if (power > 0) {
    sendDataToBackend(voltage, current, power);
  }

  delay(5000);  // Espera 5 segundos antes de la siguiente lectura
}

float readVoltage() {
  // Simulación de voltaje entre 210V y 240V (por ejemplo)
  float simulatedVoltage = random(21000, 24000) / 100.0;
  return simulatedVoltage;
}

float readCurrent() {
  // Simulación de corriente entre 0.1A y 10A
  float simulatedCurrent = random(100, 1000) / 100.0;
  return simulatedCurrent;
}

void sendDataToBackend(float voltage, float current, float power) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(SERVER_URL);

    DynamicJsonDocument doc(1024);
    doc["voltage"] = voltage;
    doc["current"] = current;
    doc["power"] = power;


    String jsonData;
    serializeJson(doc, jsonData);

    http.addHeader("Content-Type", "application/json");

    int httpResponseCode = http.POST(jsonData);

    if (httpResponseCode > 0) {
  Serial.println("Datos enviados correctamente al backend!");
} else {
  Serial.println("Error en el envío de datos: " + String(httpResponseCode));
  Serial.println("Error detallado: " + http.errorToString(httpResponseCode));
}


    http.end();
  } else {
    Serial.println("Error: No hay conexión WiFi.");
  }
}
