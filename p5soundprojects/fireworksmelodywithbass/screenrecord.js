   // SETUP: must give the canvas an ID in setup
   // myCanvas.id("canvas");

   // DRAW: at the bottom of draw, call the record() funct

   
   // Create a capturer that exports a WebM video
   var capturer = new CCapture( { format: 'webm',name:"p5",framerate: 60 } );
   var myCanvas;
   var startRecord = 1;
   var endRecord = -1;
   var enableRecording = true;
   function keyPressed() {
     if(enableRecording && keyCode === 82){ // r key
       console.log("recording");
       startRecord = frameCount + 1;
       endRecord = frameCount + 25 * 60;
     }
   }
   function screenrecord(){
     if(endRecord>startRecord && frameCount === startRecord){
       capturer.start();
     }
     if(endRecord>startRecord && frameCount < endRecord){
       capturer.capture(document.getElementById('canvas'));
     } else if (endRecord>startRecord && frameCount === endRecord){
       capturer.save();
       capturer.stop();
     }
   }