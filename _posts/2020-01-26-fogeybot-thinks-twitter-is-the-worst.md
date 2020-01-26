---
  layout: post
  title: FogeyBot Thinks Twitter is the Worst
  date: 2020-01-26
  categories:
  - coding
  tags:
  - Twitter
  - programming
  - coding
  - bots
  - spam
  - jazz

---

A few years ago I had the idea of creating a Twitterbot that would make recommendations. If someone tweets "Recommend a movie" it would randomly reply with a classic movie. This idea was interesting, but wasn’t very funny. I eventually decided that a better idea would be to reply to any "Recommend me music" tweets with incredibly old big band leaders (Glenn Miller and Benny Goodman) and jazz crooners (Bing Crosby and Frank Sinatra). In July of 2015, I made FogeyBot:

<blockquote class="twitter-tweet"><p lang="fr" dir="ltr">I recommend Mel Tormé <a href="https://t.co/HiLPFm888T">https://t.co/HiLPFm888T</a></p>&mdash; Fogey Bot (@fogeybot) <a href="https://twitter.com/fogeybot/status/1155357231791001600?ref_src=twsrc%5Etfw">July 28, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I recommend Benny Goodman <a href="https://t.co/wy4HGNup8E">https://t.co/wy4HGNup8E</a></p>&mdash; Fogey Bot (@fogeybot) <a href="https://twitter.com/fogeybot/status/1163329761554227200?ref_src=twsrc%5Etfw">August 19, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

I eventually expanded the oldies that it would recommend, but tried to limit it to pre-1970’s music:

> "oldmusic":["Glenn Miller","Benny Goodman","Mitch Miller","Lawrence Welk","Perry Como","Henry Mancini","Pat Boone","Duke Ellington","Cab Calloway","Count Basie","Louis Armstrong","Dean Martin","Bobby Darin","Billie Holiday","Ella Fitzgerald","Robert Goulet","Nat King Cole","Andy Williams","Mel Tormé","Frank Sinatra","Liza Minnelli","Tony Bennett","Bing Crosby","Johnny Mathis","Tom Jones","Jimmie Rodgers","Roy Rogers","Merle Travis","Merle Haggard","Hank Snow","Gene Autry","The Carter Family","Hank Williams","Flatt & Scruggs","Bill Monroe","Ralph Stanley","Buck Owens","Bob Wills and His Texas Playboys","Conway Twitty","Chet Atkins","Roger Miller","Elvis Presley","Doris Day","The Everly Brothers","The Weavers","Pete Seeger","Fats Domino","Neil Diamond","Ricky Nelson","Paul Anka","Dionne Warwick","Brenda Lee","Kenny Rogers","Sam Cooke","Jackie Wilson","Chubby Checker","Roy Orbison","Neil Sedaka","Herb Alpert & The Tijuana Brass","Tommy James & The Shondells","Wilson Pickett","Chuck Berry","The Righteous Brothers","Marty Robbins","Petula Clark","Jan & Dean","The Sons of the Pioneers","Cliff Edwards","Hoagy Carmichael","Les Paul & Mary Ford","Sister Rosetta Tharpe","Ernest Tubb","Miles Davis","John Lee Hooker","Lionel Hampton","Peggy Lee","Buddy Holly","Dinah Shore","Muddy Waters","T-Bone Walker","Woody Guthrie","Rose Murphy","Raymond Scott","Fred Astaire","The Dave Brubeck Quartet","Tennessee Ernie Ford","The Kingston Trio","Jim Reeves","Frankie Avalon","Screamin' Jay Hawkins","Nina Simone","George Jones","Little Richard","Harry Belafonte","Wanda Jackson","The Coasters","Jerry Lee Lewis","B.B. King","Howlin' Wolf","Bo Diddley","Ray Charles","Bill Haley and His Comets","Johnny Cash"]

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I recommend Andy Williams <a href="https://t.co/0oRSMVgrP1">https://t.co/0oRSMVgrP1</a></p>&mdash; Fogey Bot (@fogeybot) <a href="https://twitter.com/fogeybot/status/1186522587448270848?ref_src=twsrc%5Etfw">October 22, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="fr" dir="ltr">I recommend Mel Tormé <a href="https://t.co/PwxyEfJkCT">https://t.co/PwxyEfJkCT</a></p>&mdash; Fogey Bot (@fogeybot) <a href="https://twitter.com/fogeybot/status/1210817669512908800?ref_src=twsrc%5Etfw">December 28, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

