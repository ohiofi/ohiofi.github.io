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

1.  Install dotenv package
    ```
    npm install dotenv
    ```
1.  Install the twit package
    ```
    npm install twit
    ```

1.  Create empty .env, .env_sample, and index.js files

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

1.  Write code in index.js
