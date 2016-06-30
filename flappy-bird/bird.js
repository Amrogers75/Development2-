/**
 * Created by anthonyrogers on 6/13/16.
 */

var fish;
var corals;
var currentState;
var renderingContext;
var frames =0;
var score = 0;
var hscore = 0;
var states = {
    splash: 0,
    Game: 1,
    Score: 2
};

var canvas;

var width;
var height;

var okButton;

var foregroundPosition = 0;




function main() {
    windowSetup();
    canvasSetup();

    currentState = states.Splash;
    document.getElementById("container3").appendChild(canvas);

    fish = new Fish();
    corals = new CoralCollection();

    loadGraphics();
}

function windowSetup() {
    width = window.innerWidth;
    height = window.innerHeight;
    var inputEvent = "touchstart";

    if(width >= 500){
        width=380;
        height=450;
        inputEvent = "mousedown";
        //inputEvent = "keyup";

        document.addEventListener(inputEvent, onpress);
    }
}

function canvasSetup() {
    canvas = document.createElement("canvas");
    canvas.style.border = "10px solid #64000C";

    canvas.width = width;
    canvas.height = height;

    renderingContext = canvas.getContext("2d");
}

function onpress(evt) {
    switch (currentState) {

// Start the game and update the fish velocity.
        case states.Splash:
            currentState = states.Game;
            fish.jump();
            break;

// The game is in progress. Update fish velocity.
        case states.Game:
            fish.jump();
            break;

// Change from score to splash state if event within okButton bounding box
        case states.Score:
            // Get event position
            var mouseX = evt.offsetX, mouseY = evt.offsetY;

            if (mouseX == null || mouseY == null) {
                mouseX = evt.touches[0].clientX;
                mouseY = evt.touches[0].clientY;
            }

            // Check if within the okButton
            if (okButton.x < mouseX && mouseX < okButton.x + okButton.width &&
                okButton.y < mouseY && mouseY < okButton.y + okButton.height
            )

            {
                corals.reset();
                currentState = states.Splash;
                score = 0;
            }
            break;
    }
}

// update and render all sprites before the window repaints

function loadGraphics() {

    var img = new Image();
    img.src = "img/sheet2.png";
    img.onload = function () {
        initSprites(this);
        renderingContext.fillStyle = backgroundSprite.color;
        
        okButton = {
            x: (width - okButtonSprite.width)/ 2,

            y: height - 200,
            width: okButtonSprite.width,
            height: okButtonSprite.height
        };
         gameLoop();
    };
}

function gameLoop(){
    update();
    render();
    window.requestAnimationFrame(gameLoop);
}

function update() {
    document.getElementById("score").innerHTML = "score: " + score;
    document.getElementById("hscore").innerHTML = "high score: " + hscore;
    frames++;
    
// Move left two px each frame. Wrap every 14px.
    if (currentState !== states.Score) {
        foregroundPosition = (foregroundPosition - 2) % 14; 
        
    }

    if (currentState === states.Game) {
        corals.update();
    }

    fish.update();

}

// Draw anything additional ie trees, boats, legs, ect...
function render() {

    // Draw background color
    renderingContext.fillRect(0, 0, width, height);

    // Draw background sprites
    backgroundSprite.draw(renderingContext, 0, height - backgroundSprite.height);
    backgroundSprite.draw(renderingContext, backgroundSprite.width, height - backgroundSprite.height);

    corals.draw(renderingContext);
    fish.draw(renderingContext);

    if (currentState === states.Score) {
        okButtonSprite.draw(renderingContext, okButton.x, okButton.y);
    }

    // Draw foreground sprites
    foregroundSprite.draw(renderingContext, foregroundPosition, height - foregroundSprite.height);
    foregroundSprite.draw(renderingContext, foregroundPosition + foregroundSprite.width, height - foregroundSprite.height);
}

