---
  layout: post
  title: Node Twitterbot Directions
  date: 2020-07-28
  categories:
  - coding
  tags:
  - Twitter
  - programming
  - coding
  - bots
  - spam
  - Node
  - Heroku
  - git
  - GitHub

---

This post consists of notes to myself, so that I can remember the commands to create a Node.js Twitterbot hosted on Heroku.

1.  Create a Github repo and clone it locally

1.  Create an empty .gitignore

1.  Use npm to generate the initial project.
    ```
    npm init
    ```
    npm asks questions and builds a package.json file.

1.  Install some packages
    ```
    npm install dotenv
    npm install twit
    npm install express
    ```

1.  Create empty .env_sample, and index.js files. Add this to env_sample.
    ```
    CONSUMER_KEY = ...
    CONSUMER_SECRET = ...
    ACCESS_KEY = ...
    ACCESS_SECRET = ...
    ```

1.  Create a public branch for Github and publish it
    ```
    git checkout -b GithubPublic
    git push -u origin GithubPublic
    ```
1.  Go to the website for the Github repo, click Settings>Branches, and change GithubPublic to be the default branch

1.  Add .env and node_modules/ to .gitignore and commit to GithubPublic
    ```
    .env
    node_modules/
    ```

1.  Write code in index.js using this starter code
    ```
    const express = require('express');
    const app = express();
    require('dotenv').config();
    // let Twit = require('twit');
    // var T = new Twit({
    //   consumer_key:         process.env.CONSUMER_KEY,
    //   consumer_secret:      process.env.CONSUMER_SECRET,
    //   access_token:         process.env.ACCESS_KEY,
    //   access_token_secret:  process.env.ACCESS_SECRET,
    //   timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    //   strictSSL:            true,     // optional - requires SSL certificates to be valid.
    // });
    
    // yr code here
    
    app.listen(
      process.env.PORT || 3000,
      ()=>console.log("bot running")
    );
    ```
    
    
1.  Use app.listen to log tests. Run the tests with the command
    ```
    node index.js
    ```
1.  Create .env and add the API keys
    ```
    CONSUMER_KEY = ...
    CONSUMER_SECRET = ...
    ACCESS_KEY = ...
    ACCESS_SECRET = ...
    ```
