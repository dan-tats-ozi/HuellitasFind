#include <SoftwareSerial.h>
#include <TinyGPS++.h>

// SIM800L en SoftwareSerial (pines 6 RX, 7 TX)
SoftwareSerial sim800(6, 7); 
// GPS en SoftwareSerial (pines 4 RX, 5 TX)
SoftwareSerial gpsSerial(4 , 5); 
TinyGPSPlus gps;

const char phoneNumber[] = "+59178831211"; // tu número

bool smsInicialEnviado = false;
bool smsUbicacionEnviado = false;

void setup() {
  Serial.begin(9600);      // Monitor serial
  sim800.begin(9600);      
  gpsSerial.begin(9600);   

  delay(1000);

  // Enviar SMS inicial
  if (!smsInicialEnviado) {
    enviarSMS("Esperando ubicación...");
    smsInicialEnviado = true;
  }
}

void loop() {
  // Leer datos GPS y mostrar por serial
  while (gpsSerial.available()) {
    char c = gpsSerial.read();
    gps.encode(c);
    Serial.write(c);
  }

  // Enviar SMS con Google Maps solo si hay fix y aún no se envió
  if (!smsUbicacionEnviado && gps.location.isValid()) {
    String mensaje = "Ubicación: https://www.google.com/maps/place/";
    mensaje += String(gps.location.lat(), 6);
    mensaje += ",";
    mensaje += String(gps.location.lng(), 6);

    enviarSMS(mensaje);
    smsUbicacionEnviado = true;
  }
}

// Función para enviar SMS
void enviarSMS(const String &texto) {
  sim800.println("AT+CMGF=1"); // modo texto
  delay(500);
  sim800.print("AT+CMGS=\"");
  sim800.print(phoneNumber);
  sim800.println("\"");
  delay(500);
  sim800.print(texto);
  delay(500);
  sim800.write(26); // CTRL+Z
  delay(3000); // espera a que se envíe
}
