const IMAGE_SIZE = 784;
const CLASSES = ['flashlight', 'belt', 'mushroom', 'pond', 'strawberry', 'pineapple', 'sun', 'cow', 'ear', 'bush', 'pliers', 'watermelon', 'apple', 'baseball', 'feather', 'shoe', 'leaf', 'lollipop', 'crown', 'ocean', 'horse', 'mountain', 'mosquito', 'mug', 'hospital', 'saw', 'castle', 'angel', 'underwear', 'traffic_light', 'cruise_ship', 'marker', 'blueberry', 'flamingo', 'face', 'hockey_stick', 'bucket', 'campfire', 'asparagus', 'skateboard', 'door', 'suitcase', 'skull', 'cloud', 'paint_can', 'hockey_puck', 'steak', 'house_plant', 'sleeping_bag', 'bench', 'snowman', 'arm', 'crayon', 'fan', 'shovel', 'leg', 'washing_machine', 'harp', 'toothbrush', 'tree', 'bear', 'rake', 'megaphone', 'knee', 'guitar', 'calculator', 'hurricane', 'grapes', 'paintbrush', 'couch', 'nose', 'square', 'wristwatch', 'penguin', 'bridge', 'octagon', 'submarine', 'screwdriver', 'rollerskates', 'ladder', 'wine_bottle', 'cake', 'bracelet', 'broom', 'yoga', 'finger', 'fish', 'line', 'truck', 'snake', 'bus', 'stitches', 'snorkel', 'shorts', 'bowtie', 'pickup_truck', 'tooth', 'snail', 'foot', 'crab', 'school_bus', 'train', 'dresser', 'sock', 'tractor', 'map', 'hedgehog', 'coffee_cup', 'computer', 'matches', 'beard', 'frog', 'crocodile', 'bathtub', 'rain', 'moon', 'bee', 'knife', 'boomerang', 'lighthouse', 'chandelier', 'jail', 'pool', 'stethoscope', 'frying_pan', 'cell_phone', 'binoculars', 'purse', 'lantern', 'birthday_cake', 'clarinet', 'palm_tree', 'aircraft_carrier', 'vase', 'eraser', 'shark', 'skyscraper', 'bicycle', 'sink', 'teapot', 'circle', 'tornado', 'bird', 'stereo', 'mouth', 'key', 'hot_dog', 'spoon', 'laptop', 'cup', 'bottlecap', 'The_Great_Wall_of_China', 'The_Mona_Lisa', 'smiley_face', 'waterslide', 'eyeglasses', 'ceiling_fan', 'lobster', 'moustache', 'carrot', 'garden', 'police_car', 'postcard', 'necklace', 'helmet', 'blackberry', 'beach', 'golf_club', 'car', 'panda', 'alarm_clock', 't-shirt', 'dog', 'bread', 'wine_glass', 'lighter', 'flower', 'bandage', 'drill', 'butterfly', 'swan', 'owl', 'raccoon', 'squiggle', 'calendar', 'giraffe', 'elephant', 'trumpet', 'rabbit', 'trombone', 'sheep', 'onion', 'church', 'flip_flops', 'spreadsheet', 'pear', 'clock', 'roller_coaster', 'parachute', 'kangaroo', 'duck', 'remote_control', 'compass', 'monkey', 'rainbow', 'tennis_racquet', 'lion', 'pencil', 'string_bean', 'oven', 'star', 'cat', 'pizza', 'soccer_ball', 'syringe', 'flying_saucer', 'eye', 'cookie', 'floor_lamp', 'mouse', 'toilet', 'toaster', 'The_Eiffel_Tower', 'airplane', 'stove', 'cello', 'stop_sign', 'tent', 'diving_board', 'light_bulb', 'hammer', 'scorpion', 'headphones', 'basket', 'spider', 'paper_clip', 'sweater', 'ice_cream', 'envelope', 'sea_turtle', 'donut', 'hat', 'hourglass', 'broccoli', 'jacket', 'backpack', 'book', 'lightning', 'drums', 'snowflake', 'radio', 'banana', 'camel', 'canoe', 'toothpaste', 'chair', 'picture_frame', 'parrot', 'sandwich', 'lipstick', 'pants', 'violin', 'brain', 'power_outlet', 'triangle', 'hamburger', 'dragon', 'bulldozer', 'cannon', 'dolphin', 'zebra', 'animal_migration', 'camouflage', 'scissors', 'basketball', 'elbow', 'umbrella', 'windmill', 'table', 'rifle', 'hexagon', 'potato', 'anvil', 'sword', 'peanut', 'axe', 'television', 'rhinoceros', 'baseball_bat', 'speedboat', 'sailboat', 'zigzag', 'garden_hose', 'river', 'house', 'pillow', 'ant', 'tiger', 'stairs', 'cooler', 'see_saw', 'piano', 'fireplace', 'popsicle', 'dumbbell', 'mailbox', 'barn', 'hot_tub', 'teddy-bear', 'fork', 'dishwasher', 'peas', 'hot_air_balloon', 'keyboard', 'microwave', 'wheel', 'fire_hydrant', 'van', 'camera', 'whale', 'candle', 'octopus', 'pig', 'swing_set', 'helicopter', 'saxophone', 'passport', 'bat', 'ambulance', 'diamond', 'goatee', 'fence', 'grass', 'mermaid', 'motorbike', 'microphone', 'toe', 'cactus', 'nail', 'telephone', 'hand', 'squirrel', 'streetlight', 'bed', 'firetruck'];
let model;
let cnv;
let knnclassifier;
const CLASS_NAMES = ['Alohomora', 'Wingardium Leviosa', 'Flipendo', 'Accio'];

