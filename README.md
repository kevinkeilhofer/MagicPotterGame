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
* **KNN Doodle Classifier**
* **index.html:**
  * Doodle Classifier (einem Convolutional Neural Network) unter Verwendung von tensorflow.js und tensorflow durchgeführt
  * Verknüpfen mit Tensorflow JS
  * eigenen Doodle-Klassen anpassen
* **sketch.js:**
  * Variablen definieren
  * function setup()
  * function addClass(classIndex)
  * async function guess()
  * function getInputImage()
  * function draw()
  * function clearCanvas()
  * function updateExampleCounts()
  * function clearClass(classIndex)
  * Doodle-Klassen speichern und herunterladen
  * trainierte Klassen laden ins Dokument
  
* **Zauberstabtracking**
  * Einbindung von JavaScript Library: tracking.js → dient zur Farb- und Objekterkennung
  * Das Tracking von Farben erfolgt anhand ihres RGB-Wertes, der vom Nutzer selbst festgelegt werden muss
  * Durch das Bewegen erstellt man einen Trail, bewegt man sich lange nicht ist das zeichnen beendet. Der Trail wird eingefügt in den Frame von dem KNN Doodle Classifier, dadurch kann der KNN Doodle Classifier klassifizieren was gezeichnet wurde
  * Trailpunkte angepasst an Zauberbewegungslänge


## ToDos
* Gaming Frontend: Objekt- und Kollisionserkennung, Einbindung und Ausrichtund der richtigen Sprites und Sheets
* Machine Learning: KNN Doodle Classifier verknüpfen mit Tracker → verknüpfen mit Pixi.js
