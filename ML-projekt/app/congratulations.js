import { app } from "./pixi-app.js";
import * as PIXI from "./pixi.js";
import keyboard from "./keyboard.js";

// create a congratulations screen once this module in loaded
let congratulations;


// enable congratulations key combo
export default function initMenuScreenShortcut(key = "m", modifier) {

	const key1 = keyboard(key);
	const key2 = modifier && keyboard(modifier);
	key1.release = () => {
		if (!key2 || key2.isDown) togglecongratulations();
  };

  // create and add congratulations
  congratulations = createcongratulations();
  app.stage.addChild(congratulations);

}

function togglecongratulations() {
  congratulations.visible = !congratulations.visible;
}

// create congratulations screen
function createcongratulations() {

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
  };

  let shortcuts = {  // neue variable mit, da kein shortcut
    'Dein Score': 'Du hast in diesem Level alle Bohnen gesammelt',
  }

  let congratulations = new PIXI.Container();
  congratulations.x = 50;
  congratulations.y = 50;
  congratulations.visible = false;

  // draw menu screen box
  let bg = new PIXI.Graphics();
  bg.alpha = 0.9;                         // opacity
  // bg.lineStyle(10, 0x000000, 0.7, 1);  // Linienstil (0,5 = Mitte, 1 = Außen, 0 = Innen) ?
  bg.beginFill(0x000000);                 
  bg.drawRoundedRect(0, 0, 1100, 700, 32);
  bg.endFill();
  congratulations.addChild(bg);

  // display header
  const header = new PIXI.Text("Congratulations!", headerStyle);
  header.x = 50;
  header.y = 50;
  congratulations.addChild(header);

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
    congratulations.addChild(shortcut);

    // display info
    const info = new PIXI.Text(shortcuts[key], valueStyle);
    info.x = 400;
    info.y = y;
    congratulations.addChild(info);
    

    // next line
    y += 72;


  }

    // Hier soll das Bild eingebunden werden


    // create a new Sprite from an image path
    let voldi = PIXI.Sprite.from('assets/voldemort.png');

    // center the sprite's anchor point
    voldi.anchor.set(0.5);

    // move the sprite to the center of the screen
    voldi.x = app.screen.width / 2;
    voldi.y = app.screen.height / 2;

    congratulations.addChild(voldi); 


  return congratulations;

}
