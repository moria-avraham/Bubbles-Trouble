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
    var containerRect = container.getBoundingClientRect();
    var ballRect = ball.getBoundingClientRect();
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    // Check for collision with container walls
    if (ballX + ballRect.width > containerRect.width || ballX < 0) {
        ballSpeedX *= -1;
    }
    if (ballY + ballRect.height > containerRect.height || ballY < 0) {
        ballSpeedY *= -1;
    }
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
    requestAnimationFrame(moveBall);
}
moveBall();
function collision() {
    try {
        var playerLocation = bart.getBoundingClientRect();
        var ballLocation = ball.getBoundingClientRect();
        if (playerLocation.right > ballLocation.left &&
            playerLocation.left < ballLocation.right &&
            playerLocation.bottom > ballLocation.top &&
            playerLocation.top < ballLocation.bottom) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error(error);
    }
}
function GameOver() {
    try {
        life.classList.add("none");
        bart.classList.add("none");
        shoot.classList.add("none");
        ball.classList.add("none");
    }
    catch (error) {
        console.error(error);
    }
}
function ballAndPlayerCollision() {
    try {
        if (collisionCount >= 3) {
            // console.log("המשחק נגמר");
            gameEnded = true;
            return;
        }
        var iscollision = collision();
        if (iscollision) {
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
                GameOver();
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
var ballShrunk = false;
var ballHidden = false;
function collision2() {
    try {
        var ropeLocation = shoot.getBoundingClientRect();
        var ballLocation = ball.getBoundingClientRect();
        if (ropeLocation.right > ballLocation.left &&
            ropeLocation.left < ballLocation.right &&
            ropeLocation.bottom > ballLocation.top &&
            ropeLocation.top < ballLocation.bottom) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error(error);
    }
}
function ballAndShootCollision() {
    try {
        var iscollision = collision2();
        if (iscollision) {
            var smallBall1 = document.querySelector('#container__smallBall1');
            if (!ballShrunk) {
                smallBall1.style.display = 'block';
                ball.style.width = '50px';
                ball.style.height = '50px';
                ballShrunk = true;
            }
            else {
                ball.style.display = 'none';
                ballHidden = true;
            }
            updateBallsPosition();
        }
    }
    catch (error) {
        console.error(error);
    }
}
var balls = [
    { element: document.getElementById('ball'), smallBallX: 0, smallBallY: 0, smallBallSpeedX: 3.5, smallBallSpeedY: 3.5 },
    { element: document.getElementById('container__smallBall1'), smallBallX: 0, smallBallY: 0, smallBallSpeedX: 3.5, smallBallSpeedY: 3.5 }
];
function updateBallsPosition() {
    try {
        var smallBall1 = document.querySelector('#container__smallBall1');
        var containerRect_1 = container.getBoundingClientRect();
        // Update the position of smallBall1
        balls.forEach(function (ball) {
            if (ball.element) { // בדיקה שהאובייקט לא null
                var ballRect = ball.element.getBoundingClientRect(); // גודל ומיקום הכדור
                ball.smallBallX += ball.smallBallSpeedX;
                ball.smallBallY += ball.smallBallSpeedY;
                // בדיקת התנגשויות עם גבולות המיכל
                if (ball.smallBallX + ballRect.width > containerRect_1.width || ball.smallBallX < 0) {
                    ball.smallBallSpeedX = -ball.smallBallSpeedX; // שינוי כיוון התנועה בציר ה-x
                }
                if (ball.smallBallY + ballRect.height > containerRect_1.height || ball.smallBallY < 0) {
                    ball.smallBallSpeedY = -ball.smallBallSpeedY; // שינוי כיוון התנועה בציר ה-y
                }
                // יישום המיקום החדש
                ball.element.style.left = ball.smallBallX + "px";
                ball.element.style.top = ball.smallBallY + "px";
            }
        });
        // קריאה חוזרת לפונקציה ליצירת אנימציה חלקה
        requestAnimationFrame(updateBallsPosition);
        handleCollision();
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
                GameOver();
                var gameOver = document.querySelector('#container__gameOver');
                var html = " <h1>game over</h1>   <a href=\"levels.html\">back</a>";
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
function collision3() {
    try {
        var smallBall1 = document.querySelector('#container__smallBall1');
        var ropeLocation = shoot.getBoundingClientRect();
        var smallBall1Location = smallBall1.getBoundingClientRect();
        if (ropeLocation.right > smallBall1Location.left &&
            ropeLocation.left < smallBall1Location.right &&
            ropeLocation.bottom > smallBall1Location.top &&
            ropeLocation.top < smallBall1Location.bottom) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error(error);
    }
}
setInterval(shootBalls, 10);
var ball1Exist = true;
var ball2Exist = true;
function shootBalls() {
    try {
        var level2 = false;
        var smallBall1 = document.querySelector('#container__smallBall1');
        var ropeLocation = shoot.getBoundingClientRect();
        var smallBall1Location = smallBall1.getBoundingClientRect();
        var iscollision3 = collision3();
        if (iscollision3) {
            smallBall1.style.display = 'none';
            ball1Exist = false;
        }
        if (ballHidden && !ball1Exist) {
            level2 = true;
            var gameOver = document.querySelector('#container__gameOver');
            var html = "<h1>good job</h1>  <a href=\"levels.html\">next level</a>";
            GameOver();
            gameOver.innerHTML = html;
        }
    }
    catch (error) {
        console.error(error);
    }
}
