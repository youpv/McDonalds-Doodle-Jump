
let mcBunnySize = 70;
let mcBunnyX;
let mcBunnyY;
let mcBunnyVelocity;
let mcBunnyXSpeed;
let minXSpeed = -10;
let maxXSpeed = 10;
let platformWidth = 88;
let platformHeight = 58;
let numOfPlatforms = 5;
let platformList = [];
let platYChange = 0;
let gameStarted;
let score = 0;
let highScore = 0;
let mcBunnyCharImg;
let platformImg;
let backgroundImg;

// ===========================
//  Inladen sprites
// ===========================
function preload() {

    backgroundImg = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Graph-paper.svg/1024px-Graph-paper.svg.png");
    mcBunnyCharImg = loadImage("assets/character.png");
    platformImg = loadImage("assets/platform.png");
}

// ===========================
//  Controllers
// ===========================
function setup() {
    createCanvas(428, 926);
    frameRate(60);
    gameStarted = false;
}

function draw() {
    background(247, 239, 231);
    image(backgroundImg, 0, 0, 428, 926);
    if (gameStarted == true) {
        //Set up and draw the game
        drawPlatforms();
        drawmcBunny();
        checkCollision();
        movemcBunny();
        moveScreen();
    } else {
        // Start menu
        fill(0);
        textSize(60);
        text("Start", 140, 275);
        textSize(30);
        text("Score: " + score, 150, 325);
        textSize(20);
        text("High Score: " + highScore, 150, 360);
    }
}

//Scherm control voor laagjumpers
function moveScreen() {
    if (mcBunnyY < 550) {
        platYChange = 5;
        mcBunnyVelocity += 0.25;
    } else {
        platYChange = 0;
    }
}

// Start Game
function mousePressed() {
    if (gameStarted == false) {
        score = 0;
        setupPlatforms();
        mcBunnyY = 350;
        mcBunnyX = platformList[platformList.length - 1].xPos + 15;
        mcBunnyVelocity = 0.1;
        gameStarted = true;
    }
}

// ===========================
//  mcBunny
// ===========================
function drawmcBunny() {
    fill(204, 200, 52);
    image(mcBunnyCharImg, mcBunnyX, mcBunnyY, mcBunnySize, mcBunnySize);
}

function movemcBunny() {
    // mcBunny falls with gravity
    mcBunnyVelocity += 0.2;
    mcBunnyY += mcBunnyVelocity;
    window.addEventListener('devicemotion', event => {
        let phoneRotation = event.accelerationIncludingGravity.x;
        mcBunnyX -= Math.min(Math.max((phoneRotation * 2), minXSpeed), maxXSpeed);

    }, true);
}

// ===========================
//  Platforms
// ===========================
function setupPlatforms() {
    for (let i = 0; i < numOfPlatforms; i++) {
        let platGap = height / numOfPlatforms;
        let newPlatformYPosition = i * platGap;
        let plat = new Platform(newPlatformYPosition);
        platformList.push(plat);
    }
}

function drawPlatforms() {
    fill(106, 186, 40);
    platformList.forEach(function (plat) {
        // move all platforms down
        plat.yPos += platYChange;
        image(platformImg, plat.xPos, plat.yPos, plat.width, plat.height);

        if (plat.yPos > 926) {
            score++;
            platformList.pop();
            let newPlat = new Platform(0);
            platformList.unshift(newPlat); // add to front
        }
    });
}

function Platform(newPlatformYPosition) {
    this.xPos = random(15, 325);
    this.yPos = newPlatformYPosition;
    this.width = platformWidth;
    this.height = platformHeight;
}

// ===========================
//  Collisions
// ===========================
function checkCollision() {
    platformList.forEach(function (plat) {
        if (
            mcBunnyX < plat.xPos + plat.width &&
            mcBunnyX + mcBunnySize > plat.xPos &&
            mcBunnyY + mcBunnySize < plat.yPos + plat.height &&
            mcBunnyY + mcBunnySize > plat.yPos &&
            mcBunnyVelocity > 0
        ) {
            mcBunnyVelocity = -10;
        }
    });

    if (mcBunnyY > height) {
        if (score > highScore) {
            highScore = score;
        }
        gameStarted = false;
        platformList = [];
    }

    // screen wraps from left to right
    if (mcBunnyX < -mcBunnySize) {
        mcBunnyX = width;
    } else if (mcBunnyX > width) {
        mcBunnyX = -mcBunnySize;
    }
}





let bestellingLijst = document.querySelector('#bestelling');
bestellingLijst.innerHTML = '';
let bestellingItem = document.createElement('li');
bestellingItem.innerText(bestelling);
bestellingLijst.appendChild(bestellingItem);