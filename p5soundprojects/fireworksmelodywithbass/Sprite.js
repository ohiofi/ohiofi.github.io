let minorBluesScale = [0,0,0,311.13,349.23,369.99,392.00,466.16,493.88,523.25,622.25,0,0,0];
let GRAVITY = 0.1;

class Sprite{
  constructor(x){
    this.size = 8;
    this.x = x;
    this.startingX = x;
    this.y = random(this.size +1,height-this.size-1);
    this.xperiod = random()*0.125+random()*0.125;
    this.yspeed = floor(random()*5+random()*5);
    if(abs(this.yspeed)<1){
      this.yspeed = 1;
    }
    this.colorList = [
      color(255,0,225),
      color(225,255,0),
      color(0,225,255),
      color(255,100,200),
      color(200,255,100),
      color(100,200,255),
      color(255,200,100),
      color(100,255,200),
      color(200,100,255),
      color(255,0,150),
      color(150,255,0),
      color(0,150,255)
    ];
    this.color = this.colorList[0];
    
    //this.frequency = [220,415.30,554.37];
  }
  play(){
    this.y = Math.ceil(this.y / 20) * 20;
    let index = abs(Math.floor((height-this.y)/height*minorBluesScale.length));
    if(minorBluesScale[index%minorBluesScale.length] == 0){
      return;
    }

    this.color = this.colorList[index%this.colorList.length];
    this.size = width/8;
    
    osc.freq(minorBluesScale[index]*octave, 0.05);
    osc.amp(0.5, 0.2);
    stopSound = frameCount+sixteenth*3;
    playing = true;
  }

  update(){
    if(this.size > 8){
      this.size *= 0.95;
    }else{
      this.yspeed += GRAVITY;
      this.y += this.yspeed
      this.x = this.startingX + sin(frameCount*this.xperiod)*10;
    }

    
    if(this.y - this.size/2 <= 0){
      this.yspeed = abs(this.yspeed*0.8)
    }
    else if(this.y + this.size/2 >= height){
      this.yspeed = -abs(this.yspeed+random(-0.5,2))
    }
  }

  show(){
    //circle(this.x, this.y, 25);
    // textSize(this.size);
    // textAlign(CENTER, CENTER);
    //stroke("black");
    //strokeWeight(5);
    noStroke()
    //text(this.emoji,this.x,this.y)
    fill(this.color)
    circle(this.x,this.y,this.size)
  }
  
}