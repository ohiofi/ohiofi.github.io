class Note{
  constructor(x,y,color,frequency){
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = 10;
    this.maxSize = 300;
    this.frequency = frequency;
  }
  update(){
    this.size *= 1.2;
  }
  show(){
    noStroke();
    fill(this.color);
    circle(this.x,this.y,this.size)
  }
}