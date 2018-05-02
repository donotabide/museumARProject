// create a variable for A-Frame world
var world;
// references to our markers (which are defined in the HTML document)
var hiroMarker;

var paintings = [];

function setup() {
  world = new World("ARScene");

  // grab a reference to our marker in the HTML document
  hiroMarker = world.getMarker("zb");

  var i = 1;
  var xStart = -15;
  var numberOfPaintings = 6;
  for(var x = xStart; i <= numberOfPaintings; x += 6){
      var painting = new Painting(x, 1, 0, i);
      paintings.push(painting);
      i++;
  }
}

function draw() {
}

function mousePressed() {
    paintings.forEach(painting=>{
        if(mouseX > width/2) painting.moveRight();
        else painting.moveLeft();
    });
}


function Painting(x, y, z, i) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.i = i;

    this.art= new Plane({
        x: x, y: y, z: z,
        width: 5, height: 3,
        rotationX: -90,
        asset: 'painting'+i
    });
    hiroMarker.addChild(this.art);

    // every box should be able to move
    this.moveLeft = function() {
        this.art.nudge(-0.3, 0, 0);
        this.x -= 0.3;
    }

    this.moveRight = function() {
        this.art.nudge(0.3, 0, 0);
        this.x += 0.3;
    }

}