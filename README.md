# MagicPotterGame


[![](http://img.youtube.com/vi/ya_6I9IVMzY/0.jpg)](http://www.youtube.com/watch?v=ya_6I9IVMzY "")


## Full Stack Architektur

... bild ....

**Framework Pixi.js**
* **index.html:** HTML-Teil für das das Frontend, greift auf app.js zurück

* **app.js:** Einbindung verschiedener Funktionen, Objekte und Overlays (Beispiel Menü, Fullscreen), Einbindung JSON-Files aus Asset-Ordner


  

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
