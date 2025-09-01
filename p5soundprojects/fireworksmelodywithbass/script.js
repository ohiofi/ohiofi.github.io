let mylist = [];
let osc, freq, amp;
let bass;
let snare, snareEnv, kick, kickEnv, analyzer;
let soundList = [];
let stopSound = 1;
let hasClicked = false;
let sixteenth = 5;
let playing = true;
let img;
let octave = 1;

function preload(){
  //img = loadImage("https://cdn.glitch.global/b1215cd2-9caa-49aa-9882-1555c4b48a53/clef-154541_1280.png?v=1673318184022");
}

function setup() {
  createCanvas(windowWidth, windowHeight).id("canvas");

  for(let i=1;i<13;i++){
    mylist.push(new Sprite(width/16*3+width/16*i));
  }
  osc = new p5.Oscillator('sine');
  bass = new p5.SqrOsc();
  snare = new p5.Noise();
  kick = new p5.Noise("brown");
}

function mousePressed(){
  hasClicked = true;
  osc.start();
  osc.amp(0);
  bass.start();
  bass.amp(0);
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
    //image(img,0,0,img.width*height/img.height,height)

  
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
    // if(frameCount%(sixteenth*8)==(sixteenth*4)){
    //   snareEnv.setADSR(0.001, sin(frameCount*0.001)*0.0125+0.25, 0.01, 0.01);
    //   snareEnv.play(snare);
    // }
    // if(frameCount%(sixteenth*8)==(sixteenth*6) && random() < 0.3){
    //   snareEnv.setADSR(0.001, sin(frameCount*0.001)*0.0125+0.125, 0.01, 0.01);
    //   snareEnv.play(snare);
    // }
    if(frameCount%(sixteenth*12)==(sixteenth*6)){
      snareEnv.setADSR(0.001, sin(frameCount*0.001)*0.0125+0.125, 0.01, 0.01);
      snareEnv.play(snare);
    }
    if(frameCount%(sixteenth*12)==(sixteenth*10) && random() < 0.35){
      snareEnv.setADSR(0.001, sin(frameCount*0.001)*0.0125+0.125, 0.01, 0.01);
      snareEnv.play(snare);
    }
    if(frameCount%(sixteenth*2)==0 && frameCount%(sixteenth*6) != (sixteenth*2)){
      kickEnv.setADSR(0.001, 0.10, 0.01, 0.01);
      kickEnv.play(kick);
    }
    if(frameCount%(sixteenth*24)==0){
      // switch octave?
        octave = Math.floor(Math.random()*3)*0.5+1;
        bass.freq(random(minorBluesScale)*0.25, 0.05);
        bass.amp(0.09125, 0.2);
      
    }
    if(frameCount%(sixteenth*2)==0 ){
      let index = (frameCount%(sixteenth*24))/(sixteenth*24)*12
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