async function loadMyModel() {
  //model = await tf.loadLayersModel('model/my-model.json');
  model = await tf.loadLayersModel('model/model.json');
  model.summary();
}

function setup() {
  // Create the classifier.
  knnclassifier = knnClassifier.create();

  loadMyModel();

  cnv = createCanvas(280, 280);
  background(255);
  cnv.parent('canvasContainer');

  let guessButton = select('#guess');
  guessButton.mousePressed(guess);

  let clearButton = select('#clear');
  clearButton.mousePressed(clearCanvas);

  let saveButton = select ('#save');
  saveButton.mousePressed(myknnclassifierSave);

  let addAButton = select('#addA');
  addAButton.mousePressed(() => addClass(0));

  let addBButton = select('#addB');
  addBButton.mousePressed(() => addClass(1));

  let addCButton = select('#addC');
  addCButton.mousePressed(() => addClass(2));

  let addDButton = select('#addD');
  addDButton.mousePressed(() => addClass(3));

  // Reset buttons
  resetBtnA = select('#resetA');
  resetBtnA.mousePressed(function() {
    clearClass(0);
  });
  
  resetBtnB = select('#resetB');
  resetBtnB.mousePressed(function() {
    clearClass(1);
  });

  resetBtnC = select('#resetC');
  resetBtnC.mousePressed(function() {
    clearClass(2);
  });

  resetBtnD = select('#resetD');
  resetBtnD.mousePressed(function() {
    clearClass(3);
  });
}

function addClass(classIndex) {
  console.log('addClass: ', classIndex)
  const logits = getInputImage();
  knnclassifier.addExample(logits, classIndex);
  updateExampleCounts();
  clearCanvas();
}

async function guess() {
  // Get input image from the canvas
  const inputs = getInputImage();

  const result = await knnclassifier.predictClass(inputs);
  console.log('result: ', result)
  const resName = CLASS_NAMES[result.classIndex];
  const resConfidence = result.confidences[result.classIndex];

  select('#res').html(`I see ${resName} with confidence of ${resConfidence}`);

  select('#confidenceA').html(`${result.confidences[0] ? result.confidences[0] * 100 : 0} %`);
  select('#confidenceB').html(`${result.confidences[1] ? result.confidences[1] * 100 : 0} %`);
  select('#confidenceC').html(`${result.confidences[2] ? result.confidences[2] * 100 : 0} %`);
  select('#confidenceD').html(`${result.confidences[3] ? result.confidences[3] * 100 : 0} %`);
}

// Get image from canvas, convert image to a tensor
function getInputImage() {
  let inputs = [];
  // p5 function, get image from the canvas
  let img = get();
  img.resize(28, 28);
  img.loadPixels();

  // Group data into [[[i00] [i01], [i02], [i03], ..., [i027]], .... [[i270], [i271], ... , [i2727]]]]
  let oneRow = [];
  for (let i = 0; i < IMAGE_SIZE; i++) {
    let bright = img.pixels[i * 4];
    let onePix = [parseFloat((255 - bright) / 255)];
    oneRow.push(onePix);
    if (oneRow.length === 28) {
      inputs.push(oneRow);
      oneRow = [];
    }
  }

  return tf.tensor(inputs);
}

