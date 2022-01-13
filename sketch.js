var ground, groundImage;
var score = 0;
var car1, car1Img;
var carsG, car3Img, car2Img;
var fimImg;
var gameState = "play";


function preload() {
    groundImage = loadImage("background.png");
    car1Img = loadImage("car1.png");

    car3Img = loadImage("car3.png");
    car2Img = loadImage("car2.png");

    fimImg = loadImage("fimdeJogo.png");
}

function setup() {
    createCanvas(400, 600);
    ground = createSprite(204, 163);
    ground.addImage("ground", groundImage);
    

    car1 = createSprite(200, 480);
    car1.addImage("car1", car1Img)
    car1.scale = 0.3;

    fim = createSprite(200, 300);
    fim.addImage(fimImg);
    fim.scale = 0.6;

    carsG = new Group();
}

function draw() {

    background("black");

    if (gameState === "play") {

        fim.visible = false;

        car1.x = World.mouseX;

        score = score + Math.round(getFrameRate() / 60);
        ground.velocityY = (4+3 * score/50);

        if (ground.y > 400) {
            ground.y = height / 4;
        }

        createcars();

        if (carsG.isTouching(car1)) {
            gameState = "end"
        }
    }
    else if (gameState === "end") {
        fim.visible = true;
        carsG.destroyEach();
        car1.destroy();
        ground.velocityY = 0;
    }
    drawSprites();
    textSize(20);
    fill(255);
    text("DISTÂNCIA: " + score, 10, 30);

}

function createcars() {


    if (World.frameCount % 100 == 0) {
        var cars = createSprite(Math.round(random(50, 350), 40, 10, 10));
        cars.velocityY = (4+3 * score/50);

        car1.depth = cars.depth;
        car1.depth += 1;

        var rand = Math.round(random(1, 2));
        switch (rand) {
            case 1: cars.addImage(car3Img);
                break;
            case 2: cars.addImage(car2Img);
                break;
        }

        cars.scale = 0.3;
        cars.lifetime = 150;
        carsG.add(cars);
    }
}