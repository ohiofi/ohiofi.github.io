// This approach to importing classes works in CJS contexts (i.e., a regular <script src="..."> tag).
const { Stave, StaveNote, Stem, Beam, Formatter, Renderer, KeySignature } = Vex;
let noteHistory = [];
let isPreviousNoteRest = false;
let beamList = [];
const minNote = "a/3";
const maxNote = "a/5";
let quarterMeasureRhythms;
const keyOfCNotes = [
  "a/3",
  "b/3",
  "c/4",
  "d/4",
  "e/4",
  "f/4",
  "g/4",
  "a/4",
  "b/4",
  "c/5",
  "d/5",
  "e/5",
  "f/5",
  "g/5",
  "a/5",
];

function generate() {
  beamList = [];
  noteHistory = [];
  quarterMeasureRhythms = [
    "one quarter note",
    "one quarter note",
    "one quarter note",
    "two eighth notes",
    "two eighth notes",
    "two eighth notes",
    "four sixteenth notes",
    "one quarter rest",
  ];
  // Create an SVG renderer and attach it to the DIV element with id="output".
  const div = document.getElementById("output");
  div.innerHTML = "";
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  // Configure the rendering context.
  renderer.resize(window.innerWidth, window.innerHeight);
  const context = renderer.getContext();

  const keySig1 = getRandomKey();
  const notesMeasure3 = [getFinalNote(keySig1)];
  const notesMeasure2_half2 = generateHalfMeasure();
  const notesMeasure2_half1 = generateHalfMeasure();
  const notesMeasure1_half2 = generateHalfMeasure();
  const notesMeasure1_half1 = generateHalfMeasure();

  // Measure 1
  const staveMeasure1 = new Stave(
    window.innerWidth * 0.1,
    window.innerHeight * 0.4,
    window.innerWidth * 0.35
  );
  let keySig = new KeySignature(keySig1);
  keySig.addToStave(staveMeasure1);
  const notesMeasure1 = notesMeasure1_half1.concat(notesMeasure1_half2);
  const notesMeasure2 = notesMeasure2_half1.concat(notesMeasure2_half2);

  // Measure 2 - second measure is placed adjacent to first measure.
  const staveMeasure2 = new Stave(
    staveMeasure1.width + staveMeasure1.x,
    window.innerHeight * 0.4,
    window.innerWidth * 0.35
  );

  // Measure 3
  const staveMeasure3 = new Stave(
    staveMeasure2.width + staveMeasure2.x,
    window.innerHeight * 0.4,
    window.innerWidth * 0.1
  );

  staveMeasure1.addClef("treble").setContext(context).draw();
  staveMeasure2.setContext(context).draw();
  staveMeasure3.setContext(context).draw();
  Formatter.FormatAndDraw(context, staveMeasure1, notesMeasure1);
  Formatter.FormatAndDraw(context, staveMeasure2, notesMeasure2);
  Formatter.FormatAndDraw(context, staveMeasure3, notesMeasure3);

  // Render beams
  for (let each of beamList) {
    each.setContext(context).draw();
  }
}

// Function to generate a random note
function getRandomNote() {
  return keyOfCNotes[Math.floor(Math.random() * keyOfCNotes.length)];
  //return "b/3"
}

function getOctave(noteName) {
  return noteName.charAt(noteName.length - 1);
}

function getFinalNote(keySignature) {
  //const tempNote = getRandomNote();
  if (Math.random() < 0.5) {
    // major key
    noteHistory.unshift(keySignature[0].toLowerCase() + "/4");
  } else {
    // minor key
    noteHistory.unshift(getExact(keySignature[0].toLowerCase() + "/4", -2));
  }

  return new StaveNote({
    keys: [noteHistory[0]],
    duration: "1",
  });
}

function getRandomKey() {
  const keys = ["C", "F", "Bb", "Eb", "Ab"];
  //const octave = ["/4","/5"]
  return keys[Math.floor(Math.random() * keys.length)];
}