I originally coded the bot to run on a hourly basis. Eventually a few people complained and the bot was in "Twitter jail" for sending spam. I rewrote the bot so that it replied to tweets directed at it. Send a tweet such as "@fogeybot what music do you like?" Or "@fogeybot what should I listen to?" You will get a random reply such as:

  * Nothin' beats John Lee Hooker... except maybe Howlin' Wolf
  * Hows about Tony Bennett?
  * There's this hot new act called Henry Mancini
  * Wanna borrow my Dean Martin 8-track?

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I recommend Conway Twitty <a href="https://twitter.com/earwigtheband?ref_src=twsrc%5Etfw">@earwigtheband</a> "<a href="https://twitter.com/fogeybot?ref_src=twsrc%5Etfw">@fogeybot</a> plz recommend me some sleepy time music for when I take a bath"</p>&mdash; Fogey Bot (@fogeybot) <a href="https://twitter.com/fogeybot/status/626003683830960130?ref_src=twsrc%5Etfw">July 28, 2015</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


Next, I added some old fogey ramblings. This was a lot of fun to write. Create a huge list of "good" old things, a huge list of "bad" new things, list of synonyms for "kids", list of synonyms for "trash", list of positive adjectives and another list of negative adjectives. Once a week, fogeybot will tweet out a random rant:

- Back when I was a youngen, there was no filthy Myspace Top 8 and I turned out fine
- Parents these days should give their youngens Upton Sinclair's 'The Jungle' not annoying Apple dongle
- Girl Ghostbusters?!! Pedestrian diddly!!!!!!!1
- Does anyone else remember back when the Lindbergh Baby used to be good?
- Is it just me or is terrible Selfie Stick literally the worst thing ever?
- Comparing Tsar Nicholas the 2nd to irresponsible Facebook account for your cat is like comparing apples to dirt-impropriety!
- Wish I was born before all this senseless emoticon foolishness balderdash
- When I was a pubescent with big bands vs moppets nowadays with their hideous Gangnam Style shenanigans
	
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Is it just me or is Twitter literally the worst thing ever?</p>&mdash; Fogey Bot (@fogeybot) <a href="https://twitter.com/fogeybot/status/626905164293738496?ref_src=twsrc%5Etfw">July 31, 2015</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-conversation="none"><p lang="en" dir="ltr">Lads these days need less IMDB bull and more swing music</p>&mdash; Fogey Bot (@fogeybot) <a href="https://twitter.com/fogeybot/status/1043520557113851905?ref_src=twsrc%5Etfw">September 22, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Can&#39;t stand Instagram these days. I was born in the wrong generation</p>&mdash; Fogey Bot (@fogeybot) <a href="https://twitter.com/fogeybot/status/985515671772712960?ref_src=twsrc%5Etfw">April 15, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

At one point I figured out how to use the giphy.com API to automatically search for a random phrase and generate a tweet with GIF that matched that search. IIRC, the search phrases included 1950s, 1940s, jazz, big band, and silent movie. It worked pretty well, until GIPHY changed their API.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">😄 Don&#39;t know this? You&#39;re too young! 💡 <a href="https://t.co/FAKVF0ImON">pic.twitter.com/FAKVF0ImON</a></p>&mdash; Fogey Bot (@fogeybot) <a href="https://twitter.com/fogeybot/status/864359794143932417?ref_src=twsrc%5Etfw">May 16, 2017</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">👤 not too shabby 😓 <a href="https://t.co/AE51QF4A0c">pic.twitter.com/AE51QF4A0c</a></p>&mdash; Fogey Bot (@fogeybot) <a href="https://twitter.com/fogeybot/status/681789825981124608?ref_src=twsrc%5Etfw">December 29, 2015</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="und" dir="ltr"><a href="https://twitter.com/hashtag/geezer?src=hash&amp;ref_src=twsrc%5Etfw">#geezer</a> 😅 👨 <a href="https://t.co/ZpicQ8ZrWQ">pic.twitter.com/ZpicQ8ZrWQ</a></p>&mdash; Fogey Bot (@fogeybot) <a href="https://twitter.com/fogeybot/status/686291500573966336?ref_src=twsrc%5Etfw">January 10, 2016</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/Better?src=hash&amp;ref_src=twsrc%5Etfw">#Better</a> Good ol&#39; days! 😃 <a href="https://t.co/jhtB40c4e8">pic.twitter.com/jhtB40c4e8</a></p>&mdash; Fogey Bot (@fogeybot) <a href="https://twitter.com/fogeybot/status/679922520921776128?ref_src=twsrc%5Etfw">December 24, 2015</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

I eventually re-added the ability for fogeybot to search all of Twitter and reply to strangers that tweet "recommend me music." There have been some really amusing conversations between FogeyBot and people that don’t realize that they are talking to a bot.
