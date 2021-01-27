let cam;
let w, h;
let tx, ty;
let zoom;

let camWidth = 320;
let camHeight = 240;
let dmax = 70;
let target = [87, 179, 107];
let canvas;
let swatch, slider;

let colortracker;
let debugView = true;
let traceView = true;
let recording = false;
let locked = false;

let trail = [];
let trailsize = 100;
let tracktime = 0;

function setup() {
  cam = createCapture(VIDEO, camLoaded);
  canvas = createCanvas(windowWidth, windowHeight);
  cam.size(camWidth, camHeight);
  // flip camera display
  cam.style( 'transform', 'scaleX(-1)');
  createGui();
  resizeVideo();
}

function camLoaded() {
  addColorTracker();
}

function createGui() {
  // gui in top right corner
  gui = createDiv();
  gui.style("background-color", color(200, 100));
  gui.style("border", "5px solid rgba(0, 0, 0, 0.5)");
  gui.style("padding", "10px");
  gui.size(100, 120);

  // create color swatch
  swatch = createDiv();
  swatch.size(100, 100);
  swatch.style("background-color", color(... target ) );
  swatch.parent(gui);

  // create slider
  slider = createSlider(0, 255, dmax);
  slider.style("width", "90px");
  slider.style("border", "5px solid black");
  slider.parent(gui);

  /*
  record = createButton("record");
  record.size(100, 30);
  record.parent(gui);
  record.mousePressed(toggleRecording);
  */

  // add canvas interaction
  canvas.mousePressed(sampleCam);
}

function toggleRecording() {
  recording = !recording;
}

function keyPressed() {
  switch (key) {
    // toggle fullscreen
    case "f":
      fullscreen(!fullscreen());
      break;
    case "d":
      debugView = !debugView;
      break;
    case "t":
      traceView = !traceView;
      break;
    case "r":
      resetTrail();
      break;
  }
}

function windowResized() {
  resizeVideo();
}

function resizeVideo() {
  fitVideo();

  // adjust params
  w = camWidth * zoom;
  h = camHeight * zoom;
  tx = (windowWidth - w) / 2;
  ty = (windowHeight - h) / 2;

  // resize canvas
  resizeCanvas(w, h);
  canvas.position(tx, ty);

  // resize cam
  cam.position(tx, ty);
  cam.style('width', w + 'px');
  cam.style('height', h + 'px');
  cam.style('z-index', -1);

  // resize gui
  gui.position(windowWidth - 140, 10);
}

// fitting functions to adapt scale
function fitVideo() {
  zoom = min(windowHeight / camHeight, windowWidth / camWidth);
}

// just draw the video
function draw() {
  
  // flip canvas
  
  push();
  translate( width/ 2, height/2);
  scale(-1, 1);
  translate( -width/ 2, -height/2);
  clear();

  let img = cam.get();
  if (debugView) {
    debugDraw(img);
  }
  if(traceView) {
    traceDraw(img);
  }

  pop();
}

function sampleCam() {
  console.log(canvas2camX(mouseX), canvas2camY(mouseY));
  target = cam.get(canvas2camX(mouseX), canvas2camY(mouseY));
  swatch.style("background-color", color(target));
}

function canvas2camX(x) {
  // flipped coordinates
  return camWidth - x / zoom;
}

function canvas2camY(y) {
  return y / zoom;
}

function debugDraw(img) {
  img.loadPixels();
  let p = img.pixels;
  let n = p.length;
  dmax = slider.value();
  let c = target;
  let cdebug = [0, 255, 0];
  for (let i = 0; i < n; i += 4) {
    if (colorDistance(p, i, c) < dmax) {
      setColor(p, i, cdebug);
    } else {
      fadeColor(p, i);
    }
  }
  img.updatePixels();
  image(img, 0, 0, w, h);
}

function traceDraw(img) {

  updateTrail();

  push();
  // draw line
  let c = locked ? [255, 0, 0] : [0, 255, 0];
  stroke([ ... c , 150 ]);
  strokeWeight(20);
  noFill();
  beginShape();
  trail.forEach( p => vertex(p.x, p.y) );
  endShape();

  // draw dots
  strokeWeight(20);
  stroke(0, 30);
  trail.forEach( p => point(p.x, p.y) );

  pop();
}

function colorDistance(p, i, c) {
  return abs(p[i] - c[0]) + abs(p[i + 1] - c[1]) + abs(p[i + 2] - c[2]);
}

function setColor(p, i, c) {
  p[i] = c[0];
  p[i + 1] = c[1];
  p[i + 2] = c[2];
}

function fadeColor(p, i) {
  p[i + 3] = 0;
}

function addColorTracker() {
  tracking.ColorTracker.registerColor("dynamic", (r, g, b) => {
    return colorDistance([r, g, b], 0, target) < dmax;
  });

  colortracker = new tracking.ColorTracker("dynamic");
  colortracker.on("track", track);
  // start tracking
  tracking.track(cam.elt, colortracker, { camera: false });
}

// function used by color tracker
function track(tracking) {

  tracktime = millis();
  if(locked) return;
  
  let rects = tracking.data;
  if(rects.length > 0) {

    // get the largest rectangle 
    let rect = rects.sort( x => x.width * x.height)[0];
    let x = rect.x + rect.width / 2;
    let y = rect.y + rect.height / 2;

    addTrail(x, y);

  }
}

function lockTrail() {
  console.log("locked trail");
  locked = true;
}

// append to the trail
function addTrail(x, y) {
  // add new element on the right
  trail.push({x, y});
  if(trail.length > trailsize) {
    // remove left most element if the trail is too full
    trail.splice(0, 1);
  }
}

function resetTrail() {
  console.log("reset trail")
  trail = [];
  locked = false;
}

function updateTrail() {

    if(millis() - tracktime > 200) {
      lockTrail();
    }
    
    // lock the trail if we did not move for some time
    let n = 10;
    if(trail.length > n) {
      let tail = trail.slice(-n);
      let bb = bbox(tail);
      let activity = dist(bb.xmin, bb.ymin, bb.xmax, bb.ymax);
      console.log("a", activity);
      if(activity < 10) {
        lockTrail();
      }
    }
  
}

function bbox(pts) {
  let p0 = pts[0];
  let xmin = p0.x;
  let xmax = xmin;
  let ymin = p0.y;
  let ymax = ymin;
  pts.forEach( p => { 
    xmin = min(p.x, xmin);
    xmax = max(p.x, xmax);
    ymin = min(p.y, ymin);
    ymax = max(p.y, ymax);
  });
  return { xmin, ymin, xmax, ymax }
}

