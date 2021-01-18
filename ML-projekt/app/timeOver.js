import { app } from "./pixi-app.js";
import * as PIXI from "./pixi.js";
import keyboard from "./keyboard.js";

// create a timeOverscreen once this module in loaded
let timeOverscreen;


// enable timeOverscreen key combo
export default function inittimeOverScreenShortcut(key = "t", modifier) {

	const key1 = keyboard(key);
	const key2 = modifier && keyboard(modifier);
	key1.release = () => {
		if (!key2 || key2.isDown) toggletimeOverscreen();
  };

  // create and add timeOverscreen
  timeOverscreen = createtimeOverscreen();
  app.stage.addChild(timeOverscreen);

}

function toggletimeOverscreen() {
  timeOverscreen.visible = !timeOverscreen.visible;
}

// create help screen
function createtimeOverscreen() {

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
    wordWrap: true,
    wordWrapWidth: 50,
  };

  let shortcuts = {  
    'Dein Score': 'Du hast 30 von 37 Bohnen gesammelt',
  }

  let timeOverscreen = new PIXI.Container();
  timeOverscreen.x = 50;
  timeOverscreen.y = 50;
  timeOverscreen.visible = false;

  // draw  timeOverscreen box
  let bg = new PIXI.Graphics();
  bg.alpha = 0.9;                         // opacity
  // bg.lineStyle(10, 0x000000, 0.7, 1);  // Linienstil (0,5 = Mitte, 1 = Außen, 0 = Innen) ?
  bg.beginFill(0x000000);                 
  bg.drawRoundedRect(0, 0, 1100, 700, 32);
  bg.endFill();
  timeOverscreen.addChild(bg);

  // display header
  const header = new PIXI.Text("Time Over!", headerStyle);
  header.x = 50;
  header.y = 50;
  timeOverscreen.addChild(header);

  let y = 250;

  // Buttons für "Spiel verlassen" und "Neustarten"
  // const sprite = new PIXI.Sprite(texture);
  // sprite.interactive = true;
  // sprite.buttonMode = true;


  for(let key in shortcuts) {

    // display shortcut
    const shortcut = new PIXI.Text(key, keyStyle);
    shortcut.x = 50;
    shortcut.y = y;
    timeOverscreen.addChild(shortcut);

    // display info
    const info = new PIXI.Text(shortcuts[key], valueStyle);
    info.x = 300;
    info.y = y;
    timeOverscreen.addChild(info);
    

    // next line
    y += 50;

   /* const app = new PIXI.Application({ backgroundColor: 0x1099bb });
    document.body.appendChild(app.view);

    // create a new Sprite from an image path
    const time = PIXI.Sprite.from('assets/time.png');

    // center the sprite's anchor point
    voldi.anchor.set(0.5);

    // move the sprite to the center of the screen
    time.x = app.screen.width / 2;
    time.y = app.screen.height / 2;

    app.stage.addChild(time); */

  }

  return timeOverscreen;

}
