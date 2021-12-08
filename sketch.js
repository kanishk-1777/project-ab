var bg,bgImg,bgImg2;
var player,playerRunning,playerShoot;
var badRobo,badImg,badImg2,badImg3;
var shootImg,shoot;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var gameOver;
var bullet = 50;
var EnemiesKilled = 0;
var save,saveImg;
var life = 3;
var sond;
var gameState = "fight";
function preload()
{
  bgImg         = loadImage("destroyed background.jpg");
  heart1Img     = loadImage("heart_1.png");
  heart2Img     = loadImage("heart_2.png");
  heart3Img     = loadImage("heart_3.png");
  bgImg2        = loadImage("destroyed background - Copy.jpg");
  playerRunning = loadAnimation("Run (1).png","Run (2).png","Run (3).png","Run (4).png","Run (5).png","Run (6).png","Run (7).png","Run (8).png",)
  playerShoot   = loadAnimation("RunShoot (1).png","RunShoot (2).png","RunShoot (3).png","RunShoot (4).png","RunShoot (5).png","RunShoot (6).png","RunShoot (7).png","RunShoot (8).png")
  badImg        = loadAnimation("robot1.png","robot2.png","robot3.png","robot4.png","robot5.png")
  badImg2       = loadImage("monster.png")
  badImg3       = loadImage("SeekPng.com_game-character-png_8150095 (1).png")
  seImg         = loadImage("Download Save The Earth Poster for free.jpg")
  saveImg       = loadImage("Capture.JPG")
  sond          = loadSound("melodyloops-preview-game-time-3m30s.mp3")
  gameOver      = loadSound("mixkit-sad-game-over-trombone-471.wav")
  shootImg      = loadAnimation("Bullet_000.png","Bullet_001.png","Bullet_002.png","Bullet_003.png","Bullet_004.png")
}




function setup() 
{
  createCanvas(windowWidth,windowHeight);
  bg = createSprite(displayWidth/1-280,displayHeight/1-350,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1
  bg.velocityX = -4;

  player = createSprite(displayWidth-800, displayHeight-380, 50, 50);
  player.addAnimation("Shoot",playerRunning)
  player.addAnimation("Bullet",playerShoot)

  heart1 = createSprite(displayWidth-150,40,20,20)
  heart1.visible = false
   heart1.addImage("heart1",heart1Img)
   heart1.scale = 0.4

   heart2 = createSprite(displayWidth-100,40,20,20)
   heart2.visible = false
   heart2.addImage("heart2",heart2Img)
   heart2.scale = 0.4

   heart3 = createSprite(displayWidth-150,40,20,20)
   heart3.addImage("heart3",heart3Img)
   heart3.scale = 0.4
  


  player.scale = 0.7


  obstaclesGroup = new Group();
  bulletGroup = new Group()
  
}

function draw() 
{
  
  background(0);  
  if(gameState === "fight")
  {


    if(life===3){
      heart3.visible = true
      heart1.visible = false
      heart2.visible = false
    }
    if(life===2){
      heart2.visible = true
      heart1.visible = false
      heart3.visible = false
    }
    if(life===1){
      heart1.visible = true
      heart3.visible = false
      heart2.visible = false

    }
    if(life===0){
      
      gameState = "lost"


    }
  
  

    if(EnemiesKilled==20){
      gameState = "won"
    }

    if(bullet==0)
{
  gameState = "bullet"

}

if(obstaclesGroup.isTouching(player))
{

for(var i=0;i<obstaclesGroup.length;i++)
{     
     
 if(obstaclesGroup[i].isTouching(player))
 {
      obstaclesGroup[i].destroy()
     
     life=life-1
 } 

}
}

  
if(bg.x < 800)
{
  bg.x = bg.width/2;
}


if(keyWentDown("space") )
{

  player.addAnimation("Shoot",playerShoot)
  shoot = createSprite(displayWidth-650,player.y-1,20,10)
  shoot.addAnimation("Bullet",shootImg)
  shoot.velocityX = 20;
  shoot.scale = 0.5;
  bulletGroup.add(shoot);  
  player.depth = shoot.depth
  player.depth = player.depth+2
  bullet = bullet-1;
  
}
else if(keyWentUp("space"))
{
  player.addAnimation("Shoot",playerRunning)
}


if(obstaclesGroup.isTouching(bulletGroup)){
  for(var i=0;i<obstaclesGroup.length;i++){     
      
   if(obstaclesGroup[i].isTouching(bulletGroup)){
        obstaclesGroup[i].destroy()
        bulletGroup.destroyEach()
 
        EnemiesKilled = EnemiesKilled+1
        } 
  }
}


  }

  spawnObstacles();
  drawSprites();
  textSize(50)
  fill("red")
text("Bullets Left = " + bullet,displayWidth-1300,displayHeight/2-300)
text("Enemies Killed = " + EnemiesKilled,displayWidth-1300,displayHeight/2-230)

  if(gameState == "lost"){
  
    
    textSize(100)
    fill("red")
    text("You Lost ",400,400)
    obstaclesGroup.destroyEach();

    player.destroy();
    bg.velocityX = 0;
  
  }
  
  //destroy zombie and player and display a message in gameState "won"
  else if(gameState == "won"){
   
    textSize(100)
    fill("yellow")
    text("You Won ",400,400)
    obstaclesGroup.destroyEach();
    player.destroy();
    bg.velocityX = 0;
  
  }
  
  //destroy zombie, player and bullets and display a message in gameState "bullet"
  else if(gameState == "bullet"){
   
    textSize(50)
    fill("yellow")
    text("You ran out of bullets!!!",470,410)
    obstaclesGroup.destroyEach();

    player.destroy();
    bulletGroup.destroyEach();
  bg.velocityX = 0;
  }
  


  
}



function spawnObstacles() {
 
  if (frameCount % 50 === 0) {

    var badRobo = createSprite(camera.position.x+1050,displayHeight-360,50,50);

    badRobo.velocityX = -6
   
 

    var rand = Math.round(random(1,3));
    switch(rand) {
                
      case 1:  badRobo.addAnimation("Roboboy",badImg);
               badRobo.scale = 3;
              break;
      case 2: badRobo.addImage(badImg3);
              badRobo.scale = 0.4;
              break;

      case 3: badRobo.addImage(badImg2);
              badRobo.scale = 0.2;
              break;
      
      default: break;
    }
     
    badRobo.lifetime = 400;
    
    badRobo.setCollider("rectangle",0,0,badRobo.width/2,badRobo.height/2)
    obstaclesGroup.add(badRobo);
    
  }
  
}