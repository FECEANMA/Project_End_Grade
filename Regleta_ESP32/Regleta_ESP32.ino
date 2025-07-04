#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

#define WIFI_SSID     "FCC CORP."
#define WIFI_PASSWORD "18212004F"
#define SERVER_URL    "http://192.168.1.102:4000/energy/monitor" // Reemplaza con tu URL real

// Pines de los sensores
#define VOLTAGE_PIN   34  // Pin analógico para el sensor de voltaje
#define CURRENT_PIN    35  // Pin analógico para el sensor de corriente

// Constantes para convertir la señal analógica en valores reales
#define VOLTAGE_OFFSET  2.5    // Ajusta según el offset de tu sensor ZMPT101B
#define VOLTAGE_SCALE   0.1    // Ajusta la escala para convertir la lectura en voltaje real
#define CURRENT_SCALE   0.185  // Este es el valor por defecto para ACS712 (0-5A)

void setup() {
  Serial.begin(115200);

  // Conectar a WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando a WiFi...");
  }
  Serial.println("Conectado a WiFi!");

  // Configurar los pines de los sensores
  pinMode(VOLTAGE_PIN, INPUT);
  pinMode(CURRENT_PIN, INPUT);
}

void loop() {
  // Leer datos de los sensores
  float voltage = readVoltage();
  float current = readCurrent();

  // Calcular la potencia (en watts)
  float power = voltage * current;

  Serial.printf("Voltaje: %.2f V, Corriente: %.2f A, Potencia: %.2f W\n", voltage, current, power);
  Serial.println(WiFi.localIP());


  // Enviar los datos al backend solo si la potencia está disponible
  if (power > 0) {
    sendDataToBackend(voltage, current, power);
  }

  // Esperar antes de volver a leer los datos
  delay(5000);  // Espera 5 segundos
}

float readVoltage() {
  // Leer el valor analógico del sensor de voltaje (0-1023)
  int sensorValue = analogRead(VOLTAGE_PIN);
  // Convertirlo a un valor de voltaje real
  float voltage = (sensorValue * (3.3 / 1023.0)) * 5.0;  // Suponiendo que el sensor ZMPT101B funciona en un rango de 0-5V
  return voltage;
}

float readCurrent() {
  // Leer el valor analógico del sensor de corriente (ACS712)
  int sensorValue = analogRead(CURRENT_PIN);
  // Convertirlo a un valor de corriente real
  float voltage = (sensorValue * (3.3 / 1023.0)); // Valor entre 0-3.3V
  float current = (voltage - 2.5) / CURRENT_SCALE;  // Ajuste de voltaje a corriente
  return current;
}

void sendDataToBackend(float voltage, float current, float power) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(SERVER_URL);

    // Crear un objeto JSON para enviar los datos
    DynamicJsonDocument doc(1024);
    doc["voltage"] = voltage;
    doc["current"] = current;
    doc["power"] = power;

    // Convertir el JSON a cadena
    String jsonData;
    serializeJson(doc, jsonData);

    // Establecer las cabeceras
    http.addHeader("Content-Type", "application/json");
    http.addHeader("x-api-key", "mi_clave_secreta_1234"); // <-- Aquí va tu clave API

    // Enviar la solicitud POST
    int httpResponseCode = http.POST(jsonData);

    // Verificar la respuesta
    if (httpResponseCode > 0) {
      Serial.println("Datos enviados correctamente al backend!");
    } else {
  Serial.println("Error en el envío de datos: " + String(httpResponseCode));
  Serial.println("Error detallado: " + http.errorToString(httpResponseCode));
    }

    // Cerrar la conexión HTTP
    http.end();
  } else {
    Serial.println("Error: No hay conexión WiFi.");
  }
}
