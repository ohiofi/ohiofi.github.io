/*global touches,tint,abs,angleMode,append,background,beginShape,bezier,box,camera,ceil,CENTER,color,cone,cos,createCanvas,createCanvas,createGraphics,curveVertex,cylinder,DEGREES,displayHeight,displayWidth,dist,div,DOWN_ARROW,ellipse,endShape,fill,floor,frameCount,frameRate,height,image,key,keyCode,keyIsDown,keyIsPressed,keyIsPressed,keyPressed,LEFT,LEFT_ARROW,lerpColor,line,loadImage,loadJSON,loadSound,map,mouseIsPressed,mouseX,mouseY,noFill,noLoop,normalMaterial,noStroke,p5,plane,point,pointLight,pop,push,push,RADIANS,radians,random,rect,resizeCanvas,resizeCanvas,RIGHT,RIGHT_ARROW,rotate,rotateX,rotateY,rotateZ,round,round,scale,shuffle,sin,sphere,stroke,strokeWeight,text,textAlign,textFont,textSize,texture,textWidth,torus,translate,triangle,UP_ARROW,WEBGL,width,windowHeight,windowHeight,windowWidth,world */
/*global Sprite,MobileControls*/
// create variables up here

let bgImg
let frameRateSum = 0;
let badguy,hero,myscreen,mom;
let tealScore=100
let purpleScore=100
let pinkScore=100;
let mobileControls
let pies = [];
let gravity = 1;
//let gravity = 1;
function preload(){
  bgImg = loadImage("./assets/piebackground.png")
  // badguy = new Sprite("LoneSpecificGuillemot-max-1mb.gif");
  // hero = new Sprite("vegetables.gif");
  // badguy.image.width = 100;
  //hero.image.width = 200;
  // badguy.startingdirection = 90;
}

function setup(){ // only when game loads
  createCanvas(windowWidth,windowHeight)
  badguy = new Sprite("./assets/sprite3a.png")
  mom = new Sprite("./assets/sprite1a.png")
  hero = new Sprite("./assets/sprite2a.png")
  mom.image.width = (width+height)/15
  mom.goto(width-100,height/2)
  badguy.image.width = (width+height)/15
  badguy.goto(0,height)
  hero.image.width = (width+height)/15
  hero.startingdirection = 90
  badguy.startingdirection = 90
  gravity = (width+height)/1500
  mobileControls = new MobileControls();
  //hero.goto(width-200,200)
  // MOBILE CONTROLS
  // mobileControls = {
  //   up:new Sprite("./assets/upbutton.png"),
  //   down:new Sprite("./assets/downbutton.png"),
  //   left:new Sprite("./assets/leftbutton.png"),
  //   right:new Sprite("./assets/rightbutton.png"),
  //   star:new Sprite("./assets/starbutton.png")
  // }
  // if(width < 1080){
  //   for(let i in mobileControls){
  //     mobileControls[i]["buttonSize"] = 50
  //     mobileControls[i].image.width = mobileControls[i].buttonSize;
  //     mobileControls.star["starTapped"] = false
  //     mobileControls.up.goto(mobileControls.up.buttonSize * 2, height - mobileControls.up.buttonSize * 3)
  //     mobileControls.down.goto(mobileControls.up.buttonSize * 2, height - mobileControls.up.buttonSize * 1)
  //     mobileControls.left.goto(mobileControls.up.buttonSize * 1, height - mobileControls.up.buttonSize * 2)
  //     mobileControls.right.goto(mobileControls.up.buttonSize * 3, height - mobileControls.up.buttonSize * 2)
  //     mobileControls.star.goto(width - mobileControls.up.buttonSize * 1, height - mobileControls.up.buttonSize * 2)
  //     mobileControls[i].show()
  //   }
  // }
}

function draw(){ // this is a built-in forever loop
  background(255)
  image(bgImg,0,0,bgImg.width*height/bgImg.height,height);
  showText()
  //badguy.setheading(badguy.towards(hero))
  movebadguy()
  movehero()
  mom.x = frameCount*2%width
  //badguy.forward(2)
  badguy.show()
  hero.show()
  mom.show()
  for(let i in pies){
    pies[i].yvelocity += gravity
    pies[i].goto(pies[i].x += pies[i].xvelocity,pies[i].y += pies[i].yvelocity)
    pies[i].show()
    if (pies[i].y > height-100){//if pie off screen
      pies[i].image.style.display = "none"
      pies.splice(i,1)// splice
    }
  }
  
}

