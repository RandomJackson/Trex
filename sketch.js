var trex, trex_running, trex_colliding, ground, invisible_ground, ground_image, gameState, PLAY, END, score;
var clouds, cloudsGroup, cloud_image;
var obstacle, obstacleGroup, obstacle_image1, obstacle_image2, obstacle_image3, obstacle_image4, obstacle_image5, obstacle_image6;
var rand;
var restart_image, over_image, restart, over;
var checkpoint, jump, die;

function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_colliding = loadAnimation("trex_collided.png");
  ground_image = loadImage("ground2.png");
  cloud_image = loadImage("cloud.png");
  obstacle_image1 = loadImage("obstacle1.png");
  obstacle_image2 = loadImage("obstacle2.png");
  obstacle_image3 = loadImage("obstacle3.png");
  obstacle_image4 = loadImage("obstacle4.png");
  obstacle_image5 = loadImage("obstacle5.png");
  obstacle_image6 = loadImage("obstacle6.png");
  
  restart_image = loadImage("restart.png");
  over_image = loadImage("gameOver.png");
  
  checkpoint = loadSound("checkPoint.mp3");
  die = loadSound("die.mp3");
  jump = loadSound("jump.mp3");
  
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(30,165,20,20);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("coll", trex_colliding);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,600,10);
  ground.addImage("running_ground",ground_image);
  
  invisible_ground = createSprite(200,195,600,10);
  invisible_ground.visible = false;

  cloudGroup = new Group();
  obstacleGroup = new Group();
  
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  
  score = 0;
  
  over = createSprite(300,80,10,10);
    over.visible = false;
      over.addImage("over", over_image);
        over.scale = 0.6;
  restart = createSprite(300,110,10,10);
    restart.visible = false;
      restart.addImage("restart", restart_image);
        restart.scale = 0.6;
  
  trex.debug = true;

}

function draw() {
  background("white");
  textSize(15);  
  text("Score: "+ Math.round(score) ,500, 35);
  
  trex.collide(invisible_ground);
 
 if(gameState === PLAY){
     ground.velocityX = -6-frameCount/100;
      
   if(keyDown("SPACE") && trex.y > 165 ){
        trex.velocityY = -11;
           jump.play();
        }
   trex.changeAnimation("running", trex_running);
     spawnClouds();
     spawnObstacles();      
     if(ground.x < 0){
    ground.x = ground.width/2;
  }
     score = score+0.25;
    trex.velocityY = trex.velocityY +0.8;
   
     if(score % 100 === 0 && score > 0){
         checkpoint.play();   
     }
   
     if(obstacleGroup.isTouching(trex)){
       gameState = END;
       die.play();
     }
   }  
    
  else if(gameState === END){
      obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
      trex.velocityY = 0;
    
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
      trex.changeAnimation("coll", trex_colliding);
    ground.velocityX = 0;
      over.visible = true;
      restart.visible = true;

      }
        if(mousePressedOver(restart)){
          reset();
    }
  
  
  
  
  drawSprites();
}

function spawnClouds(){
  if(frameCount % 60 === 0){
    cloud = createSprite(600,random(50,100),10,10);
    cloud.addImage("cl", cloud_image);
    cloud.velocityX = -6-frameCount/100;
    cloud.scale = random(0.4,0.7);
    cloud.lifetime = 110;
    cloudGroup.add(cloud);
  }
}

function spawnObstacles(){
  if(frameCount % 60 === 0){
    obstacle = createSprite(600,170,10);
      rand = round(random(1,6));
    switch(rand)  {
      case 1 :  obstacle.addImage("ob1", obstacle_image1);
        break;
      case 2 :  obstacle.addImage("ob2", obstacle_image2);
        break;
      case 3 :  obstacle.addImage("ob3", obstacle_image3);
        break;
      case 4 :  obstacle.addImage("ob4", obstacle_image4); 
        break;
      case 5 :  obstacle.addImage("ob5", obstacle_image5);
        break;
      case 6 :  obstacle.addImage("ob6", obstacle_image6);
        break;
      default : break;
    }
    obstacle.velocityX = -6-frameCount/100;
    obstacle.scale = 0.5;
    obstacle.lifetime = 120;
    obstacle.depth = trex.depth ;
    trex.depth = trex.depth + 1;
    obstacleGroup.add(obstacle);
  }

}

function reset(){
     
  restart.visible = false;
  over.visible = false;
  cloudGroup.destroyEach();
  obstacleGroup.destroyEach();
   gameState = PLAY;
  trex.changeAnimation("run", trex_running);
  score = 0;
}


