/*global touches,abs,angleMode,append,background,beginShape,bezier,box,camera,ceil,CENTER,color,cone,cos,createCanvas,createCanvas,createGraphics,curveVertex,cylinder,DEGREES,displayHeight,displayWidth,dist,div,DOWN_ARROW,ellipse,endShape,fill,floor,frameCount,frameRate,height,image,key,keyCode,keyIsDown,keyIsPressed,keyIsPressed,keyPressed,LEFT,LEFT_ARROW,lerpColor,line,loadImage,loadJSON,loadSound,map,mouseIsPressed,mouseX,mouseY,noFill,noLoop,normalMaterial,noStroke,p5,plane,point,pointLight,pop,push,push,RADIANS,radians,random,rect,resizeCanvas,resizeCanvas,RIGHT,RIGHT_ARROW,rotate,rotateX,rotateY,rotateZ,round,round,scale,shuffle,sin,sphere,stroke,strokeWeight,text,textAlign,textFont,textSize,texture,textWidth,torus,translate,triangle,UP_ARROW,WEBGL,width,windowHeight,windowHeight,windowWidth,world */

/*
*
----------------------------
How to setup MobileControls
----------------------------
Add this inside the p5js setup function...

mobileControls = new MobileControls();

----------------------------
How to use MobileControls
----------------------------
function touchStarted(){ // touchStarted() is built-in to p5js
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
  }
}
*/

class Sprite{
  constructor(gifURL){
    this.x = windowWidth/2; 
    this.y = windowHeight/2;
    this.direction = 0;
    this.imagefacing = 0; // 0=facing east 90=north 180=west 270=south
    this.flipimagehorizontal = 1; // 1=east -1=west
    this.xvelocity = 0;
    this.yvelocity = 0;
    this.image = new Image();
    this.image.src = gifURL;
    this.image.width = 100;
    this.image.style.position = "absolute";
    this.image.style.display = "none";
    this.image.style.pointerEvents = "none";
    document.body.appendChild(this.image);
  }
  //distance is a getter method. requires 1 or 2 arguments, either 1 Sprite object or 2 coordinates. returns the distance.
  distance(otherSprite,yloc){
    if (typeof yloc !== "undefined"){ // if two arguments were given
      return dist(this.x,this.y,otherSprite,yloc)
    }else{ // if only one argument was given
      return dist(this.x,this.y,otherSprite.x,otherSprite.y)
    }
  }
  fliphorizontal(oneOrNegativeOne){
    if (typeof oneOrNegativeOne !== "undefined"){ // if one argument was given
      if(oneOrNegativeOne == 1){
        this.image.style.transform = "scaleX(1)";
        this.flipimagehorizontal = 1
      }
      if(oneOrNegativeOne == -1){
        this.image.style.transform = "scaleX(-1)";
        this.flipimagehorizontal = -1
      }
    } else { // if no argument was given
      return this.flipimagehorizontal
    }
  }
  forward(speed){
    this.x += cos(this.radians(this.direction+this.imagefacing)) * speed;
    this.y -= sin(this.radians(this.direction+this.imagefacing)) * speed;
  }
  back(speed){
    this.forward(-speed)
  }
  goto(somex,somey){
    this.x = somex;
    this.y = somey;
  }
  //isPressed checks for touchscreen touches. returns true/false
  isPressed(){
    for (let i in touches){
      if(this.containsPoint(touches[i])){
        return true
      }
    }
    return false
  }
  left(turnAmount){
    this.direction += (turnAmount);
  }
  right(turnAmount){
    this.direction += -1*turnAmount;
  }
  setheading(input){
    this.direction = input-this.imagefacing;
  }
  show(){
    this.image.style.display = "block";
    if(this.direction != 0){
      this.image.style.transform="rotate("+(-this.direction)+"deg)" //rotate
    }
    this.image.style.left = this.x - this.image.width/2 + "px"
	  this.image.style.top = this.y - this.image.height/2 + "px"
  }
  //touching is a getter method. requires 1 or 2 arguments, either 1 Sprite object or 2 coordinates. returns true or false.
  touching(otherSprite,yloc){
    // """
    // Returns True if another sprite or a point (x,y) is touching the wall.
    // This method is overloaded (there are multiple ways to call it)
    //   EITHER:
    //     mywall.touching(player1)
    //   OR:
    //     mywall.touching(newx, newy)
    // """
    let checkx, checky
    if (typeof yloc !== "undefined"){ // if two arguments were given
      
      checkx = otherSprite
      checky = yloc
      return this.containsPoint({x:checkx,y:checky})
    }else{ // if only one argument was given, then we are comparing sprites
      if(otherSprite.containsPoint(this.getBottomRight()))
         return true
      if(otherSprite.containsPoint(this.getBottomMid()))
         return true
      if(otherSprite.containsPoint(this.getBottomLeft()))
         return true
      if(otherSprite.containsPoint(this.getMidLeft()))
         return true
      if(otherSprite.containsPoint(this.getTopLeft()))
         return true
      if(otherSprite.containsPoint(this.getTopMid()))
         return true
      if(otherSprite.containsPoint(this.getTopRight()))
         return true
      if(otherSprite.containsPoint(this.getMidRight()))
         return true
      if(otherSprite.containsPoint(this.getTopRight()))
         return true
      return otherSprite.containsPoint({x:this.x,y:this.y})
    }
  }
  // containsPoint returns true or false if this sprite contain the given point {x,y}
  containsPoint(point){
    let checkx = point.x
    let checky = point.y
    // Only do these complex calculation if point is within range
    if (this.distance(checkx,checky) <= Math.sqrt(this.image.width/2 * this.image.width/2 + this.image.height/2 * this.image.height/2)){
    // Don't bother with calculating rotation if there is no rotation
      if (this.direction == 0){
        return this.x-this.image.width/2.0 < checkx < this.x+this.image.width/2.0 && this.y-this.image.height/2.0 < checky < this.y+this.image.height/2.0
      }else{
        // Rotate point checkx,checky by a given angle around a given origin.
        // The angle should be given in radians.
        let angle = this.radians(this.direction)
        let rotatedx = this.x + Math.cos(angle) * (checkx - this.x) - Math.sin(angle) * (checky - this.y)
        let rotatedy = this.y + Math.sin(angle) * (checkx - this.x) + Math.cos(angle) * (checky - this.y)
        return this.x-this.image.width/2.0 < rotatedx &&
          rotatedx < this.x+this.image.width/2.0 &&
          this.y-this.image.height/2.0 < rotatedy &&
          rotatedy < this.y+this.image.height/2.0
      }
    }
    return false
  }
  towards(someSprite,yloc){
    if (typeof yloc !== "undefined"){ // if two arguments were given
      let opposite = someSprite - this.x
      let adjacent = yloc - this.y
        //return -Math.degrees(Math.asin(opposite/adjacent))
      return -(Math.atan2(adjacent, opposite) * 180 / Math.PI)
    }else{
      if(someSprite.hasOwnProperty('x') && someSprite.hasOwnProperty('y')){ // if this object has an x and a y
        let opposite = someSprite.x - this.x
        let adjacent = someSprite.y - this.y
        //return -Math.degrees(Math.asin(opposite/adjacent))
        return -(Math.atan2(adjacent, opposite) * 180 / Math.PI)
      }
      return 0
    }
  }
  radians(mydegrees){
    return mydegrees * 2 * Math.PI / 360
  }
  polarToCart(r,theta){
    // Convert polar to cartesian
    let x = r * cos(theta);
    let y = r * sin(theta);
    return {x:x,y:y}
  }
  cartToPolar(x,y){
    let r = Math.sqrt(x*x + y*y)
    let radians = Math.atan2(y,x) //This takes y first
    return{ r:r, theta:radians }
  }
  getRotatedPoint(point){
    point = this.cartToPolar(point.x,point.y)
    point = this.polarToCart(point.r,point.theta - this.radians(this.direction))
    return {x:this.x + point.x,y:this.y + point.y}
  }
  getTopLeft(){
    let point = {x:-this.image.width/2,y:-this.image.height/2}
    return this.getRotatedPoint(point)
  }
  getTopMid(){
    let point = {x:0,y:-this.image.height/2}
    return this.getRotatedPoint(point)
  }
  getTopRight(){
    let point = {x:this.image.width/2,y:-this.image.height/2}
    return this.getRotatedPoint(point)
  }
  getMidLeft(){
    let point = {x:-this.image.width/2,y:0}
    return this.getRotatedPoint(point)
  }
  getMidRight(){
    let point = {x:this.image.width/2,y:0}
    return this.getRotatedPoint(point)
  }
  getBottomLeft(){
    let point = {x:-this.image.width/2,y:this.image.height/2}
    return this.getRotatedPoint(point)
  }
  getBottomMid(){
    let point = {x:0,y:this.image.height/2}
    return this.getRotatedPoint(point)
  }
  getBottomRight(){
    let point = {x:this.image.width/2,y:this.image.height/2}
    return this.getRotatedPoint(point)
  }
}