function draw() {
  strokeWeight(10);
  stroke(0);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function clearCanvas() {
  background(255);
  select('#res').html('');
};

// Update the example count for each class	
function updateExampleCounts() {
  const counts = knnclassifier.getClassExampleCount();

  select('#exampleA').html(counts[0] || 0);
  select('#exampleB').html(counts[1] || 0);
  select('#exampleC').html(counts[2] || 0);
  select('#exampleD').html(counts[3] || 0);
}

// Clear the examples in one class
function clearClass(classIndex) {
  knnclassifier.clearClass(classIndex);
  updateExampleCounts();
}

// Save the Model
myDefineknnclassifierModel = async function(myPassedknnclassifier){
  let myLayerList = []
   myLayerList[0] = []    // for the input layer name as a string
   myLayerList[1] = []    // for the input layer
   myLayerList[2] = []    // for the concatenate layer name as a string
   myLayerList[3] = []    // for the concatenate layer
                                                                                                                                                                                      
  let myMaxClasses =    myPassedknnclassifier.getNumClasses()                                                                                      
  //console.log('myPassedClassifier.getNumClasses()')
  //console.log(myMaxClasses)                                                                                      
                                                                                           
  for (let myknnclassifierLoop = 0; myknnclassifierLoop < myMaxClasses; myknnclassifierLoop++ ){      // need number of classifiers                                        
                                                                                       
    //console.log(myPassedClassifier.getClassifierDataset()[myClassifierLoop])                                                                                                                                                           
    //console.log('shape first layer =')                                                                                                                                                           
    //console.log(myPassedClassifier.getClassifierDataset()[myClassifierLoop].shape[0])
                                                                                           
    myLayerList[0][myknnclassifierLoop] = 'myInput'  + myknnclassifierLoop                  // input name as a string
    console.log('define input for'+myknnclassifierLoop)                                                                                       
    myLayerList[1][myknnclassifierLoop] = tf.input({shape: myPassedknnclassifier.getknnclassifierDataset()[myknnclassifierLoop].shape[0], name: myLayerList[1][myknnclassifierLoop]});      // Define input layer
    console.log('define dense for: '+myknnclassifierLoop)
    myLayerList[2][myknnclassifierLoop] = 'myInput'+myknnclassifierLoop+'Dense1'    // concatenate as a string                                                                                  
    myLayerList[3][myknnclassifierLoop] = tf.layers.dense({units: 136, name: myGroups[myknnclassifierLoop]}).apply(myLayerList[1][myknnclassifierLoop]);             //Define concatenate layer                                                                          
                                                                                         
  }
                                                                                           
 // what the layers used to look like before the loop                                                                                            
 //const myInput2 = tf.input({shape: [1], name: 'myInput2'});
 //const myInput2Dense1 = tf.layers.dense({units: 20, name: 'myInput2Dense1'}).apply(myInput2);
                                                                                           
 console.log('Concatenate Paths')                                                                                                                                                                                          
 const myConcatenate1 = tf.layers.concatenate({axis : 1, name: 'myConcatenate1'}).apply(myLayerList[3]);    // send the entire list of dense                                                                                           
 const myConcatenate1Dense4 = tf.layers.dense({units: 1, name: 'myConcatenate1Dense4'}).apply(myConcatenate1)                                                                                              

 console.log('Define Model')                                                                                                                                                                                       
 const myknnclassifierModel = tf.model({inputs: myLayerList[1], outputs: myConcatenate1Dense4});    // This would be a global model. With list of inputs as an array                                                                                                                                                                                         
 myknnclassifierModel.summary()
 console.log('myknnclassifierModel.layers[myMaxClasses]')     
 console.log(myknnclassifierModel.layers[myMaxClasses])
 myPassedknnclassifier.getknnclassifierDataset()[0].print(true)                                                                                            
                                                                                           
 for (let myknnclassifierLoop = 0; myknnclassifierLoop < myMaxClasses; myknnclassifierLoop++ ){   // since the first layers are inputs must add maxClasses   
   const myInWeight = await myPassedknnclassifier.getknnclassifierDataset()[myknnclassifierLoop]                                                                                        
   myknnclassifierModel.layers[myknnclassifierLoop + myMaxClasses].setWeights([myInWeight, tf.ones([136])]);       //model.layers[0].setWeights([tf.ones([10, 2]), tf.ones([2])]);                                                                                        
}                                                                                           
                                                                                           
return  myknnclassifierModel                                                                                        
}    

myknnclassifierSave  = async function(){                                                                                                                                                                  
  const myknnclassifierModel2 = await myDefineknnclassifierModel(knnclassifier)         // pass global classifier                                                                                                                                                                                                                                                                      
  myknnclassifierModel2.save('downloads://myknnclassifierModel01')  
  myknnclassifierModel2.summary(null,null,x => {document.getElementById('myDivSummary').innerHTML += x + '<br>'});                                                                                                                                                                                                                                                                             
}