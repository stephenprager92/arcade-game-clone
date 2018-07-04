// ENEMY CLASS. SETS PROPERTIES / METHODS FOR ENEMIES
class Enemy {

    // Constructor method - takes starting X / Y positions as parameters
    constructor(xPosition, yPosition) {

        // X and Y position for enemy at instantiation
        this.x = xPosition;
        this.y = yPosition;

        // Enemy speed (set randomly for each enemy for game variance)
        // Ensure speed is a certain minimum threshold with speed constant
        this.speed = Math.random() + speedConstant; 

        // Enemy height and width (used to check collisions)
        this.height = blockHeight;
        this.width = blockWidth;

        // The image/sprite for our enemies
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks. 
    update(dt) {

        // If enemy at end of board, reset position
        if (this.x > gameCanvasWidth) {
            this.x = 0;
        }

        // If 5 seconds have passed, get a new enemy speed to slightly adjust board state
        if (secondsAgo(currentTime) > 5) {
            this.speed = Math.random() + speedConstant; 
            currentTime = Math.floor((new Date().getTime() / 1000));
        }

        // Check enemy collision. If collided, move player back to default position and reduce score
        if (this.checkPlayerCollision()) {
            player.x = playerStartX;
            player.y = playerStartY;
            score -= lossScore;
            updateScore();
        }

        else {
            // Movement multiplied by dt to ensure the game runs at the same speed for all computers.
            this.x += blockWidth * this.speed * 1.5 * dt;
        }
    }

    // CHECK PLAYER COLLISION
    // Method used to identify whether or not an enemy collided with player (returns true if so)
    checkPlayerCollision() {
        if (this.x + collisionBuffer < player.x + player.width && this.x + this.width - collisionBuffer > player.x 
            && this.y + collisionBuffer < player.y + player.height && this.height + this.y - collisionBuffer > player.y) {
            console.log("collided enemy");
            return true;
        }
        return false;
    }

    // RENDER - Draw the enemy on the screen
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

        // height and width of player icon (used to check collisions)
        this.height = blockHeight;
        this.width = blockWidth;

        // The image/sprite for our player
        this.sprite = 'images/char-boy.png';
    }

    // Handle input method. Uses key presses to call update function appropriately 
    handleInput(key) {

        switch (key) {
            case 'up':
                if (this.y > 0) {
                    this.update(0, -blockHeight);
                }
               break;
            
            case 'down':
                if (this.y < gameCanvasHeight) {
                    this.update(0, blockHeight);
                }
                break;
            
            case 'left':
                if (this.x > 0) {
                    this.update(-blockWidth, 0);
                }
                break;
            
            case 'right':
                if (this.x < gameCanvasWidth) {
                    this.update(blockWidth, 0);
                }
        }
    }
    
    // CHECK RIVER COLLISION
    // Method used to identify whether or not player entered river and won game (returns true if so)
    checkRiverCollision() {

        // If we've reached the top (y = 0), we've hit the river
        if (player.y < 0) {
            alert("Congratulations! You've reached the river!");
            return true;

        }
        return false;
    }

    // Update the player's position, required method for game
    // This doesn't require dt since position is updated manually by player input
    update(movementX = 0, movementY = 0) {

        // Check river collision (victory). 
        // If collided, move back to default position and increase score / speed
        if (this.checkRiverCollision()) {
            this.x = playerStartX;
            this.y = playerStartY;
            score += victoryScore;
            speedConstant += 0.1;
            updateScore();

            // After each victory, instantiate a new random enemy between board rows 3 & 5 (tile spaces)
            allEnemies.push(new Enemy(boardX, boardY + blockHeight * (boardRows - Math.floor(Math.random() * ((boardRows - 3) + 1) + 3))));
        }

        // Otherwise, just update position
        this.x += movementX;
        this.y += movementY;

    }

    // RENDER - Draw the player on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// GLOBAL VARIABLES / OBJECTS

// Game canvas dimensions
const gameCanvasWidth = 400; // referenced in engine.js, MAKE SURE TO UPDATE IN BOTH IF CHANGING
const gameCanvasHeight = 400; // referenced in engine.js, MAKE SURE TO UPDATE IN BOTH IF CHANGING
const boardX = 0; // X-coordinate, top left corner of (traversable) board
const boardY = 60; // Y-coordinate, Top left corner of (traversable) board
const boardRows = 5; // Rows of (traversable) board
const boardColumns = 5; // Columns of (traversable) board
const blockHeight = 83; // Height of each board block
const blockWidth = 101; // Width of each board block
const collisionBuffer = 35; // Collision buffer (pixels), adjust to increase "proximity" required for collision.

// Game score variables
let score = 0;
const victoryScore = 500; // How many points you gain if you win
const lossScore = 100; // How many points you lose if you step on a bug
let currentTime = Math.floor((new Date().getTime() / 1000)); // Current time (used to refresh enemy speeds)
let speedConstant = 0.7; // speed addition to enemy movement (increases with wins / higher difficulty)

// Player Object
const playerStartX = (gameCanvasWidth / 2);
const playerStartY = gameCanvasHeight;
const player = new Player(playerStartX, playerStartY);

// Enemy Objects / Array
const allEnemies = []; // Holds all current enemies
const enemy1 = new Enemy(boardX + blockWidth * 2, boardY + blockHeight * (boardRows - 3)); // first row, first column (default enemy)
allEnemies.push(enemy1); // Start with one enemy, but dynamically update as player keeps winning

// Prevent default arrow key action (page scrolling) on keydowns
document.addEventListener("keydown", function(e) {
    
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    if (typeof allowedKeys[e.keyCode] !== undefined) {
        e.preventDefault();
    }
});

// Listen for key presses and send the keys to Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    if (typeof allowedKeys[e.keyCode] !== undefined) {
        e.preventDefault();
    }

    player.handleInput(allowedKeys[e.keyCode]);
});

// UPDATE SCORE
// Helper method used to update score HTML on page
function updateScore() {
    const scoreText = document.querySelector('.score');
    scoreText.textContent = score;
}

// EVALUATE PASSED TIME (SECONDS)
// Helper method used to change speed of enemy if board in static state
// Structure taken from https://stackoverflow.com/questions/14696538/javascript-for-how-many-seconds-have-passed-since-this-timestamp
function secondsAgo(time) {
    return Math.floor((new Date().getTime() / 1000)) - time;
}