/**
 * Created by anthonyrogers on 6/13/16.
 */
// http://uxcobra.com/js/fishGame/
//Required: Create a canvas element with the correct dimensions.
// Global
var fish;
var corals;
var currentState;
var renderingContext;
var frames =0;

var states = {
    splash: 0,
    Game: 0,
    Score: 2
};

var canvas;

var width;
var height;

var okButton;

var forgroundPosition = 0;




function main() {
    windowSetup();
    canvasSetup();

    currentState = states.Splash;
    document.body.appendChild(canvas);

    fish = new Fish();
    //corals = new CoralCollection();

    loadGraphics();
}

function windowSetup() {
    width = window.innerWidth;
    height = window.innerHeight;
    var inputEvent = "touchstart";

    if(width >= 500){
        width=380;
        height=530;
        inputEvent = "mousedown";

        //document.addEventListener(inputEvent, onpress);
    }
}

function canvasSetup() {
    canvas = document.createElement("canvas");
    canvas.style.border = "8px solid #64000C";

    canvas.width = width;
    canvas.height = height;

    renderingContext = canvas.getContext("2d");
}

/**function onpress(evt) {
    switch (currentState){
        case states
    }
}*/

// update and render all sprites before the window repaints

function loadGraphics() {

    var img = new Image();
    img.src = "img/sheet.png";
    img.onload = function () {
        initSprites(this);
        renderingContext.fillStyle = backgroundSprite.color;
        renderingContext.fillRect(0, 0, width, height);
        //backgroundSprite.draw(renderingContext, 0, height - backgroundSprite.height);
        //backgroundSprite.draw(renderingContext, backgroundSprite.width, height - backgroundSprite.height);
        //fishSprite[0].draw(renderingContext, 5, 5, 142, 50);

        /**okButton = {
            x: (width - okButtonSprite.width)/ 2,

            y: height - 200,
            width: okButtonSprite.width,
            height: okButtonSprite.height
        };*/
         gameLoop();
    };
}

function gameLoop(){
    update();
    render();
    window.requestAnimationFrame(gameLoop);
}

function update() {
    frames++;

    /**if (currentState !== states.Score) {
        foregroundPosition = (foregroundPosition - 2) % 14; // Move left two px each frame. Wrap every 14px.
    }

    if (currentState === states.Game) {
        corals.update();
    }*/

    fish.update();

}

// Draw anything additional ie trees, boats, ect...
function render() {
    // Draw background color
    renderingContext.fillRect(0, 0, width, height);

    // Draw background sprites
    backgroundSprite.draw(renderingContext, 0, height - backgroundSprite.height);
    backgroundSprite.draw(renderingContext, backgroundSprite.width, height - backgroundSprite.height);

    // corals.draw(renderingContext);
    fish.draw(renderingContext);

    /**if (currentState === states.Score) {
        okButtonSprite.draw(renderingContext, okButton.x, okButton.y);
    }*/

    // Draw foreground sprites
    /**foregroundSprite.draw(renderingContext, foregroundPosition, height - foregroundSprite.height);
    foregroundSprite.draw(renderingContext, foregroundPosition + foregroundSprite.width, height - foregroundSprite.height);*/
}

function Fish() {
        this.x = 140;
        this.y = 95;

        this.frame = 0;
        this.velocity = 0;
        this.animation = [2, 1, 2, 1]; // The animation sequence

        this.rotation = 0;
        this.radius = 12;

        this.gravity = 0.25;
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
            //this.updateIdleFish();
        } else { // Game state
            //this.updatePlayingFish();
        }
    };

    this.updateIdleFish = function () {
        this.y = height - 280 + 5 * Math.cos(frames / 10);
        this.rotation = 0;
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


//Required: Project has a listener for click events.

//Required: At least the background, foreground, and playable character sprites are loaded and displayed on the canvas

//Required: Project has a game loop which requests animation frames from the canvas and renders the next frame to be displayed.

//Required: Game has three states:
// 1. splash screen, Clicking on the splash screen state starts the game state.
// 2. game state, Hitting a pipe or the ground transitions from the game state to the score state.
// 3. score state, Clicking the "OK" button transitions from the score state to the splash screen state.

//Required: Render pipes to the screen that animate to the left as the game progresses.

//Required: The game detects collisions between the playable character and the pipes, ending the game state and starting the score state if a collision occurs.

//Required: The game detects collisions between the playable character and the ground, ending the game state and starting the high score state if a collision occurs.

//Required: The game keeps track of the user's score. The score starts at 0 and increments by 1 each time the playable character passes a pipe.

//Required: The score is displayed at the top of the screen while the user is playing the game.

//Required: The game keeps track of the user's high score. This high score is stored in local storage and persists between reloads of the game page.

//Required: The score and high score are displayed and labeled in the score state.

//Required: The splash screen state displays "Click to start". Bonus point available if it displays "Tap to start" instead when the touch event is available.

//Advanced: The game window resizes to fill the maximum available space on various sizes of screens.

// Advanced: Users can select a difficulty level which increases or reduces the distance between the top and bottom pipe.