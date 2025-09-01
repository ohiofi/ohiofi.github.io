let mylist = [];
let osc, playing, freq, amp;
let noise, env, analyzer;
let soundList = [];
let stopSound = 0;
let hasClicked = false;
let framesPerBeat = 7;
let strText = "Bradley";
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
if(urlParams.has('school')){
  strText = urlParams.get('school')
}

function setup() {
  createCanvas(windowWidth, windowHeight).id("canvas");

  for(let i=0;i<12;i++){
    mylist.push(new Sprite());
  }
  osc = new p5.Oscillator('sine');
  noise = new p5.Noise();
}

function mousePressed(){
  hasClicked = true;
  osc.start();
  noise.start();
  noise.amp(0);
  env = new p5.Envelope();
  // set attackTime, decayTime, sustainRatio, releaseTime
  
  // set attackLevel, releaseLevel
  env.setRange(0.25, 0);

  
}

function draw() {
  if(!hasClicked){
    background(128);
    stroke(0)
    text("CLICK TO START",width/2,height/2)
    
  }else{
  // let r=0;
  // let p=0;
  // let s=0;
  background(255,255,255);

  
  for(let each of mylist){
    each.update();
    each.show();
    // if(each.emoji=="🗿")r++
    // if(each.emoji=="📒")p++
    // if(each.emoji=="✂️")s++
  }
  checkCollisions();
  if(frameCount%120==0){
    mylist.shift();
    mylist.push(new Sprite());
  }
  stroke(255)
  strokeWeight(2)
  fill(0)
  
  textAlign(LEFT,BASELINE)
  textSize(10)
  text("FPS: "+floor(frameRate()),10,20)
  // textSize(r/10)
  // text("Rock: "+r,10,40)
  // textSize(p/10)
  // text("Paper: "+p,10,60)
  // textSize(s/10)
  // text("Scissors: "+s,10,80)

  if(frameCount%(framesPerBeat*4)==0){
    env.setADSR(0.001, sin(frameCount*0.001)*0.125+0.125, 0.01, 0.01);
      env.play(noise);
    }
  if(soundList.length > 0 && frameCount%framesPerBeat == 0){
    let toneObj = soundList.shift();
      mylist.push(toneObj)
      osc.freq(toneObj.frequency, 0.01);
      osc.amp(abs(sin(frameCount)), 0.2);
    stopSound = frameCount+3;
    playing = true;
    
    
  }
  else if(playing && frameCount >= stopSound){
    osc.amp(0, 0.3);
    playing = false;
  }
  }
  //screenrecord();
}

function checkCollisions(){
  for(let i=mylist.length-1;i>=0;i--){
    if(mylist[i] instanceof Note && mylist[i].size > mylist[i].maxSize){
      
      mylist.splice(i,1);
      continue;
    } else if(mylist[i] instanceof Note){
        continue;
    }
    for(let j=mylist.length-1;j>=0;j--){
      if(i == j || mylist[j] instanceof Note){
        continue;
      }
      let a = mylist[i];
      let b = mylist[j];
      let minDistance = a.size
      // "🔴","🟣","🔵"
      if(dist(a.x,a.y,b.x,b.y)<minDistance){
        if(a.emoji == "🔴" && b.emoji == "🟣"){
          mylist.splice(i,1);
          let baby = new Sprite();
          baby.emoji = "🟣";
          baby.x = b.x+1;
          baby.y = b.y+1;
          baby.frequency = b.frequency;
          baby.color = b.color;
          mylist.push(baby);
        }else if(a.emoji == "🟣" && b.emoji == "🔵"){
          mylist.splice(i,1);
          let baby = new Sprite();
          baby.emoji = "🔵";
          baby.x = b.x+1;
          baby.y = b.y+1;
          baby.frequency = b.frequency;
          baby.color = b.color;
          mylist.push(baby);
        }else if(a.emoji == "🔵" && b.emoji == "🔴"){
          mylist.splice(i,1);
          let baby = new Sprite();
          baby.emoji = "🔴";
          baby.x = b.x+1;
          baby.y = b.y+1;
          baby.frequency = b.frequency;
          baby.color = b.color;
          mylist.push(baby);
        }
      }
    }
    
  }
}
//update canvas size if window changed
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}