function keyPressed() {
  if (keyCode === 32) {
    spawnPie()
  }
}

function movebadguy(){
  if(hero.x > badguy.x){
    badguy.x+=4
    badguy.fliphorizontal(1)
  }
  if(hero.x < badguy.x){
    badguy.x-=4
    badguy.fliphorizontal(-1)
  }
  if(hero.y > badguy.y){
    badguy.y+=4
  }
  if(hero.y < badguy.y){
    badguy.y-=4
  }
  if(badguy.touching(hero) || mom.touching(hero)){
    tealScore -= 0.1
    hero.image.style.background = "teal"
  } else {
    hero.image.style.background = "none"
  }
  for(let i in pies){
    if(pies[i].touching(mom)){
      mom.image.style.background = "pink"
      pinkScore -= 0.1
      break
    } else {
      mom.image.style.background = "none"
    }
  }
  for(let i in pies){
    if(pies[i].touching(badguy)){
      badguy.back(badguy.fliphorizontal()*7)
      badguy.image.style.background = "purple"
      purpleScore -= 0.1
      break
    } else {
      badguy.image.style.background = "none"
    }
  }
}

function movehero(){
  if(keyIsDown(LEFT_ARROW)){
    //hero.left(5)
    hero.x-= 10
    hero.fliphorizontal(-1)
  }
  else if(keyIsDown(RIGHT_ARROW)){
    hero.x += 10;
    //hero.right(5)
    hero.fliphorizontal(1)
  }
  if(keyIsDown(UP_ARROW)){
    hero.y += -10;
    //hero.forward(5)
  }
  else if(keyIsDown(DOWN_ARROW)){
    hero.y += 10;
  }
  checkMobileControls()
}

function spawnPie(){
  pies.push(new Sprite("./assets/pie1.png"));
  pies[pies.length-1].goto(hero.x,hero.y)
  pies[pies.length-1].image.width = (width+height)/45
  pies[pies.length-1].show()
  pies[pies.length-1].fliphorizontal(hero.fliphorizontal())
  pies[pies.length-1].xvelocity = hero.fliphorizontal() * (width+height)/300
  pies[pies.length-1].yvelocity = -(width+height)/90
}


function showText(){
  frameRateSum += frameRate()
  text("FPS: "+round(frameRateSum/frameCount),10,10)
  text("pinkScore: "+round(pinkScore),10,30)
  text("purpleScore: "+round(purpleScore),10,50)
  text("tealScore: "+round(tealScore),10,70)
}

function checkMobileControls(){
  if(width < 1080){
    if(mobileControls.up.isPressed()){
      hero.y-= 10 //go up
    }
    if(mobileControls.down.isPressed()){
      hero.y+= 10 //go down
    }
    if(mobileControls.left.isPressed()){
      hero.x-= 10 //go left
      hero.fliphorizontal(-1)
    }
    if(mobileControls.right.isPressed()){
      hero.x+= 10 //go right
      hero.fliphorizontal(1)
    }
    if(!mobileControls.star.timeout && mobileControls.star.isPressed()){
      spawnPie()
      mobileControls.star.timeout = true
      setTimeout(()=>{mobileControls.star.timeout = false},200) // set minimum time between presses
    }
    // for (let i in touches){
    //   if(mobileControls.left.containsPoint(touches[i])){
    //     hero.x-= 10 //go left
    //     hero.fliphorizontal(-1)
    //   }
    //   if(mobileControls.right.containsPoint(touches[i])){
    //     hero.x+= 10 //go right
    //     hero.fliphorizontal(1)
    //   }
    //   if(mobileControls.up.containsPoint(touches[i])){
    //     hero.y-= 10 //go up
    //   }
    //   if(mobileControls.down.containsPoint(touches[i])){
    //     hero.y+= 10 //go down
    //   }
    //   if(!mobileControls.star.timeout && mobileControls.star.containsPoint(touches[i])){
    //     spawnPie()
    //     mobileControls.star.timeout = true
    //     setTimeout(()=>{mobileControls.star.timeout = false},200) // set minimum time between presses
    //   }
    // }
  }
}