// Function to generate a random rhythm
function getRandomRhythm() {
  const rhythms = ["4", "8", "8.", "16"];
  return rhythms[Math.floor(Math / rhythms.length)];
}

// Function to get a random next note based on neighbor
function getNextNoteName(neighborNote) {
  let indexLocation =
    keyOfCNotes.indexOf(neighborNote) + Math.floor(Math.random() * 5) - 2;
  if (indexLocation < 0 || indexLocation >= keyOfCNotes.length) {
    console.log("stay within range");
    return neighborNote;
  }
  return keyOfCNotes[indexLocation];
}
function getExact(neighborNote, steps) {
  let indexLocation = keyOfCNotes.indexOf(neighborNote) + steps;
  if (indexLocation < 0 || indexLocation >= keyOfCNotes.length) {
    console.log("stay within range");
    return neighborNote;
  }
  return keyOfCNotes[indexLocation];
}

function nameToMidi(name) {
  name = name.replace("/", "");
  var name_to_pc = {
    C: 0,
    D: 2,
    E: 4,
    F: 5,
    G: 7,
    A: 9,
    B: 11,
  };
  var letter = name[0];
  var pc = name_to_pc[letter.toUpperCase()];
  var mod_to_trans = { b: -1, "#": 1 };
  var mod = name[1];
  var trans = mod_to_trans[mod] || 0;
  pc += trans;
  var octave = parseInt(Array.from(name).pop());
  if (octave) {
    return pc + 12 * (octave + 1);
  } else {
    // negative mod 12
    return ((pc % 12) + 12) % 12;
  }
  return pc;
}
function midiToName(noteNumber) {
  noteNumber -= 21;
  const notes = [
    "A",
    "A#",
    "B",
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
  ];
  const octave = Math.floor(noteNumber / 12) + 1;
  const name = notes[noteNumber % 12];
  return name.toLowerCase() + "/" + octave;
}

function addQuarterNote(result) {
  let tempNote1 = getNextNoteName(noteHistory[0]);
  noteHistory.unshift(tempNote1);
  result.unshift(
    new StaveNote({ keys: [tempNote1], duration: "4", auto_stem: true })
  );
  return result;
}

function isStraddling(arr) {
  let gt70 = 0;
  let lte70 = 0;
  for (let each of arr) {
    if (nameToMidi(each) > 70) {
      gt70++;
    } else {
      lte70++;
    }
  }
  return gt70 > 0 && lte70 > 0;
}

function addTwoEighthNotes(result) {
  let tempNote1 = getNextNoteName(noteHistory[0]);
  noteHistory.unshift(tempNote1);
  let tempNote2 = getNextNoteName(noteHistory[0]);
  noteHistory.unshift(tempNote2);
  // if straddling the middle of the measure
  if (isStraddling([tempNote1, tempNote2])) {
    result.unshift(
      new StaveNote({
        keys: [tempNote1],
        duration: "8",
        auto_stem: false,
      }).setStemDirection(Stem.UP)
    );
    result.unshift(
      new StaveNote({
        keys: [tempNote2],
        duration: "8",
        auto_stem: false,
      }).setStemDirection(Stem.UP)
    );
  } else {
    result.unshift(
      new StaveNote({ keys: [tempNote1], duration: "8", auto_stem: true })
    );
    result.unshift(
      new StaveNote({ keys: [tempNote2], duration: "8", auto_stem: true })
    );
  }
  beamList.push(new Beam([result[0], result[1]]));
  return result;
}

