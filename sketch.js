var monkeySprite , monkey_running , monkeyDead;
var bananaSprite ,bananaImage, obstacle, obstacleImage;
var banana;
var obstacles;
var bananaGroup, obstacleGroup;
var survivalTime = 0;
var PLAY = 1;
var END = -1;
var gameState = PLAY;
var score = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  
  monkeyDead = loadImage("monkey_4.png");
  
  bananaImage = loadImage("banana.png");
  obstacle_Image = loadImage("obstacle.png");
  gameOverImage = loadImage("gameover.png");
  restartImage = loadImage("restart.png");
  
 
}



function setup() {
  
  createCanvas(600,450);
  
  monkeySprite = createSprite(140,367,12,12);
  monkeySprite.addAnimation("running",monkey_running);
  monkeySprite.addAnimation("die",monkeyDead);
  monkeySprite.scale = 0.2;
  monkeySprite.depth = monkeySprite.depth + 1;
  
  gameOverSprite = createSprite(299,93);
  gameOverSprite.addImage(gameOverImage);
  gameOverSprite.scale = 0.8;
  
  
  restartSprite = createSprite(302,142,23,23);
  restartSprite.addImage(restartImage);
  restartSprite.scale = 0.7;
  
  
  monkeySprite.debug = false;
  
// monkeySprite.setCollider("rectangle",0,0,220,360);

  bananaGroup = createGroup();
  obstaclesGroup = createGroup();
  
  
  
  
  survivalTime = 0;
}


function draw() {
  
  background(0);
  
  if(gameState === PLAY) {
    
     ground = createSprite(400,440,2400,20);
     ground.velocityX = -7;
    
    if(monkeySprite.isTouching(bananaGroup)){
       bananaGroup.destroyEach();
       score  = score + 1;
      }
    
     gameOverSprite.visible = false;
     restartSprite.visible = false;
    
     if(monkeySprite.isTouching(obstaclesGroup)){
        gameState = END;
      }
     
      if (ground.x < 0){
      ground.x = ground.width/2;
      }
    
     console.log(ground.velocityX);
    
     
     fill("blue");
     textSize(25);
     text("Survival Time : " + survivalTime,202,60);
    
     stroke("black");
     textSize(25);
     fill("black");
     survivalTime = Math.ceil(frameCount / frameRate());
    
     //creating bananas
     banana();
    
     
     
     //spawn obstacles on the ground
     spawnObstacles();
    
    
   if(keyDown("space") && monkeySprite.y >= 200){
      monkeySprite.velocityY = -17;              
   }
    
    monkeySprite.velocityY = monkeySprite.velocityY + 0.5;
    
    
    //stroke("white");
    textSize(25);
    fill("darkgreen");
    text("Bananas Collected : " + score,170,25);
  
    
  }
  
  
else if(gameState === END){
  
       monkeySprite.velocityY = 0;
       ground.velocityX = 0;
       
       restartSprite.visible = true;
       gameOverSprite.visible = true;
          
       obstaclesGroup.setVelocityXEach(0);
       bananaGroup.setVelocityXEach(0);
    
       obstaclesGroup.setLifetimeEach(-1);
       bananaGroup.setLifetimeEach(-1);
  
       monkeySprite.changeAnimation("dead",monkeyDead);
  
  
     if(mousePressedOver(restartSprite)){
           reset();
          }
      

  }
  
  monkeySprite.collide(ground);
  
 
 
  console.log(ground.x);
  

 
  
  drawSprites();
  
  
  
  
}


function reset(){
  
  gameState = PLAY;
  gameOverSprite.visible = true;
  restartSprite.visible = true;
  score = 0;
  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
  monkeySprite.changeAnimation("running",monkey_running);
  
}

function spawnObstacles(){
  
  if(World.frameCount % 150 === 0){
  obstacles = createSprite(340,393,2,2);
  obstacles.addImage(obstacle_Image);
  obstacles.scale = 0.19;
  obstacles.velocityX = -8;
  obstacles.lifetime = 35;
  obstaclesGroup.add(obstacles);
  }
   
  
}

function banana(){
  if(World.frameCount % 80 === 0) {
     bananaSprite = createSprite(540,120,102,12);
     bananaSprite.scale = 0.19;
     bananaSprite.addImage(bananaImage);
     bananaSprite.y = Math.round(random(16,250));
     bananaSprite.velocityX = -9;
     bananaSprite.lifetime = 55;
     bananaGroup.add(bananaSprite);
    
     }
 
 

}