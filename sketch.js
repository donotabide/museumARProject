// create a variable to hold our world object
var world;

// create variables to hold our markers
var markerHiro;

// where our player is current hanging out at
var posX, posY;

// artwork for our player
var img;
var isSelected;

var closeX, closeY;

function preload() {
  img = loadImage("imgs/image2.jpg");
}

function setup() {
  // create our world (this also creates a p5 canvas for us)
  world = new World('ARScene');
  noStroke();

  // grab a reference to our two markers that we set up on the HTML side (connect to it using its 'id')
  markerHiro = world.getMarker('hiro');

  imageMode(CENTER);
  img.resize(300, 300);
  isSelected = false;

  closeX = 50;
  closeY = 50;
}


function draw() {
  world.clearDrawingCanvas();

  if (markerHiro.isVisible()) {
    var hiroPosition = markerHiro.getScreenPosition();
    posX = hiroPosition.x;
    posY = hiroPosition.y;
    image(img, posX, posY);
  }

  if(isSelected) {
    background(0);
    posX = width/2;
    posY = height/2 - 100;
    image(img, posX, posY);

    //close button
    fill(255);
    ellipse(closeX, closeY, 25);

    //text to speech stuff on bottom
  }
}

function mousePressed() {
  if(markerHiro.isVisible() && mouseX > posX - 200 && mouseX < posX + 200 && mouseY > posY - 200 && mouseY < posY + 200) {
    isSelected = true;
  }

  if(mouseX > closeX - 25 && mouseX < closeX + 25 && mouseY > closeY - 25 && mouseY < closeY + 25) {
    isSelected = false;
  }
}
