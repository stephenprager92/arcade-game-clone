// ENEMY CLASS. SETS PROPERTIES / METHODS FOR ENEMIES
class Enemy {

    // Constructor method - takes starting X / Y positions as parameters
    constructor(xPosition, yPosition) {

        // X and Y position for enemy at instantiation
        this.x = xPosition;
        this.y = yPosition;

        // The image/sprite for our enemies
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(movement, dt) {
        // You should multiply any movement by the dt parameter, which will ensure the game runs at the same speed for all computers.
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// PLAYER CLASS. SETS PROPERTIES / METHODS FOR PLAYER
class Player {

    // Constructor method - takes starting X / Y positions as parameters
    constructor(xPosition, yPosition) {

        // X and Y position for player at instantiation
        this.x = xPosition;
        this.y = yPosition;

        // The image/sprite for our player
        this.sprite = 'images/char-boy.png';
    }

    // Handle input method. Uses key presses to call update function appropriately 
    handleInput(key) {
        switch (key) {

        }
    }

    // Update the players's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(movement, dt) {
        // Multiply any movement by the dt paramter, which will ensure the game runs at the same speed for all computers.
    }

    // Draw the player on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// GLOBAL VARIABLES / OBJECTS

// Game canvas dimensions
const gameCanvasWidth = 400; // referenced in engine.js, MAKE SURE TO UPDATE IN BOTH IF CHANGING
const gameCanvasHeight = 400; // referenced in engine.js, MAKE SURE TO UPDATE IN BOTH IF CHANGIN
const boardX = 0; // X-coordinate, top left corner of (traversable) board
const boardY = 60; // Y-coordinate, Top left corner of (traversable) board
const boardRows = 5; // Rows of (traversable) board
const boardColumns = 5; // Columns of (traversable) board
const blockHeight = 83; // Height of each board block
const blockWidth = 101; // Width of each board block

// Player Object
const player = new Player(gameCanvasWidth / 2, gameCanvasHeight);

// Enemy Objects / Array
const enemy1 = new Enemy(boardX + blockWidth, boardY + blockHeight * (boardRows - 3)); // first row, 100px offscreen
const enemy2 = new Enemy(boardX, boardY + blockHeight * (boardRows - 3)); // first row, 100px offscreen
const enemy3 = new Enemy(boardX, boardY + blockHeight * (boardRows - 4)); // second row, 100px offscreen
const enemy4 = new Enemy(boardX, boardY + blockHeight * (boardRows - 5)); // third row, 100px offscreen
const enemy5 = new Enemy(boardX + blockWidth, boardY + blockHeight * (boardRows - 5)); // third row, 100px offscreen
const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
