---
  layout: post
  title: Detecting Sentence Structure with Regex
  date: 2020-01-23
  categories:
  - education
  tags:
  - regex
  - programming
  - coding
  - Markov
  - Markov chain
  
---
This afternoon I was working on a Markov chain project that would build n-grams from movie and tv show synopses and then generate "crossover" texts that combine the movies/tv shows. Most of the summary texts came from IMDb and I would simply have to remove the names of actors from within the texts. For example...

> Nick Fury issues a state of emergency, telling his top agents Phil Coulson (Clark Gregg), Natasha Romanoff (Scarlett Johansson), and Maria Hill (Cobie Smulders), that they are completely out of options.

Removing these actor name is the first bit of regex: `/\(.*?\)/`

Include the white space before the first parenthesis like this: `/\s\(.*?\)/`

To build the Markov chain, I followed [this Coding Train tutorial video](https://thecodingtrain.com/CodingChallenges/042.1-markov-chains.html). Here is an example of some output using summary texts of Star Wars, MCU films, Harry Potter, Frozen, Shrek, and Batman.  

> Luke returns to Queens to await another visions, and he is saved from Vader's gunfire and doesn't like hats because Snape killed him" (referring to a kiss she gave him in return Strange studies under the influence the next movie. Luke and the Tesseract, an energy source of a Jedi. Later, Obi-Wan explains that Gotham with her own life at stake, Anna rushes in front of them, grieving as Ginny comforts him with his best friends and Asgard's forces. Spending time with Yoda. They fight guards on the night in the Darkhold also comes to Elsa's curse. Anna, however, is captured for the Yellowjacket suit and unlock some advanced technology by using Vibranium comes from 1940. Escaping its collapse. Dried lava and brimstone are everywhere. In a stunning everyone into the minds of every person in the library guarded by a dozen inmates focus their parents and they concoct a plan to eliminate the agency's enemies broken out of Arkham. He even gives Batman throws the bomb was molded from. Fox explains to Han that R2 is carrying the throne of Asgard, Odin, and with the halves of a broken, sharp pool stick and no choice but to run away, so he tracks down through a window. Donkey tells Shrek that Fiona doesn't realise what's been happening in his name. Tony is doing a display of his weapons manufacturing company, Stark Industries.


The text is fun and rambling, but it might be easier to read if it were separated into paragraphs. To do this, simply split the text into an array with the separator ". " and then form paragraphs of 2-4 sentences. Right? There is an immediate problem. The code thinks that "Dr. " is a complete sentence. Anagrams such as S.H.I.E.L.D. sometimes have similar issues. 

Google searches turn up long lines of regex that seem to always fail when I test them at [regex101.com](https://regex101.com). After a bit of trial and error, I end up using the following regex:

```
var myarray = result.match(/(["’"]?.*?(Mr|Ms|Mrs|Dr|Capt|Col)+\.\s.*?[\.!\?]+["’"]?\s|["’"]?[^\.!\?]+[\.!\?]+["’"]?\s|[^\.!\?]+[\.!\?]+\s)/g);
```

Here is the final result using that regex...

<blockquote>
  <p style="text-indent:60px">
  Luke returns to Queens to await another visions, and he is saved from Vader's gunfire and doesn't like hats because Snape killed him" (referring to a kiss she gave him in return Strange studies under the influence the next movie. Luke and the Tesseract, an energy source of a Jedi. Later, Obi-Wan explains that Gotham with her own life at stake, Anna rushes in front of them, grieving as Ginny comforts him with his best friends and Asgard's forces.
  </p>
  <p style="text-indent:60px">
  Spending time with Yoda. They fight guards on the night in the Darkhold also comes to Elsa's curse. Anna, however, is captured for the Yellowjacket suit and unlock some advanced technology by using Vibranium comes from 1940. Escaping its collapse.
  </p>
  <p style="text-indent:60px">
  Dried lava and brimstone are everywhere. In a stunning everyone into the minds of every person in the library guarded by a dozen inmates focus their parents and they concoct a plan to eliminate the agency's enemies broken out of Arkham. He even gives Batman throws the bomb was molded from. Fox explains to Han that R2 is carrying the throne of Asgard, Odin, and with the halves of a broken, sharp pool stick and no choice but to run away, so he tracks down through a window.
  </p>
  <p style="text-indent:60px">
  Donkey tells Shrek that Fiona doesn't realise what's been happening in his name. Tony is doing a display of his weapons manufacturing company, Stark Industries.
  </p>
</blockquote>
