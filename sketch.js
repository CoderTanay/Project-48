var spaceship, spaceshipIMG, spaceship2IMG;
var bubble, bubbleIMG;
var gamestate;
var health;
var spawner;
var bubbleGroup;
var bullet;
var bulletGroup;
var score;
var edges;

function preload(){
  spaceshipIMG = loadImage("Spaceship.png");
  spaceship2IMG = loadImage("Spaceship2.png");
  bubbleIMG = loadImage("Bubble.png");
}

function setup() {

  createCanvas(400, 400);
  

  gamestate = "playing";
  health = 100;
  bubbleGroup = new Group();
  bulletGroup = new Group();
  score = 0;

  spaceship = createSprite(200,200,10,10);
  spaceship.addAnimation("spaceship", spaceshipIMG, spaceship2IMG);
  spaceship.pause();
  spaceship.scale = 0.5;
  spaceship.setCollider("rectangle", 0, 0, 80, 70);
  
  bullet = createSprite(1000,1000,50,50);
  bulletGroup.add(bullet);
}

function draw() {
  background("lightgray")

  if(keyDown("up")){
    spaceship.addSpeed(0.2,spaceship.rotation - 90)
  }
   if(keyDown("down")){
    spaceship.addSpeed(0.2,spaceship.rotation + 90)
  }
   if(keyDown("left")){
    spaceship.rotation = spaceship.rotation-10
   }
   if(keyDown("right")){
    spaceship.rotation = spaceship.rotation+10
   }
   edges = createEdgeSprites()
   spaceship.bounceOff(edges)

  text("Score: " + score, 5, 20);
  text("Health: " + health, 85, 20);
  textSize(50);
  drawSprites();
 
  if(gamestate === "playing"){
    makeBubbles();
    shooting();
    if(bubbleGroup.isTouching(spaceship)){
      health-=1;
    }
    if(bullet.isTouching(bubbleGroup)){
      bubbleGroup.destroyEach();
      score=score+100;
    }
    if(health <= 0){
      gamestate = "over";
    }
  }
  else if(gamestate = "over"){
    spaceship.velocityX=0
    spaceship.velocityY=0
    bubbleGroup.setVeloctiyEach=0
    bulletGroup.setVeloctiyEach=0
    text("Game Over", 75, 200);
  }
}

function makeBubbles(){
  if(frameCount % 30 === 0){
     spawner = Math.round(random(1,2));
     if(spawner === 1){
      bubble = createSprite(random(1,400),0,10,10);
      bubble.addImage("bubble", bubbleIMG);
      bubble.velocityX = random(-5,5);
      bubble.velocityY = random(2,7);
      bubble.scale = 0.5;
      bubble.lifetime = 150;
      bubble.setCollider("circle", 0, 0, 46);
      bubbleGroup.add(bubble);
    }else if(spawner === 2){
      bubble = createSprite(random(1,400),400,10,10);
      bubble.addImage("bubble", bubbleIMG);
      bubble.velocityX = random(-5,5);
      bubble.velocityY = random(-2,-7);
      bubble.scale = 0.5;
      bubble.lifetime = 150;
      bubble.setCollider("circle", 0, 0, 46);
      bubbleGroup.add(bubble);
    }
  }
}

function shooting(){
  if(keyDown("space")){
    bullet = createSprite(spaceship.x, spaceship.y, 5, 12);
    bullet.shapeColor = "white";
    bullet.rotation = spaceship.rotation;
    bullet.addSpeed(6, spaceship.rotation - 90);
    bullet.depth = 0;
    bullet.lifetime = 100;
    bulletGroup.add(bullet);
  }
}