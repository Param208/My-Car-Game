var PLAY = 1;
var END = 0;
var gameState = PLAY;

var car, carImg;
var path, pathImg;
var obstacle , obstacleGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var gcoin, gcoinGroup, gcoinImg
var restart, restaetImg, gameOver, gameOverImg;
var score = 0;

function preload(){
 //load your images here 
 pathImg = loadImage("path.png");
  
 obstacle1 = loadImage("obstacle1.png");
 obstacle2 = loadImage("obstacle2.jfif"); 
 obstacle3 = loadImage("obstacle3.png");
 obstacle4 = loadImage("obstacle4.jfif");
 obstacle5 = loadImage("obstacle5.png");
 obstacle6 = loadImage("obstacle6.jfif"); 
  
 carImg = loadImage("car1.png");
 gameOverImg = loadImage("gameOver.png");
 restartImg = loadImage("restart.png");
 gcoinImg = loadImage("coin.png"); 
}

function setup() {
  createCanvas(597, 540);
  
  //add code here
  
  path = createSprite(300,200);
  path.addImage(pathImg);
  path.scale = 1.8;
  path.velocityY = +(4 +3*score/4);
  path.y = path.height/2;
  
  car = createSprite(300,460,40,40);
  car.addImage(carImg);
  
  gameOver = createSprite(300,260);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,340);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  
  obstacleGroup = new Group();
  gcoinGroup = new Group();
  
}

function draw() {
  background("green");
  
  //add code here
if(gameState === PLAY){
  //score = score + Math.round(getFrameRate()/60);
  path.velocityY = +(4 + 3*score/4);
  
  car.visible = true;
  
  if (keyDown(RIGHT_ARROW)){
      car.x = car.x+10
  }

if (keyDown(LEFT_ARROW)){
   car.x = car.x-10
}
    
  spawnObstacles();
  gcoins();
  
  if(gcoinGroup.isTouching(car)){
    gcoinGroup.destroyEach();
    score = score+1
  }
  
  if(obstacleGroup.isTouching(car)){
        gameState = END;
    }
  }
  else if(gameState === END){
    gameOver.visible = true;
    restart.visible = true;
    car.visible = false;
    
    //set velcity of each game object to 0
    path.velocityY = 0;
    car.velocityX = 0;
    obstacleGroup.setVelocityYEach(0);
    gcoinGroup.setVelocityYEach(0);
    
    obstacleGroup.destroyEach();
    gcoinGroup.destroyEach();
    
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    gcoinGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
    }
  if(path.y > 400 ){
    path.y = height/2;
  }
  
  
  drawSprites();
  
  textSize(20)
  text("score: "+score,500,50)
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
   obstacle = createSprite(200,0,10,40);
   obstacle.x = Math.round(random(50,500)); 
    //obstacle.debug = true;
    obstacle.velocityY = +(6 + 3*score/4);
    obstacle.scale = 0.5;
    obstacle.lifetime = 600;
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              obstacle.scale = 0.2;
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    obstacleGroup.add(obstacle);
  } 
  }

function gcoins(){
  
  if(frameCount%500 === 0){
    gcoin = createSprite(300,0,10,10);
    gcoin.x = Math.round(random(50,500));
    gcoin.velocityY = +(2+3*score/4);
    gcoin.addImage(gcoinImg);
    gcoin.lifetime = 600;
    gcoin.scale = 0.7;
    gcoin.debug = false;
    //gcoin.setCollider("rectangle",0,0,100,60);
    
    gcoinGroup.add(gcoin);
  }
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
    
  score = 0;
  
}