class MobileControls{
  constructor(){
    this.up=new Sprite("https://cdn.glitch.com/d030acea-3fe6-484f-bbb1-851d3048c4bf%2Fupbutton.png?1553106656787");
    this.down=new Sprite("https://cdn.glitch.com/d030acea-3fe6-484f-bbb1-851d3048c4bf%2Fdownbutton.png?1553106656665");
    this.left=new Sprite("https://cdn.glitch.com/d030acea-3fe6-484f-bbb1-851d3048c4bf%2Fleftbutton.png?1553106656750");
    this.right=new Sprite("https://cdn.glitch.com/d030acea-3fe6-484f-bbb1-851d3048c4bf%2Frightbutton.png?1553106655939");
    this.star=new Sprite("https://cdn.glitch.com/d030acea-3fe6-484f-bbb1-851d3048c4bf%2Fstarbutton.png?1553106106998");
    this.buttonSize = 50;
    if(width < 1080){
      this.up.image.width = this.buttonSize;
      this.down.image.width = this.buttonSize;
      this.left.image.width = this.buttonSize;
      this.right.image.width = this.buttonSize;
      this.star.image.width = this.buttonSize;
      this.star["timeout"] = false;
      this.up.goto(this.buttonSize * 2, height - this.buttonSize * 3)
      this.down.goto(this.buttonSize * 2, height - this.buttonSize * 1)
      this.left.goto(this.buttonSize * 1, height - this.buttonSize * 2)
      this.right.goto(this.buttonSize * 3, height - this.buttonSize * 2)
      this.star.goto(width - this.buttonSize * 1, height - this.buttonSize * 2)
      this.up.show();
      this.down.show();
      this.left.show();
      this.right.show();
      this.star.show();
    }
  }
}