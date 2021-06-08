var gameState = 0;
var man;
var ground;
var injectionGroup;
var redVirusGroup;
var greenVirusGroup;
var blueVirusGroup;
var orangeVirusGroup;
var redVirusImg;
var blueVirusImg;
var greenVirusImg;
var orangeVirusImg;
var edges;
var score = 0;
var killSound;
var lives = 3;
function preload() {
  bgImg = loadImage("Images/bg.png");
  manImg = loadAnimation("Images/run1.png", "Images/run2.png", "Images/run3.png",
    "Images/run4.png", "Images/run5.png", "Images/run6.png", "Images/run7.png",
    "Images/run8.png", "Images/run9.png", "Images/run10.png", "Images/run11.png", "Images/run12.png",
    "Images/run14.png", "Images/run15.png", "Images/run16.png", "Images/run17.png",
    "Images/run18.png", "Images/run19.png", "Images/run20.png");
  injectionImg = loadImage("injection.png");
  manStandingImg = loadAnimation("Images/idle.png");
  redVirusImg = loadImage("Images/redcorona.png");
  greenVirusImg = loadImage("Images/greencorona.png");
  orangeVirusImg = loadImage("Images/orangecorona.png");
  blueVirusImg = loadImage("Images/bluecorona.png");
  killSound = loadSound("preview.mp3");

}

function setup() {
  createCanvas(displayWidth, displayHeight);
  man = createSprite(50, displayHeight - 70, 20, 60);
  man.addAnimation("manImg", manImg);
  man.scale = 0.25;

  ground = createSprite(200, displayHeight - 20, width, 10);
  ground.visible = false;

  edges = createEdgeSprites();
  injectionGroup = createGroup();
  redVirusGroup = createGroup();
  greenVirusGroup = createGroup();
  orangeVirusGroup = createGroup();
  blueVirusGroup = createGroup();
}

function draw() {
  background(bgImg);
  if (gameState === 0) {
    textSize(25);
    text("Immunity: " + score, displayWidth - 200, 50);
    text("Lives : " + lives,200,50);
    if (score < 0) {
      lives -= 1;
      if(lives === 0){
        gameState = 1;
      }
    }
    if (keyDown("space")) {
      injection();
    }
    if (redVirusGroup.isTouching(edges[0]) || greenVirusGroup.isTouching(edges[0]) ||
      orangeVirusGroup.isTouching(edges[0]) || blueVirusGroup.isTouching(edges[0])) {
      score -= 100;

    }
    if (keyDown(UP_ARROW)) {
      man.y -= 5;
      man.changeAnimation("manStandingImg", manStandingImg);
    }
    if (keyDown(DOWN_ARROW)) {
      man.y += 5;
    }
    if (injectionGroup.isTouching(redVirusGroup)) {
      redVirusGroup.destroyEach();
      injectionGroup.destroyEach();
      score += 50;

    }
    if (injectionGroup.isTouching(greenVirusGroup)) {
      greenVirusGroup.destroyEach();
      injectionGroup.destroyEach();
      score += 50;
    }
    if (injectionGroup.isTouching(orangeVirusGroup)) {
      orangeVirusGroup.destroyEach();
      injectionGroup.destroyEach();
      score += 50;
    }
    if (injectionGroup.isTouching(blueVirusGroup)) {
      blueVirusGroup.destroyEach();
      injectionGroup.destroyEach();
      score += 50;
    }
    //man.velocityY = man.velocityY + 0.8;
    spawnVirus();
    drawSprites();
  } else {
    textSize(30);
    fill("red");
    text("Immunity Lost", displayWidth / 2 - 30, displayHeight / 2 - 50);
    text("Game End", displayWidth / 2 - 10, displayHeight / 2);
  }

}

function injection() {
  var injection = createSprite(man.x + 100, man.y);
  injection.addImage(injectionImg);
  injection.scale = 0.15;
  injectionGroup.add(injection);
  injection.velocityX = 10;
}

function spawnVirus() {
  if (frameCount % 100 === 0) {
    var virus = createSprite(displayWidth, 300);
    virus.velocityX = -(5 + score / 100);
    virus.lifetime = displayWidth / 5 + 100;
    virus.y = Math.round(random(300, displayHeight - 100));
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1: virus.addImage(redVirusImg);
        redVirusGroup.add(virus);
        virus.scale = 0.15;
        break;
      case 2: virus.addImage(blueVirusImg);
        greenVirusGroup.add(virus);
        virus.scale = 0.25;
        break;
      case 3: virus.addImage(orangeVirusImg);
        orangeVirusGroup.add(virus);
        virus.scale = 0.25;
        break;
      case 4: virus.addImage(greenVirusImg);
        blueVirusGroup.add(virus);
        virus.scale = 0.25;
        break;
    }
  }
}