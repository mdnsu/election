var canvas = document.querySelector('canvas');
canvas.width = 550;
canvas.height = 640;
canvas.style.margin = '0 auto';
canvas.style.display = 'block';
canvas.style.overflow = 'hidden';
canvas.style.border = '1px solid black';
var context = canvas.getContext('2d');

var carImage = new Image();
var roadImage = new Image();
var enemyImage = new Image();

carImage.src = 'images/car.png';
roadImage.src = 'images/thisroad.png';
enemyImage.src = 'images/enemy.png';

var setSpeed = 1;
var score = 0;
var laneArray = [155, 238, 324];
var isGameOver = false;
var startGame = false;

function loadBackgroundImage() {
    this.xPosition = 0;
    this.yPosition = 0;
    this.dy = 0.7;

    this.initBgParameters = function(xPosition,yPosition) {
    	this.xPosition = xPosition;
    	this.yPosition = yPosition;
    	this.dy = 0.7;
    }


    this.showRoad = function() {
        context.drawImage(roadImage, this.xPosition, this.yPosition);
    }

    this.speedUpdate = function(speed) {
        this.dy = speed;
    }

    this.updateBackgroundImage = function() {
        this.showRoad();
        if (this.yPosition >= 770) {
            this.yPosition = -800;
        }
        this.yPosition += this.dy;
    }
}

function loadCar() {
    this.xPosition = 0;
    this.yPosition = 0;

    this.initCarParameters = function(xPosition,yPosition) {
    	this.xPosition = xPosition;
    	this.yPosition = yPosition;
    }

    this.showCar = function() {
        context.drawImage(carImage, this.xPosition, this.yPosition);
    }

    this.positionLeft = function() {
        if (this.xPosition > 235 && this.xPosition < 320) {
            this.xPosition = 155;

        }

        if (this.xPosition > 320 && this.xPosition < 420) {
            this.xPosition = 238;
        }

    }

    this.positionRight = function() {
        if (this.xPosition > 230 && this.xPosition < 240) {
            this.xPosition = 324;
        }
        if (this.xPosition > 150 && this.xPosition < 160) {
            this.xPosition = 238;
        }
    }

}

function createEnemy() {
    this.xPosition = 0;
    this.yPosition = 0;
    this.dy = 0;

    this.initEnemyParameters = function() {
    	this.xPosition = laneArray[Math.floor(Math.random() * laneArray.length)];
    	this.yPosition = 70;
    	this.dy = 1;
    }


    this.speedUpEnemy = function(speed) {
        this.dy = speed + 2;
    }

    this.showEnemy = function() {
        context.drawImage(enemyImage, this.xPosition, this.yPosition);
    }

    this.enemyUpdates = function() {
        this.showEnemy();
        this.yPosition += this.dy;
        if (this.yPosition >= canvas.height) {
            this.xPosition = laneArray[Math.floor(Math.random() * laneArray.length)];
            this.yPosition = -(canvas.height - 550);
        }
    }
}

function collisionDetect() {
	isGameOver = true;
	context.font = "30px Arial";
	context.fillStyle = 'yellow';
    context.fillText("GAMEOVER" , 180, 100);
    context.font = "20px Arial";
    context.fillText("RESTART => SPACEBAR" , 158, 140);
    context.fill()
}

function checkCollision(myEnemy, createCar) {
    if ((myEnemy.yPosition + 145 > createCar.yPosition) &&
        (myEnemy.xPosition + 80 > createCar.xPosition) &&
        (createCar.yPosition + 145 > myEnemy.yPosition) &&
        (createCar.xPosition + 80 > myEnemy.xPosition)) {
        console.log('collide');
        collisionDetect();
    }
}

function scoreUpdates(initialBg) {
    if (initialBg.dy > 5) {
        score += 0.8
    } else {
        score += 0.4
    }
    context.font = "20px Arial";
    context.fillStyle = "#ffffff";
    context.fillText("SCORE : " + Math.floor(score), 160, 20);
    context.fill();
}

var initialBg = new loadBackgroundImage();
var finalBg = new loadBackgroundImage();
var createCar = new loadCar();
var myEnemy = new createEnemy();

var initialize = () => {
	initialBg.initBgParameters(0,0);
	finalBg.initBgParameters(0,-790);
	createCar.initCarParameters(324, 480);
	myEnemy.initEnemyParameters();
	setSpeed = 1;
    score = 0;
}

initialize();

function keyPressed(key) {
    if (key.keyCode == 38) {
        setSpeed += 1;
        if (setSpeed > 10) {
            setSpeed = 10;
        }
        initialBg.speedUpdate(setSpeed);
        finalBg.speedUpdate(setSpeed);
        myEnemy.speedUpEnemy(setSpeed);
    }
    if (key.keyCode == 40) {
        setSpeed -= 1;
        if (setSpeed <= 0) {
            setSpeed = 1;
        }
        initialBg.speedUpdate(setSpeed);
        finalBg.speedUpdate(setSpeed);
        myEnemy.speedUpEnemy(setSpeed);
    }

    if (key.keyCode == 37) {
        createCar.positionLeft();
    }

    if (key.keyCode == 39) {
        createCar.positionRight();
    }

    if (key.keyCode == 32) {
    	
    	if (!startGame) {
            startGame = true;
            animate();
        } 
        if (isGameOver) {
            isGameOver = false;
            initialize();
            animate();
        }
        
    }



}

window.addEventListener('keydown', keyPressed);

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if(!isGameOver)
    requestAnimationFrame(animate);
    initialBg.updateBackgroundImage();
    finalBg.updateBackgroundImage();
    checkCollision(myEnemy, createCar);
    createCar.showCar();
    myEnemy.enemyUpdates();
    scoreUpdates(initialBg);
}

// animate();
carImage.onload = function(){
	context.drawImage(carImage,250,300);
}
context.font = "30px Arial";
context.fillStyle = "#000000";
context.fillText("HIT 'SPACE BAR' to START", 100, 100);
context.fillText("Move Forward => 'Arrow key'", 100, 500);
context.fill();
