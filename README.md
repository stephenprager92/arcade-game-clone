# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [Other Contributors](#other-contributors)
* [Contributing](#contributing)
* [Licenses](#licenses)

## Instructions

This project is a simple arcade game that mimics the design and objective of the classic arcade game Frogger. 

To run this game on your browser, you'll need to download the following files (all included within this repository!):
1. index.html
2. css
   * style.css
3. js
   * app.js
   * engine.js
   * resources.js
4. images 
   * All included .png files (needed to load the game board and sprites). Some images are currently not used in the game, but this may change in later iterations

Once all the above files have been loaded onto your computer, open index.html in a web browser of your choice and you'll be ready to get started. Note that the browser must support ES6 (due to usage of the 'class' keyword). If your browser does not support the ES6 features in this game, you can use a JS transpiler Babel (https://babeljs.io/) to transpile the code to ES5.

To play the game, move the player icon (indicated by the boy sprite on the game canvas) to the river at the top of the screen. The player is controlled using the keyboard's arrow keys and can move in all four cardinal directions across the game board's frame. Reaching the river will award the player with 500 points and reset their position to the bottom for another attempt. Be careful not to make contact with bugs! Doing so will deduct 100 points from the player's score and reset the player icon to the bottom of the screen.

Bug speed is currently randomized, unique and changes slightly every 5 seconds for unpredictability. 

The game starts with only one bug, but as the player continues to win the game more bugs are added. Bug speed also gradually increases with more victories.

## Other Contributors

Starter HTML / CSS code, game engine, and default artwork (including images, stying, and symbols) taken from the Udacity classroom. 

## Contributing

Since this project is being used as an evaluation for the Udacity FEND, at this time I am **NOT** accepting pull requests. This may change as the project and nanodegree course are completed and I look to optimize the project further, so stay tuned!

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

## Licenses

This project is freely available for you to use however you want. If you are a fellow Udacity FEND student, feel free to look at this project but please do not utilize any of my code in a way that violates Udacity's Honor Code / plagiarism guidelines.

