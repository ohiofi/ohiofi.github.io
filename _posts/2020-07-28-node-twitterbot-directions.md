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

---

This post consists of notes to myself, so that I can remember the commands to create a Node.js Twitterbot hosted on Heroku.

1.  Create a Github repo and clone it locally

1.  Create an empty .gitignore

1.  Use npm to generate the initial project.
    ```
    npm init
    ```
    npm asks questions and builds a package.json file.

1.  Install dotenv package
    ```
    npm install dotenv
    ```
1.  Create .env and .env_sample files
