//variables pour créer les sprites
var nebula, vaiseau,play,groupRoche,groupLasers
//variables pour les images
var nebulaImg, vaisseauImg,thrustImg,playImg,explosionImg,laserImg,asteroideImg;


//dimension zone de jeu
var LARGEUR = 400;
var HAUTEUR = 400;

// variables états de jeu
var vie, score, meilleurScore,angle,statut;
vie = 3;
score = 0;
meilleurScore = 0;
angle= 90;
statut = "start"
function preload(){
  //télécharger les images ici
  nebulaImg = loadImage("nebula.png");
  vaisseauImg = loadImage("spaceship.png");
  thrustImg = loadImage("thrust.png");
  playImg = loadImage("play.png")
  explosionImg = loadAnimation("explosion300.png","explosion301.png","explosion302.png","explosion303.png","explosion304.png","explosion305.png","explosion306.png","explosion307.png","explosion308.png","explosion309.png","explosion310.png","explosion311.png","explosion312.png","explosion313.png","explosion314.png","explosion315.png");
 laserImg = loadAnimation("laser.png");
  asteroideImg = loadAnimation("rock.png")

}

function setup(){
  createCanvas(LARGEUR,HAUTEUR)
  
  nebula = createSprite(200,200,200,200);
  nebula.addImage(nebulaImg);
  nebula.scale = 1.2;
  
  vaiseau = createSprite(200,200,20,20);
  vaiseau.addAnimation("spaceship",vaisseauImg);
  vaiseau.addAnimation("thrust",thrustImg);
  vaiseau.scale = 0.15;
  vaiseau.debug = false;
  vaiseau.setCollider("rectangle",0,0,450,350);
 play = createSprite(200,200)
  play.addImage(playImg);
  play.scale = 0.2;
  groupRoche = createGroup();
  groupLasers = createGroup();
}

function draw(){
  drawSprites();
 fill("red");
textSize(30)
text("vie : "+ vie, 20, 50);
fill("white")
text("score : "+ score, 20, 80);
text("Best : "+ meilleurScore,250,80)
if (statut == "start"){
  score = 0
  vie = 3
  play.visible = true
if (mousePressedOver(play)){
  play.visible = false
  statut = "game"
}
}
if (statut == "game"){
  play.visible = false
if (vie == 0) {
  statut = "finish"
}

if (keyDown("RIGHT")){
  angle += 5
}
if (keyDown("LEFT")){
  angle -= 5
}
vaiseau.rotation = angle
if (keyDown("up")){
 vaiseau.changeAnimation("thrust");
  vaiseau.velocityX += Math.cos(radians(angle))
  vaiseau.velocityY += Math.sin(radians(angle))
  
  
}
for (var i = 0; i < groupLasers.length ;i++) {
for (var j = 0; j < groupRoche.length ; j++) {
  if (groupLasers.get(i).isTouching(groupRoche.get(j))){
var explosions = createSprite(groupRoche.get(j).x,groupRoche.get(j).y)
  explosions.addAnimation("explosion",explosionImg);
  groupRoche.get(j).destroy();
  groupLasers.get(i).destroy();
  explosions.lifetime = 50
  explosions.scale = 1.5
 
   
  score += 10 
  }  
  }
}


for (var h = 0; h < groupRoche.length ; h++ ){
 if (groupRoche.get(h).isTouching(vaiseau)){
var explosions = createSprite(groupRoche.get(h).x,groupRoche.get(h).y)
explosions.addAnimation("explosion",explosionImg);
 groupRoche.get(h).destroy();
 explosions.lifetime = 50
 explosions.scale = 1.5
 vie -= 1
   
 }
}

vaiseau.velocityX *= 0.9 
vaiseau.velocityY *= 0.9 
if (keyWentUp("up")){

vaiseau.changeAnimation("spaceship");}
for (h = 0; h < groupRoche.length; h += 1){
teleport(groupRoche.get(h))  
}

teleport(vaiseau)

aste()

lasers()
 }
if (statut == "finish"){
textSize(50)
text("Game Over", 70, 350);
meilleurScore = Math.max(score, meilleurScore)

play.visible = true
if (mousePressedOver(play)){
  vie = 3
  score = 0
  groupRoche.destroyEach()
  groupLasers.destroyEach()
  statut = "game"
}
}

  
}
 function teleport(sprite) {
if(sprite.x > 400 ){
  sprite.x = 5
}

if(sprite.x < 0){
  sprite.x = 395
}
if(sprite.y > 400){
  sprite.y = 5
} 
 if(sprite.y < 0){
   sprite.y = 395
 }  
   
 
 }
 
 function aste(){
  if(World.frameCount % 90 === 0){
    var rocheX = 400* Math.random()
    var rocheY = 400* Math.random()
  while (Math.abs(rocheX - vaiseau.x)< 100 && Math.abs(rocheY - vaiseau.y)< 100) {
    rocheX = 400* Math.random()
    rocheY = 400* Math.random()
    }
      
    var roche = createSprite(rocheX,rocheY,30,30)
    roche.setCollider("circle",0,0,200)
    roche.addAnimation("rock",asteroideImg);
roche.scale = 0.15
  roche.velocityX = 7*Math.random() -3.5
  roche.velocityY = 7*Math.random() -3.5 
  roche.rotationSpeed = 3*Math.random()
  roche.lifetime = 400
  groupRoche.add(roche);
    }
   
   }
 
function lasers() {
  if (keyWentDown("space") && groupLasers.length < 3) {
    var laser = createSprite(vaiseau.x,vaiseau.y)
    laser.addAnimation("laser",laserImg);
    laser.scale = 0.5
   laser.setCollider("rectangle",0,0,100,60)
   laser.rotation = angle
   laser.velocityY = 8* Math.sin(radians(angle)) 
   laser.velocityX = 8* Math.cos(radians(angle))
   laser.lifetime = 400
   groupLasers.add(laser)
    
   
  }
  
  
  
}
