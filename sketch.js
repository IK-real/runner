var car;
var restart;
var race;
var enemyGroup;
var edges;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;

localStorage["highestScore"] = 0;


function preload(){
  carImage = loadImage("car.png");
  
  race_track = loadImage("Race.jpg");
  
  enemyCar = loadImage("car2[1].png");
  
  reImg = loadImage("Polish_20201121_190721501[1].png");
}

function setup() {
 createCanvas(windowWidth + 1000,windowHeight);

  car = createSprite(windowWidth/2,windowHeight/2,50,50);
  car.addImage(carImage);
  car.scale = 0.09
  car.setCollider("rectangle",0,0,1100,500)
 
  
  race = createSprite(windowWidth/2,windowHeight/2,500,500);
  race.addImage(race_track);
  race.scale = 2.30;
  
  
  edges = createEdgeSprites();
  
  
  restart = createSprite(car.x,car.y,50,50);
  restart.addImage(reImg);
  restart.scale = 0.25;
  
  
  enemyGroup = new Group();
}

function draw() {
  background("cyan")
  
  race.y = car.y;
  
  car.depth = race.depth + 1;
  
  if(race.x <= car.x - 300){
    race.x = car.x
  }
  restart.x = car.x;
  restart.y = car.y
  
  
  
 if(gameState === PLAY){

  camera.position.x = car.x;
  camera.position.y = windowHeight/2

   
   if(frameCount % 15 === 0){
     score = score + 1;
   }
   
   if(localStorage["highestScore"] < score){
    localStorage["highestScore"] = score;
  }
   
   restart.visible = false;
   
   
  if(keyDown("a")|| keyDown("left")){
    car.x = car.x-10;
    race.x = race.x+10
  }
  
  console.log(mouseY)
  console.log(mouseX + 'x')
  if(keyDown("d")|| keyDown("right")){
    car.x = car.x+10
    race.x = race.x-10
  }
  
  if(keyWentDown("w")|| keyWentDown("up")){
    car.velocityY = -2;
  }
  
  
  if(keyWentDown("s")|| keyWentDown("down")){
    car.velocityY = 2;
  }
  
  if(keyWentUp("w")|| keyWentUp("up")||
  keyWentUp("s")|| keyWentUp("down")){
    car.velocityY = 0;
  }
  
  if(frameCount > 1500){
    gameState = END;
  }
  
  if(car.isTouching(edges[3])||car.isTouching(edges[2])){
    gameState = END;
  }
   
  if(enemyGroup.isTouching(car)){
    gameState = END;
  } 

  if(car.x >= 1600){
    car.x = windowWidth/2;
    car.y = windowHeight/2;
  }
 enemy();
 }
  
  if(gameState === END){
    car.velocityY = 0
    car.x = 65;
    car.y = 125;
    race.velocityX = 0;
    enemyGroup.setLifetimeEach(2);
    restart.visible = true;
    if(mousePressedOver(restart)){
      reset();
    }
    
  }
  
  
  drawSprites();
  fill("yellow")
  text("Score:  "+ score,400,30);
  text("High Score:  " + localStorage["highestScore"], 300, 30);
}  


function enemy(){
  
  if(frameCount % 80 === 0){
    var enemy = createSprite(Math.round(random(925,1600)),Math.round(random(160,445)),50,50);
    enemy.addImage(enemyCar);
    enemy.scale = 0.15;
    enemy.lifetime = 400;
    enemy.setCollider("rectangle",0,0,700,300);
    restart.depth = enemy.depth + 1;
    car.depth = enemy.depth + 1;
    enemyGroup.add(enemy);
  }
}


function enemy2(){
  
  if(frameCount % 80 === 0){
    var enemy2 = createSprite(Math.round(random(925,1600)),Math.round(random(160,445)),50,50);
    enemy2.addImage(enemyCar);
    enemy2.scale = 0.15;
    enemy2.lifetime = 400;
    enemy2.setCollider("rectangle",0,0,700,300);
    restart.depth = enemy2.depth + 1;
    car.depth = enemy2.depth + 1;
    enemyGroup.add(enemy2);
  }
}


function enemy3(){
  
  if(frameCount % 80 === 0){
    var enemy3 = createSprite(Math.round(random(925,1600)),Math.round(random(160,445)),50,50);
    enemy3.addImage(enemyCar);
    enemy3.scale = 0.15;
    enemy3.lifetime = 400;
    enemy3.setCollider("rectangle",0,0,700,300);
    restart.depth = enemy3.depth + 1;
    car.depth = enemy3.depth + 1;
    enemyGroup.add(enemy3);
  }
}

function reset(){
  gameState = PLAY;
  enemyGroup.destroyEach();
  score = 0;

}


