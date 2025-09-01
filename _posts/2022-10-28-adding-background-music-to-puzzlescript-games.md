---
  layout: post
  title: Adding Background Music to Puzzlescript Games
  date: 2022-10-28
  categories:
  - programming
  - games
  - how to
  tags:
  - education
  - programming
  - puzzlescript
  - game design
  - code
  - game dev
  - javascript
  - audio
  - music
---

<img src="/assets/Screen Shot 2022-10-23 at 6.08.01 PM.png" alt="Screen shot from the video game 'Return of the Dead Pixels' showing zombies">

Step 1: Make a Puzzlescript game and export it as HTML.


Step 2: Add a toggle switch (a checkbox) inside of the HTML body. Preferably right after the opening `<body>` tag.
```
<label for="musicToggle"><input type="checkbox" id="musicToggle" name="musicToggle" onclick="playBgMusic()" checked>🎵</label>
```

Step 3: Add the audio component and the Javascript code. Preferably right before the closing `</body>` tag. Change `YOUR-FILE-NAME-HERE.mp3` to the name of your music file.
```
<audio id="audio" controls style="display:none">
  <source src="YOUR-FILE-NAME-HERE.mp3" type="audio/mpeg"> Your browser does not support the audio element.
</audio>
<script>
  function playBgMusic(){
    if(document.getElementById("musicToggle").checked){
      document.getElementById('audio').play();
    }else{
      document.getElementById('audio').pause();
    }
  }
  document.addEventListener('keyup', playBgMusic);  
  document.addEventListener("click", playBgMusic);
</script>
```

Step 4: THAT'S IT!

### Check it out by playing Return Of The Dead Pixels, my Puzzlescript zombie game: 
## [https://ohiofi.itch.io/return-of-the-dead-pixels](https://ohiofi.itch.io/return-of-the-dead-pixels)

<img src="/assets/Screen Shot 2022-10-23 at 5.49.36 PM.png" alt="Screen shot from the video game 'Return of the Dead Pixels' showing player surrounded by zombies">