function Fish() {
        this.x = 140;
        this.y = 0;

// The animation sequence
        this.frame = 0;
        this.velocity = 0;
        this.animation = [0, 1, 2, 1];

        this.rotation = 0;
        this.radius = 12;

        this.gravity = 0.20;
        this._jump = 4.6;

        this.jump = function () {
        this.velocity = -this._jump;
    };

// runs animation twice as fast during game

    this.update = function () {

        var n = currentState === states.Splash ? 10 : 5;

        this.frame += frames % n === 0 ? 1 : 0;
        this.frame %= this.animation.length;

        if (currentState === states.Splash) {
            this.updateIdleFish();
        } else {
            this.updatePlayingFish();
        }
    };

    this.updateIdleFish = function () {
        this.y = height - 280 + 5 * Math.cos(frames / 10);
        this.rotation = 0;
    };

    this.updatePlayingFish = function () {
        this.velocity += this.gravity;
        this.y += this.velocity;

        // Change to the score state when fish touches the ground
        if (this.y >= height - foregroundSprite.height - 10) {
            this.y = height - foregroundSprite.height - 10;

            if (currentState === states.Game) {
                currentState = states.Score;
            }

// Set velocity to jump speed for correct rotation
            this.velocity = this._jump;
        }

        // If our player hits the top of the canvas, we crash him
        if (this.y <= 2) {
            currentState = states.Score;
        }

        // When fish lacks upward momentum increment the rotation angle
        if (this.velocity >= this._jump) {
            this.frame = 1;
            this.rotation = Math.min(Math.PI / 2, this.rotation + 0.3);
        } else {
            this.rotation = -0.3;
        }
    };

    this.draw = function (renderingContext) {
        renderingContext.save();

        renderingContext.translate(this.x, this.y);
        renderingContext.rotate(this.rotation);

        var n = this.animation[this.frame];

        fishSprite[n].draw(renderingContext, -fishSprite[n].width / 2, -fishSprite[n].height / 2);

        renderingContext.restore();
    };
}


// The Coral class. Creates instances of Coral.

function Coral() {
    this.x = 500;
    this.y = height - (bottomCoralSprite.height + foregroundSprite.height + 120 + 200 * Math.random());
    this.width = bottomCoralSprite.width;
    this.height = bottomCoralSprite.height;

    // Determines if the fish has collided with the Coral. Calculates x/y difference and use normal vector length       calculation to determine
    this.detectCollision = function () {

        // intersection
        var cx = Math.min(Math.max(fish.x, this.x), this.x + this.width);
        var cy1 = Math.min(Math.max(fish.y, this.y), this.y + this.height);
        var cy2 = Math.min(Math.max(fish.y, this.y + this.height + 111), this.y + 2 * this.height + 80);

        // Closest difference
        var dx = fish.x - cx;
        var dy1 = fish.y - cy1;
        var dy2 = fish.y - cy2;

        // Vector length
        var d1 = dx * dx + dy1 * dy1;
        var d2 = dx * dx + dy2 * dy2;
        var r = fish.radius * fish.radius;

        // Determine intersection
        if (r > d1 || r > d2) {
            currentState = states.Score;
        }
    };

    this.draw = function () {
        bottomCoralSprite.draw(renderingContext, this.x, this.y);
        topCoralSprite.draw(renderingContext, this.x, this.y + 111 + this.height);
    }
}


function CoralCollection() {
    this._corals = [];


     // Empty corals array

    this.reset = function () {
        this._corals = [];
    };

    //Creates and adds a new legs to the game.
    this.add = function () {
        this._corals.push(new Coral()); // Create and push coral to array
    };

    //Update the position of existing legs and add new legs when necessary.
    this.update = function () {

        // Add a new legs to the game every 100 frames.
        if (frames % 95 === 0) {
            this.add();
        }


        // Iterate through the array of legs and update each.
        for (var i = 0, len = this._corals.length; i < len; i++) {
            var coral = this._corals[i]; // The current coral.

// If this is the leftmost legs, it is the only coral that the fish can collide with
            if (i === 0) {
                coral.detectCollision();
                // determine if the fish has collided with this leftmost coral.
            }

// Each frame, move each coral two pixels to the left. Higher/lower values change the movement speed.
            coral.x -= 2;
            if (coral.x < -coral.width) {
                // If the coral has moved off screen . . .
                this._corals.splice(i, 1);
               // score++;
                // . . . remove it.
                i--;
                len--;
            }
            if (coral.x == 140){
                score++;
                if(score > hscore){
                    hscore = score;
                    localStorage.setItem("highScore", hscore);
                }
            }
        }
    };

    // Draw all corals to canvas context.
    this.draw = function () {
        for (var i = 0, len = this._corals.length; i < len; i++) {
            var coral = this._corals[i];
            coral.draw();
        }
    };
}

function cscore() {
    var saveScore = localStorage.getItem("highScore");
    hscore = saveScore;

}