
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var building;
var cat, cat2;
var dog, dog2, dog3;
var buildingSprite;
var person, personSprite;
var rabbit;
var groupPets;
var score = 0;
var edges;
var music;

function preload() {
building = loadAnimation("building1.png", "building2.png", "building3.png", "building4.png", "building5.png", "building6.png", "building7.png", "building8.png", "building9.png", "building10.png");
cat = loadImage("cat1.png");
cat2 = loadImage("fallingCat.png");
dog = loadImage("dog.png");
dog2 = loadImage("fallingDog.png");
dog3 = loadImage("dog3.png");
person = loadImage("catchingperson.png");
rabbit = loadImage("rabbit.png");
music = loadSound("BirthofaHeroByBensound.mp3");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  music.play();
  music.setVolume(0.25);
  
  edges = createEdgeSprites();

  engine = Engine.create();
  world = engine.world;

  buildingSprite= createSprite(windowWidth - 400,windowHeight - 500);
  buildingSprite.scale = 5;
  buildingSprite.addAnimation("burning", building);
  
  personSprite = createSprite(windowWidth - 400, windowHeight - 70);
  personSprite.scale = 0.8;
  personSprite.addImage(person);

  groupPets = new Group();

}


function draw() 
{

  background(51);
  Engine.update(engine);
  drawSprites();

  if(keyDown("left_arrow")){
    personSprite.x -=10;
  }
  if(keyDown("right_arrow")){
    personSprite.x +=10;
  }

  spawnPets();

  if(groupPets.isTouching(personSprite)){
    groupPets.destroyEach();
    score +=1;
  }   
  
  if(groupPets.isTouching(edges[3])){
    groupPets.destroyEach();
    gameOver();
    
  }
  
  textSize(35);
  fill("yellow");
  text("Score: " + score, 20, 50);
  
}

function spawnPets(){
  if(frameCount % 200 === 0){
    var y = Math.round(random(10, windowHeight -600));
    var pet = createSprite(windowWidth + 50, y);
    var n = Math.round(random(1,6));
    switch(n){
      case 1:
        pet.addImage(cat);
        pet.scale = 0.2;
        break;

      case 2:
        pet.addImage(dog);
        pet.scale = 0.2;
        break;

      case 3:
        pet.addImage(rabbit);
        pet.scale = 0.05;
        break;

      case 4: 
        pet.addImage(cat2);
        pet.scale = 0.3;
        break;

      case 5:
        pet.addImage(dog2);
        pet.scale = 0.3;
        break;

      case 6:
        pet.addImage(dog3);
        pet.scale = 0.3;
        break;
    }
    
  
    pet.velocityX = Math.round(random(-3, -5));
    pet.velocityY = Math.round(random(1, 4));

    groupPets.add(pet);
  }


}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://i.postimg.cc/7P0FsBMZ/crying-cat.jpg",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}