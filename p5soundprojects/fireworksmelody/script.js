let mylist = [];
let osc, freq, amp;
let snare, snareEnv, kick, kickEnv, analyzer;
let soundList = [];
let stopSound = 1;
let hasClicked = false;
let sixteenth = 14;
let playing = true;
let img;

function preload(){
  img = loadImage("../clef-154541_1280.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight).id("canvas");

  for(let i=1;i<9;i++){
    mylist.push(new Sprite(width/11*2+width/11*i));
  }
  osc = new p5.Oscillator('sine');
  snare = new p5.Noise();
  kick = new p5.Noise("brown");
}

function mousePressed(){
  hasClicked = true;
  osc.start();
  snare.start();
  snare.amp(0);
  snareEnv = new p5.Envelope();
  kick.start();
  kick.amp(0);
  kickEnv = new p5.Envelope();
  // set attackTime, decayTime, sustainRatio, releaseTime
  
  // set attackLevel, releaseLevel
  snareEnv.setRange(0.5, 0);
  kickEnv.setRange(1, 0);
}

function draw() {
  if(!hasClicked){
    background(128);
    stroke(0)
    text("CLICK TO START",width/2,height/2)
    
  }else{

    background("rgba(222,222,222,0.04)");
    drawStaff();
    image(img,0,0,img.width*height/img.height,height)

  
    for(let each of mylist){
      each.update();
      each.show();
    }

    stroke(255)
    strokeWeight(2)
    fill(0)

    textAlign(LEFT,BASELINE)
    textSize(10)
    text("FPS: "+floor(frameRate()),10,20)

  
    // 7 frames = 1 fraction
    // 28 = 1 quarter note
    // 56 = beat 2
    // 1.   +.    2.    +     1.
    // 0   28.   56.   84    112
    if(frameCount%112==56){
      snareEnv.setADSR(0.001, sin(frameCount*0.001)*0.0125+0.25, 0.01, 0.01);
      snareEnv.play(snare);
    }
    if(frameCount%112==84 && random() < 0.3){
      snareEnv.setADSR(0.001, sin(frameCount*0.001)*0.0125+0.125, 0.01, 0.01);
      snareEnv.play(snare);
    }
    if(frameCount%(sixteenth*2)==0){
      kickEnv.setADSR(0.001, 0.125, 0.01, 0.01);
      kickEnv.play(kick);
    }
    if(frameCount%sixteenth==0){
      let index = (frameCount%(sixteenth*8))/(sixteenth*8)*8
      mylist[index].play();
    }
//   if(soundList.length > 0 && frameCount%framesPerBeat == 0){
//     let toneObj = soundList.shift();
//       mylist.push(toneObj)
//       osc.freq(toneObj.frequency, 0.05);
//       osc.amp(abs(sin(frameCount))*0.5+0.5, 0.2);
//     stopSound = frameCount+3;
//     playing = true;
    
    
//   }
    if(playing && frameCount >= stopSound){
      osc.amp(0, 0.1);
      playing = false;
    }
  }
  screenrecord();
}

function drawStaff(){
  stroke("black");
  strokeWeight(5);
  for(let i=1;i<=5;i++){
    line(0,height*0.05+height/7*i,width,height*0.05+height/7*i);
  }
}

