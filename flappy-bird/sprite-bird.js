/**
 * Created by anthonyrogers on 6/13/16.
 */
var fishSprite;
var backgroundSprite;

function Sprite(img, x, y, width, height) {
    this.img = img;
    this.x = x * 2;
    this.y = y * 2;
    this.width = width * 2;
    this.height = height * 2;
}

Sprite.prototype.draw = function (renderingContext, x, y) {
    renderingContext.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width, this.height);
};

function initSprites(img) {

    fishSprite = [
        new Sprite(img, 174, 115, 55, 28),
        new Sprite(img, 174, 144, 55, 28),
        new Sprite(img, 170, 172, 55, 28)
    ];

    backgroundSprite = new Sprite(img, 0, 0, 138, 114);
    backgroundSprite.color = "#50c878"; // save background color
    
    foregroundSprite = new Sprite(img, 138, 0, 112, 56);

    topCoralSprite = new Sprite(img, 251, 0, 26, 200);
    bottomCoralSprite = new Sprite(img, 277, 0, 26, 200);

    textSprites = {
        floppyFish: new Sprite(img, 59, 114, 96, 22),
        gameOver: new Sprite(img, 59, 136, 94, 19),
        getReady: new Sprite(img, 59, 155, 87, 22)
    };

    topCoralSprite = new Sprite(img, 251, 0, 26, 200);
    bottomCoralSprite = new Sprite(img, 277, 0, 26, 200);


    okButtonSprite = new Sprite(img, 119, 191, 40, 14);

    scoreSprite = new Sprite(img, 138, 56, 113, 58);
    splashScreenSprite = new Sprite(img, 0, 114, 59, 49);

}