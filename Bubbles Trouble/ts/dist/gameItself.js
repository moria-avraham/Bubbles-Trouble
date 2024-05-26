getPlayerFromLocalStorage();
function getPlayerFromLocalStorage() {
    try {
        var playersStorage = localStorage.getItem('players');
        if (!playersStorage)
            return [];
        var playersArray = JSON.parse(playersStorage);
        renderPlayers(playersArray[0]);
    }
    catch (error) {
        console.error(error);
        return [];
    }
}
function renderPlayers(player) {
    try {
        var rootPlayer = document.querySelector('#container__player');
        var html = "<img class=\"bart\" src=\"" + player.playerImg + "\"> ";
        rootPlayer.innerHTML = html;
        var life_1 = document.querySelector('#container__life');
        var img = "<img id=\"image1\" class=\"Photos\" src=\"" + player.playerImg + "\"> <img id=\"image2\" class=\"Photos\" src=\"" + player.playerImg + "\"> <img id=\"image3\" class=\"Photos\" src=\"" + player.playerImg + "\">";
        life_1.innerHTML = img;
    }
    catch (error) {
        console.error(error);
    }
}
var bart = document.querySelector(".bart");
var shoot = document.querySelector("#container__shoot");
var container = document.querySelector('#container');
document.addEventListener('keydown', function (event) {
    event.stopPropagation();
    var bartRect = bart.getBoundingClientRect();
    var containerRect = container.getBoundingClientRect();
    switch (event.key) {
        case 'ArrowLeft':
            if (bartRect.left > containerRect.left) {
                bart.style.left = bart.offsetLeft - 25 + "px";
            }
            break;
        case 'ArrowRight':
            if (bartRect.right < containerRect.right) {
                bart.style.left = bart.offsetLeft + 25 + "px";
            }
            break;
    }
});
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
function handleKeyDown(event) {
    try {
        if (event.key === ' ') {
            shoot.classList.add('show');
        }
    }
    catch (error) {
        console.error(error);
    }
}
function handleKeyUp(event) {
    try {
        if (event.key === ' ') {
            shoot.classList.remove('show');
        }
    }
    catch (error) {
        console.error(error);
    }
}
function updateTargetPosition() {
    try {
        var sourceRect = bart.getBoundingClientRect();
        var targetRect = shoot.getBoundingClientRect();
        var offsetX = sourceRect.left - targetRect.left;
        var offsetY = sourceRect.top - targetRect.top;
        shoot.style.left = parseFloat(getComputedStyle(shoot).left) + offsetX + 'px';
        shoot.style.top = parseFloat(getComputedStyle(shoot).top) + offsetY + 'px';
    }
    catch (error) {
        console.error(error);
    }
}
setInterval(updateTargetPosition, 100);
var ball = document.querySelector('#container__ball');
var life = document.querySelector('#container__life');
var images = life.querySelectorAll('.Photos');
var collisionCount = 0;
var gameEnded = false;
var ballX = 0;
var ballY = 0;
var ballSpeedX = 5;
var ballSpeedY = 5;
var canMoveBall = true;
function moveBall() {
    try {
        if (gameEnded) {
            return;
        }
        ballX += ballSpeedX;
        ballY += ballSpeedY;
        var containerWidth = container.offsetWidth;
        var containerHeight = container.offsetHeight;
        var ballSize = ball.offsetWidth;
        if (ballX + ballSize >= containerWidth || ballX <= 0) {
            ballSpeedX *= -1;
        }
        if (ballY + ballSize >= containerHeight || ballY <= 0) {
            ballSpeedY *= -1;
        }
        ball.style.left = ballX + 'px';
        ball.style.top = ballY + 'px';
        requestAnimationFrame(moveBall);
    }
    catch (error) {
        console.error(error);
    }
}
moveBall();
function ballAndPlayerCollision() {
    try {
        if (collisionCount >= 3) {
            // console.log("המשחק נגמר");
            gameEnded = true;
            return;
        }
        var playerLocation = bart.getBoundingClientRect();
        var ballLocation = ball.getBoundingClientRect();
        if (playerLocation.right > ballLocation.left &&
            playerLocation.left < ballLocation.right &&
            playerLocation.bottom > ballLocation.top &&
            playerLocation.top < ballLocation.bottom) {
            var imageToRemove = images[collisionCount];
            if (imageToRemove) {
                life.removeChild(imageToRemove);
            }
            collisionCount++;
            if (collisionCount === 1) {
                canMoveBall = false;
                setTimeout(function () {
                    canMoveBall = true;
                }, 1000);
            }
            else if (collisionCount === 2) {
                canMoveBall = false;
                setTimeout(function () {
                    canMoveBall = true;
                }, 1000);
            }
            else if (collisionCount === 3) {
                gameEnded = true;
                life.classList.add("none");
                bart.classList.add("none");
                shoot.classList.add("none");
                ball.classList.add("none");
                var gameOver = document.querySelector('#container__gameOver');
                var html = " <h1>game over</h1>   \n                <a href=\"levels.html\">start over</a>";
                gameOver.innerHTML = html;
                // <i class="fa-solid fa-rotate-left" > </i>
            }
        }
    }
    catch (error) {
        console.error(error);
    }
}
setInterval(function () {
    if (canMoveBall) {
        ballAndPlayerCollision();
    }
}, 10);
setInterval(ballAndShootCollision, 10);
function ballAndShootCollision() {
    try {
        var ropeLocation = shoot.getBoundingClientRect();
        var ballLocation = ball.getBoundingClientRect();
        if (ropeLocation.right > ballLocation.left &&
            ropeLocation.left < ballLocation.right &&
            ropeLocation.bottom > ballLocation.top &&
            ropeLocation.top < ballLocation.bottom) {
            var smallBall1 = document.querySelector('#container__smallBall1');
            var smallBall2 = document.querySelector('#container__smallBall2');
            ball.style.display = 'none';
            smallBall1.style.display = 'block';
            smallBall2.style.display = 'block';
            setInterval(shootBalls, 10);
            // Start updating the positions of the balls
            updateBallsPosition();
        }
    }
    catch (error) {
        console.error(error);
    }
}
// Set initial positions for the balls
var smallBall1X = 0;
var smallBall1Y = 0;
var smallBall2X = 0;
var smallBall2Y = 0;
// Set initial speeds for the balls
var smallBall1SpeedX = 2;
var smallBall1SpeedY = 2;
var smallBall2SpeedX = 3;
var smallBall2SpeedY = 3;
// Function to update the positions of the balls
function updateBallsPosition() {
    try {
        var smallBall1 = document.querySelector('#container__smallBall1');
        var smallBall2 = document.querySelector('#container__smallBall2');
        var containerWidth = container.offsetWidth;
        var containerHeight = container.offsetHeight;
        var smallBallSize = smallBall1.offsetWidth;
        // Update the position of smallBall1
        smallBall1X += smallBall1SpeedX;
        smallBall1Y += smallBall1SpeedY;
        if (smallBall1X + smallBallSize >= containerWidth || smallBall1X <= 0) {
            smallBall1SpeedX *= -1;
        }
        if (smallBall1Y + smallBallSize >= containerHeight || smallBall1Y <= 0) {
            smallBall1SpeedY *= -1;
        }
        smallBall1.style.left = smallBall1X + 'px';
        smallBall1.style.top = smallBall1Y + 'px';
        // Update the position of smallBall2
        smallBall2X += smallBall2SpeedX;
        smallBall2Y += smallBall2SpeedY;
        if (smallBall2X + smallBallSize >= containerWidth || smallBall2X <= 0) {
            smallBall2SpeedX *= -1;
        }
        if (smallBall2Y + smallBallSize >= containerHeight || smallBall2Y <= 0) {
            smallBall2SpeedY *= -1;
        }
        smallBall2.style.left = smallBall2X + 'px';
        smallBall2.style.top = smallBall2Y + 'px';
        // גדחייבדגי
        handleCollision();
        requestAnimationFrame(updateBallsPosition);
    }
    catch (error) {
        console.error(error);
    }
}
function handleCollision() {
    try {
        var collisionCount_1 = 0;
        var gameEnded_1 = false;
        if (collisionCount_1 >= 3) {
            // console.log("המשחק נגמר");
            gameEnded_1 = true;
            return;
        }
        var smallBall1 = document.querySelector('#container__smallBall1');
        var smallBall2 = document.querySelector('#container__smallBall2');
        var playerLocation = bart.getBoundingClientRect();
        var smallBall1Location = smallBall1.getBoundingClientRect();
        var smallBall2Location = smallBall2.getBoundingClientRect();
        if (playerLocation.right > smallBall1Location.left &&
            playerLocation.left < smallBall1Location.right &&
            playerLocation.bottom > smallBall1Location.top &&
            playerLocation.top < smallBall1Location.bottom ||
            playerLocation.right > smallBall2Location.left &&
                playerLocation.left < smallBall2Location.right &&
                playerLocation.bottom > smallBall2Location.top &&
                playerLocation.top < smallBall2Location.bottom) {
            var imageToRemove = images[collisionCount_1];
            if (imageToRemove) {
                life.removeChild(imageToRemove);
            }
            collisionCount_1++;
            if (collisionCount_1 === 1) {
                canMoveBall = false;
                setTimeout(function () {
                    canMoveBall = true;
                }, 1000);
            }
            else if (collisionCount_1 === 2) {
                canMoveBall = false;
                setTimeout(function () {
                    canMoveBall = true;
                }, 1000);
            }
            else if (collisionCount_1 === 3) {
                gameEnded_1 = true;
                life.classList.add("none");
                bart.classList.add("none");
                shoot.classList.add("none");
                ball.classList.add("none");
                var gameOver = document.querySelector('#container__gameOver');
                var html = " <h1>game over</h1> <br>  <a href=\"/levels.html\">back</a>";
                gameOver.innerHTML = html;
            }
        }
    }
    catch (error) {
        console.error(error);
    }
}
setInterval(function () {
    if (canMoveBall) {
        handleCollision();
    }
}, 10);
function shootBalls() {
    try {
        var smallBall1 = document.querySelector('#container__smallBall1');
        var smallBall2 = document.querySelector('#container__smallBall2');
        var ropeLocation = shoot.getBoundingClientRect();
        var smallBall1Location = smallBall1.getBoundingClientRect();
        var smallBall2Location = smallBall2.getBoundingClientRect();
        if (ropeLocation.right > smallBall1Location.left &&
            ropeLocation.left < smallBall1Location.right &&
            ropeLocation.bottom > smallBall1Location.top &&
            ropeLocation.top < smallBall1Location.bottom) {
            smallBall1.style.display = 'none';
        }
        if (ropeLocation.right > smallBall2Location.left &&
            ropeLocation.left < smallBall2Location.right &&
            ropeLocation.bottom > smallBall2Location.top &&
            ropeLocation.top < smallBall2Location.bottom) {
            smallBall2.style.display = 'none';
        }
        if ((ropeLocation.right > smallBall1Location.left &&
            ropeLocation.left < smallBall1Location.right &&
            ropeLocation.bottom > smallBall1Location.top &&
            ropeLocation.top < smallBall1Location.bottom) && (ropeLocation.right > smallBall2Location.left &&
            ropeLocation.left < smallBall2Location.right &&
            ropeLocation.bottom > smallBall2Location.top &&
            ropeLocation.top < smallBall2Location.bottom)) {
            life.classList.add("none");
            bart.classList.add("none");
            shoot.classList.add("none");
            ball.classList.add("none");
            var gameOver = document.querySelector('#container__gameOver');
            var html = " <h1>good job</h1> <br>  <a href=\"/levels.html\">back</a>";
            gameOver.innerHTML = html;
        }
    }
    catch (error) {
        console.error(error);
    }
}
