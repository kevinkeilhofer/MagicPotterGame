# MagicPotterGame

MagicPotterGame ist ein spiel welches ...
Verwendete [Pixi.js](https://www.pixijs.com).

![Headline Picture](screenshot1.png)

[![](http://img.youtube.com/vi/ya_6I9IVMzY/0.jpg)](http://www.youtube.com/watch?v=ya_6I9IVMzY "")


## Aufbau

**Gamesite**
* **index.js:** Importierung von React und verschiedener CSS-Datein für die Schrift und Icons

* **index.html:** HTML-Teil für das das Frontend, greift auf den Container zurück wie die bundle.js

* **components/app.js:** Erstellt React-APP

* **components/weather.js:** Diese Komponente verwendet socket.io-client zur Übergabe von Koordinaten auf der Grundlage Ihrer aktuellen geografischen Position, die Koordinaten werden über die Socket-Verbindung an die Serverseite weitergegeben
  * `displayWeather()`:
  * `map(val, at_low1, to_high1, at_low2, to_high2)`: Diese Funktion wird in **weather.js** verwendet um die Farbwerte einer Farbtabelle von **npm colormap** zuzuweisen
  

**Machine Learning**
* **server/index.jsKNN Doodle Classifier:** 
 * Doodle Classifier (einem Convolutional Neural Network) unter Verwendung von tensorflow.js und tensorflow durchgeführt

- Verknüpfen mit Tensorflow JS

- Frontend

- eigenen Doodle-Klassen anpassen können

  * Zudem wird in dieser Datei der Arduino über den **Serialport** angesprochen um den LEDStrip zum leuchten zu bringen
   
* **server/routes/index.js:** empfängt Parameter - Längen- und Breitengrade - über die socket.io-Client- und Serververbindung
  * `getWeather( latitude, longitude, socket )`: Parameter werden zusammen mit einem Socket-Objekt übergeben. Die Funktion ruft eine importierte Wetterfunktion auf, die **openweathermap** api abfragt. Die zurückgegebenen Ergebnisse werden zusammen mit Wetterinformationen im Json-Format an das Wetterereignis ausgegeben      
    
* **server/routes/weather.js:** Greift auf die Wetterdaten von openweather zurück und schickt sie zurück zu weather   


## ToDos
* Gaming Frontend: Objekt- und Kollisionserkennung, Einbindung und Ausrichtund der richtigen Sprites und Sheets
* Machine Learning: KNN Doodle Classifier verknüpfen mit Tracker → verknüpfen mit Pixi.js
