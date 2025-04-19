var noOfAnts=30;
var arrayOfAnts = [];
var gameCanvasWidth = 800;
var gameCanvasHeight = 500;
var gameCanvas;
var scoreCount = 0;
var ScoreWrapper;
var inputElement;
var startButton;

/*function startGame() {
    startButton = document.createElement('button');
    startButton.style.position = 'relative';
    startButton.style.top = '300px';
    startButton.style.left = '300px';
    startButton.style.text = 'START';
    startButton.style.width = '100px';
    startButton.style.height = '40px';
    gameCanvas.appendChild(startButton);

     var startInterval = setInterval(function(){
        startButton.onclick = function(){
            noOfAnts=30;
            clearInterval(startInterval);
        }
    },10);

}*/

function CreateScoreBoard() {
    ScoreWrapper = document.getElementById('score-wrapper');
    ScoreWrapper.style.marginBottom = '10px';
    ScoreWrapper.style.marginTop = '10px';
    ScoreWrapper.style.textAlign = 'center';
    inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.style.fontSize = '22px';
    inputElement.style.width = '40px'
    inputElement.style.backgroundColor = 'none';
    inputElement.style.border = 'none';
    ScoreWrapper.appendChild(inputElement);
}

function createGameCanvas() {
    gameCanvas = document.createElement('div');
    gameCanvas.style.width = gameCanvasWidth + 'px';
    gameCanvas.style.borderRadius = '3px';
    gameCanvas.style.height = gameCanvasHeight + 'px';
    gameCanvas.style.backgroundColor = 'lightblue';
    gameCanvas.style.margin = '0 auto';
    gameCanvas.style.position = 'relative';
    document.body.appendChild(gameCanvas);
}

function createAnt() {
    this.ant = document.createElement('div');
    this.ant.style.width = "30px";
    this.ant.style.height = "30px";
    this.ant.style.backgroundImage = "url('images/ant.png')";
    // this.ant.style.backgroundColor = 'green';
    this.ant.style.position = 'absolute';
    gameCanvas.appendChild(this.ant);

    this.positionX = Math.floor((Math.random() * 720) + 15);
    this.positionY = Math.floor((Math.random() * 440) + 15);
    this.dx = Math.random() * 8;
    this.dy = Math.random() * 8;
    // console.log(this.dx + '  ' + this.dy);
    this.antPositionUpdate = function() {
        this.checkCanvasBoundary();
        this.positionX = this.positionX + this.dx;
        this.positionY = this.positionY + this.dy;
        this.ant.style.top = this.positionY + 'px';
        this.ant.style.left = this.positionX + 'px';

    }

    this.checkCanvasBoundary = function() {
        if (this.positionX > 800 - 30 || this.positionX < 10) {
            this.dx = -this.dx;
        }

        if (this.positionY > 500 - 30 || this.positionY < 10) {
            this.dy = -this.dy;
        }
    }
}

function collisonTestLoop(arrayOfAnts) {
    for (var i = 0; i < (arrayOfAnts.length - 1); i++) {
        for (var j = i + 1; j < (arrayOfAnts.length); j++) {
            findCollison(arrayOfAnts[i], arrayOfAnts[j]);
        }
    }
}

function findCollison(arrayA, arrayB) {
    if ((arrayA.positionX + 30 > arrayB.positionX) &&
        (arrayB.positionX + 30 > arrayA.positionX) &&
        (arrayA.positionY + 30 > arrayB.positionY) &&
        (arrayB.positionY + 30 > arrayA.positionY)) {
        if (arrayA.positionX > arrayB.positionX) {
            arrayA.dx = Math.abs(arrayA.dx);
            arrayB.dx = -Math.abs(arrayB.dx);
            if (arrayA.positionY > arrayB.positionY) {
                arrayA.dy = Math.abs(arrayA.dy);
                arrayB.dy = -Math.abs(arrayB.dy);
            } else {
                arrayB.dy = Math.abs(arrayB.dy);
                arrayA.dy = -Math.abs(arrayA.dy);
            }
        } else {
            arrayB.dx = Math.abs(arrayB.dx);
            arrayA.dx = -Math.abs(arrayA.dx);
            if (arrayA.positionY > arrayB.positionY) {
                arrayA.dy = Math.abs(arrayA.dy);
                arrayB.dy = -Math.abs(arrayB.dy);
            } else {
                arrayB.dy = Math.abs(arrayB.dy);
                arrayA.dy = -Math.abs(arrayA.dy);
            }
        }


    }
    // console.log('Array A: '+arrayA.dx+'  '+ arrayB.dx);
}


CreateScoreBoard();
createGameCanvas();
// startGame();


for (var i = 0; i < noOfAnts; i++) {
    arrayOfAnts.push(new createAnt());
    arrayOfAnts[i].ant.onclick = function() {
        scoreCount++;
        var currentAntIndex;
        for (var i = 0; i < arrayOfAnts.length; i++) {
            if (arrayOfAnts[i].ant == this) {
                currentAntIndex = arrayOfAnts.indexOf(arrayOfAnts[i]);
            }
        }
        gameCanvas.removeChild(this);
        arrayOfAnts.splice(currentAntIndex, 1);
    }
    // arrayOfants[i].ant.onclick = function(){
    //     console.log(arrayOfAnts[i].ant);
    // };
}

setInterval(function() {
    collisonTestLoop(arrayOfAnts);
    arrayOfAnts.forEach(function(ants) {
        ants.antPositionUpdate()
    });
    inputElement.value = scoreCount;
}, 50);