function addFourSixteenthNotes(result) {
  let slopes = [
    [0, 0, 0, 0],
    [1, 0, 0, 0],
    [-1, 0, 0, 0],
    [-1, -1, -1, -1],
    [1, 1, 1, 1],
    [1, 0, 1, 0],
    [-1, 0, -1, 0],
    [1, -1, -1, -1],
    [-1, 1, 1, 1],
    [-1, -1, -1, 0],
    [1, 1, 1, 0],
    [1, -2, -1, -1],
    [-1, 2, 1, 1],
  ];
  let randomSlope = Math.min(
    Math.floor(Math.random() * slopes.length),
    Math.floor(Math.random() * slopes.length)
  );
  let tempNote1 = getExact(noteHistory[0], slopes[randomSlope][0]);
  noteHistory.unshift(tempNote1);
  let tempNote2 = getExact(noteHistory[0], slopes[randomSlope][1]);
  noteHistory.unshift(tempNote2);
  let tempNote3 = getExact(noteHistory[0], slopes[randomSlope][2]);
  noteHistory.unshift(tempNote3);
  let tempNote4 = getExact(noteHistory[0], slopes[randomSlope][3]);
  noteHistory.unshift(tempNote4);
  // if straddling the middle of the measure
  if (isStraddling([tempNote1, tempNote2, tempNote3, tempNote4])) {
    result.unshift(
      new StaveNote({
        keys: [tempNote1],
        duration: "16",
        auto_stem: false,
      }).setStemDirection(Stem.UP)
    );
    result.unshift(
      new StaveNote({
        keys: [tempNote2],
        duration: "16",
        auto_stem: false,
      }).setStemDirection(Stem.UP)
    );
    result.unshift(
      new StaveNote({
        keys: [tempNote3],
        duration: "16",
        auto_stem: false,
      }).setStemDirection(Stem.UP)
    );
    result.unshift(
      new StaveNote({
        keys: [tempNote4],
        duration: "16",
        auto_stem: false,
      }).setStemDirection(Stem.UP)
    );
  } else {
    result.unshift(
      new StaveNote({ keys: [tempNote1], duration: "16", auto_stem: true })
    );
    result.unshift(
      new StaveNote({ keys: [tempNote2], duration: "16", auto_stem: true })
    );
    result.unshift(
      new StaveNote({ keys: [tempNote3], duration: "16", auto_stem: true })
    );
    result.unshift(
      new StaveNote({ keys: [tempNote4], duration: "16", auto_stem: true })
    );
  }
  beamList.push(new Beam([result[0], result[1], result[2], result[3]]));
  return result;
}
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function generateHalfMeasure() {
  let result = [];
  for (let i = 0; i < 2; i++) {
    //console.log(noteHistory);
    quarterMeasureRhythms = shuffle(quarterMeasureRhythms);
    //let rand = Math.random() * 100;
    if (quarterMeasureRhythms[0] == "one quarter note") {
      // quarter note
      quarterMeasureRhythms.splice(0, 1);
      result = addQuarterNote(result);
      isPreviousNoteRest = false;
    } else if (quarterMeasureRhythms[0] == "two eighth notes") {
      // two eigth notes
      quarterMeasureRhythms.splice(0, 1);
      result = addTwoEighthNotes(result);
      isPreviousNoteRest = false;
    } else if (
      quarterMeasureRhythms[0] == "four sixteenth notes" &&
      !isPreviousNoteRest
    ) {
      // four 16th notes
      quarterMeasureRhythms.splice(0, 1);
      result = addFourSixteenthNotes(result);
      isPreviousNoteRest = false;
    } else if (quarterMeasureRhythms[0] == "one quarter rest") {
      // quarter rest
      quarterMeasureRhythms.splice(0, 1);
      result.unshift(
        new StaveNote({ keys: ["b/4"], duration: "4r", auto_stem: true })
      );
      isPreviousNoteRest = true;
    } else {
      // oops! we have four sixteenth notes next to a rest!
      // just add a quarter note instead.
      // don't splice the rhythms list so that four sixteenth notes is next.
      result = addQuarterNote(result);
      isPreviousNoteRest = false;
    }
  }
  return result;
}
