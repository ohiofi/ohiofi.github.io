# p5js with GIF files

Click p5gif in the top-left and choose Remix This

# Background
To make a background use the command background() within the draw function
```javascript
//color = "whatever color you would like"
let color = "lightblue"
function draw(){
  background(color)
}
``` 
If you would like to make the background an image, first add the image to your Glitch project's ```assets``` folder. You will copy/paste the URL for your image from ```assets```. Make sure you load the image in the preload function (especially if it is a large image).
```javascript
let image
function preload(){
  image = loadImage("https://cdn.glitch.com/1324someLongImageURL.png?6897")
}
function draw(){
  background(image)
}
```

# Making Sprites
To make a sprite, first add the gif to your Glitch project's ```assets``` folder.
Second, create a variable name for the sprite.
```javascript
let tina
let steve
```
Then make a new sprite using ```new Sprite()``` within the built-in ```setup()``` function. You will copy/paste the URL for your gif from the Glitch project's ```assets```.
```javascript
function setup(){
  tina = new Sprite("vegetables.gif") //copy/paste the URL from assets
  steve = new Sprite("https://cdn.glitch.com/3214yourLongImgURL.gif?8679")
}
```
Make sure to show your sprite my using the sprites ```show``` function in the draw function.
This will draw your Sprite in its correct x,y location
```javascript
function draw(){
  tina.show()
}
```
# Resize your sprite
Use .image.width to set the new width
```javascript
function setup(){
  steve = new Sprite("https://cdn.glitch.com/3214yourLongImgURL.gif?8679")
  steve.image.width = 200
}
```

# Moving your sprite
To move your sprite, use the ```forward()``` method within the built-in ```draw()``` function
```javascript
function draw(){
  tina.forward(10)
}
```

# Turning your sprite
use the ```left()``` and ```right()``` functions to turn your sprite
```javascript
function draw(){
  tina.right(90)
  tina.forward(10)
  tina.left(90)
}
```

# Handling Clicks
There are many ways to handle a click in p5 but the most simple way is ```mousePressed()```.
```javascript
function mousePressed(position){
  if(touching.alien(position)){
    alert("Got me!")
  }
  else{
    alert("missed me")
  }
}
```

# Sounds
To make a sound first import the sound into your assets
Then define the new audio as a variable within the built-in ```preload()``` function
```javascript
function preload(){
  let newSound = new Audio("sound.mp3")
}
```
Then play the sound when you want using the ```play()``` function 
```javascript 
function preload(){
  let newSound = new Audio("sound.mp3")
}
function mousePressed(position){
  if(touching.alien(position)){
    newSound.play()
    alert("Got me!")
  }
  else{
    alert("missed me")
  }
}
```
