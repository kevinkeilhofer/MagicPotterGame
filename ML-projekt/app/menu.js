import { app } from "./pixi-app.js";
import * as PIXI from "./pixi.js";
import keyboard from "./keyboard.js";

// create a menuscreen once this module in loaded
let menuscreen;


// enable menuscreen key combo
export default function initMenuScreenShortcut(key = "m", modifier) {

	const key1 = keyboard(key);
	const key2 = modifier && keyboard(modifier);
	key1.release = () => {
		if (!key2 || key2.isDown) toggleMenuScreen();
  };

  // create and add menuscreen
  menuscreen = createMenuScreen();
  app.stage.addChild(menuscreen);

}

function toggleMenuScreen() {
  menuscreen.visible = !menuscreen.visible;
}

// create help screen
function createMenuScreen() {

  let headerStyle = {
    fontFamily: "Harry P",
    fontSize: 120,
    letterSpacing: 0,
    fill: ['#806700', '#DFB400', '#806700'], //Farbverlauf
    align: "left",
    // strokeThickness: 1,
    // stroke: "#000",
     dropShadow: true,
     dropShadowBlur: 3,
     dropShadowColor: "#3E3E3E",

  };

  let keyStyle = {
    fontFamily: "Hack",
    fontSize: 40,
    fill: "#fff",
    align: "left",
    // dropShadow: true,
    // dropShadowDistance: 1,
    // dropShadowColor: "#999999",
  };

  let valueStyle = {
    fontFamily: "Hack",
    fontSize: 24,
    //letterSpacing: 3,
    fill: "#868686",
    align: "left",
    whiteSpace: 'pre', 
  };

  let shortcuts = {  //müssen hier immer alle shortcuts aufgeführt werden?
    'a - d': 'Bewegungsrichtung links/ rechts', // menu soll sich auch über einen Button öffnen!
    'Space': 'Springen / Hüpfen',
    'Enter': 'Objektinteraktion starten',
    'f': 'In den Vollbildmodus wechseln'
  }

  let menuscreen = new PIXI.Container();
  menuscreen.x = 50;
  menuscreen.y = 50;
  menuscreen.visible = false;

  // draw menu screen box
  let bg = new PIXI.Graphics();
  bg.alpha = 0.9;                         // opacity
  // bg.lineStyle(10, 0x000000, 0.7, 1);  // Linienstil (0,5 = Mitte, 1 = Außen, 0 = Innen) ?
  bg.beginFill(0x000000);                 
  bg.drawRoundedRect(0, 0, 1100, 700, 32);
  bg.endFill();
  menuscreen.addChild(bg);

  // display header
  const header = new PIXI.Text("Menu", headerStyle);
  header.x = 50;
  header.y = 50;
  menuscreen.addChild(header);

  let y = 250;

  // Buttons für "Spiel verlassen" und "Neustarten"
  // const sprite = new PIXI.Sprite(texture);
  // sprite.interactive = true;
  // sprite.buttonMode = true;


  for(let key in shortcuts) {

    // display shortcut
    const shortcut = new PIXI.Text(`[${key}]`, keyStyle);
    shortcut.x = 50;
    shortcut.y = y;
    menuscreen.addChild(shortcut);

    // display info
    const info = new PIXI.Text(shortcuts[key], valueStyle);
    info.x = 400;
    info.y = y;
    menuscreen.addChild(info);
    

    // next line
    y += 72;

  }

  return menuscreen;

}
