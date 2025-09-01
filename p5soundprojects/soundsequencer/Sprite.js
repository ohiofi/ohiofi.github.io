class Sprite{
  constructor(){
    let group = floor(random(3));
    this.size = 80;
    this.x = random(this.size +1,width-this.size-1);
    this.y = random(this.size +1,height-this.size-1);
    this.xspeed = floor(random(-1,1)*2+random(-1,1)*5);
    if(abs(this.xspeed)<1){
      this.xspeed = 1;
    }
    this.yspeed = floor(random(-1,1)*2+random(-1,1)*5);
    if(abs(this.yspeed)<1){
      this.yspeed = 1;
    }
    this.emoji = ["🔴","🟣","🔵"][group];
    this.color = ["rgba(255,100,100,0.5)","rgba(255,100,255,0.5)","rgba(100,100,255,0.5)"][group];
    
    this.frequency = [220,280,440][group];
  }

  update(){
    // this.x = this.x + this.xspeed;
    // this.y = this.y + this.yspeed;
    this.x += this.xspeed
    this.y += this.yspeed
    if(this.x+this.size/2 > width){
      this.xspeed *= -1.01
      soundList.push(new Note(this.x,this.y,this.color,this.frequency));
    }
    if(this.x-this.size/2 < 0){
      this.xspeed *= -1.01
      soundList.push(new Note(this.x,this.y,this.color,this.frequency));
    }
    if(this.y+this.size/2 > height){
      this.yspeed *= -1.01;
      soundList.push(new Note(this.x,this.y,this.color,this.frequency));
    }
    if(this.y-this.size/2 < 0){
      this.yspeed *= -1.01
      soundList.push(new Note(this.x,this.y,this.color,this.frequency));
    }
  }

  show(){
    //circle(this.x, this.y, 25);
    textSize(this.size);
    textAlign(CENTER, CENTER);
    stroke("red");
    strokeWeight(5);
    text(this.emoji,this.x,this.y)
  }
  
}