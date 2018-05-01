
// create a variable for A-Frame world
var world;

// references to our markers (which are defined in the HTML document)
var hiroMarker, zbMarker;

// how long has each marker been visible?
var hiroVisCount = 0;
var zbVisCount = 0;

// global flag to keep track of whether we should track new markers
// (we can pause this when the user wants to interact with the content)
var tracking = true;

// graphics we may need during 2D mode
var p1, p2, currentPainting;

// a new drawing canvas (to overlay on top of the regular canvas)
var overlayCanvas;

var paintings = [];

function preload() {
  p1 = loadImage('images/painting.jpg');
  p2 = loadImage('images/painting2.jpg');
  paintings.push(p1, p2);
}

function setup() {
  world = new World("ARScene");

  // grab a reference to our marker in the HTML document
  hiroMarker = world.getMarker("hiro");

  // put a painting on top of each marker
    // TODO: Define insertion paintings to marker
    for(var i = 0; i < paintings.length; i++){
      var painting = new Painting(i);
    }

  var painting1 = new Plane({
    x:0, y: 2, z:0,
    width: 5, height: 3,
    rotationX: -90,
    asset: 'painting1'
  });
  hiroMarker.addChild( painting1 );

  var painting2 = new Plane({
      x: 6, y: 2, z: 0,
      width: 5, height: 3,
      rotationX: -90,
      //rotationZ: -90,
      asset: 'painting2'
  });
  hiroMarker.addChild( painting2 );

    var painting3 = new Plane({
        x: -6, y: 2, z: 0,
        width: 5, height: 3,
        rotationX: -90,
        //rotationZ: -90,
        asset: 'painting2'
    });
    hiroMarker.addChild( painting3 );


  // create our overlay canvas (double the size as the regular canvas, which is 800x600)
  // this is because the canvas has to be scaled up to accomodate the AR video stream
  overlayCanvas = createGraphics(1600, 1200);
}

function draw() {
  // if we are in tracking mode we really don't need to do anything here
  if (tracking) {

  }

  // we are in 2D mode
  else {
    // erase the background of the world (hiding the video feed)
    world.clearDrawingCanvas();
    background(0, 200);

    // in my AR system the canvas is ALWAYS 800 x 600, but it's scaled up/down as needed


    // figure out how large the painting should be (50% of the window)
    var desiredWidth = 400;
    var scalingFactor = desiredWidth/currentPainting.width;

    // draw our painting
    imageMode(CENTER);
    image(currentPainting, width/2, height/2, currentPainting.width*scalingFactor, currentPainting.height*scalingFactor);

    // draw a 'close' button
    fill(255);
    textSize(25);
    textAlign(CENTER);
    text("[ close ]", width/2, height/2 + currentPainting.height*scalingFactor/2 + 50);

    // if the user is clicking the mouse we should let them draw on the OVERLAY canvas
    if (mouseIsPressed) {
      console.log(mouseX, mouseY);
      overlayCanvas.noStroke();
      overlayCanvas.fill(255, 75);
      overlayCanvas.ellipse(mouseX, mouseY, 10, 10);

      // how far are they from the close button?  If so, close the window
      if (dist(mouseX, mouseY, width/2, height/2 + currentPainting.height*scalingFactor/2 + 50) < 50) {
        tracking = true;
        overlayCanvas.clear();
        world.clearDrawingCanvas();
      }
    }

    // draw the overlay canvas
    imageMode(CORNER);
    image(overlayCanvas, 0, 0, overlayCanvas.width/2, overlayCanvas.height/2);
  }

}

function mousePressed() {
  // are we currently in tracking mode?
  if (tracking) {
    // see which marker is currently visible
    if (hiroMarker.isVisible()) {
      tracking = false;
      currentPainting = p1;
    }
    else if (zbMarker.isVisible()) {
      tracking = false;
      currentPainting = p2;
    }
  }
}

// TODO: Define galery slider
function mouseDragged(){
  if(pmouseX > mouseX){

  }else{

  }
}

// TODO: Define class paintings
function Paintings(){

}


function Particle(x,y,z) {
    // every particle needs its own asset
    this.myBox = new Sphere({
        x: x,
        y: y,
        z: z,
        asset: random(imageChoices),
        red: random(255),
        green: random(255),
        blue: random(255),
        radius: 0.25,
        clickFunction: function(theBox) {
            world.slideToObject( theBox , 2000);
        }
    });
    world.add(this.myBox);
    targets.push(this.myBox);

    // every box is going to wander around, so it needs a Perlin noise offset
    this.noiseX = random(0,1000);
    this.noiseY = random(2000,3000);
    this.noiseZ = random(4000,5000);

    // every box should be able to move
    this.move = function() {
        // compute how much to move using Perlin noise
        var moveX = map( noise(this.noiseX), 0, 1, -0.03, 0.03 );
        var moveY = map( noise(this.noiseY), 0, 1, -0.03, 0.03 );
        var moveZ = map( noise(this.noiseZ), 0, 1, -0.03, 0.03 );

        // nudge the box
        this.myBox.nudge(moveX, moveY, moveZ);

        // make sure it doesn't leave the middle of the screen
        this.myBox.constrainPosition(-10, 10, 0, 10, -10, 10);

        // update Perlin noise offsets
        this.noiseX += 0.01;
        this.noiseY += 0.01;
        this.noiseZ += 0.01;

        // spin a bit, just for fun
        var r = random(2);
        var r2 = Math.round(random(3));

        switch(Math.round(r)){
            case 0:
                this.myBox.spinX(r2);
            case 1:
                this.myBox.spinY(r2);
            case 2:
                this.myBox.spinZ(r2);
        }
    }
}