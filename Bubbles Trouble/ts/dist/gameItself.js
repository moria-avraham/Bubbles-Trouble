var smallBall1 = document.querySelector('#container__smallBall1');
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
        if (canMoveBall) {
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
    }
    catch (error) {
        console.error(error);
    }
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
function collisions() {
    try {
        var playerLocation = bart.getBoundingClientRect();
        var ballLocation = smallBall1.getBoundingClientRect();
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
        smallBall1.classList.add("none");
    }
    catch (error) {
        console.error(error);
    }
}
function changeBallPosition() {
    try {
        var containerRect = container.getBoundingClientRect();
        var ballRect = ball.getBoundingClientRect();
        ballX = Math.random() * (containerRect.width - ballRect.width);
        ballY = Math.random() * (containerRect.height - ballRect.height);
        ball.style.left = ballX + 'px';
        ball.style.top = ballY + 'px';
    }
    catch (error) {
        console.error(error);
    }
}
function ballAndPlayerCollision() {
    try {
        if (collisionCount >= 3) {
            gameEnded = true;
            return;
        }
        var iscollision = collision();
        var collisionsmallBal = collisions();
        if (iscollision || collisionsmallBal) {
            var imageToRemove = images[collisionCount];
            if (imageToRemove) {
                life.removeChild(imageToRemove);
            }
            collisionCount++;
            if (collisionCount === 1 || collisionCount === 2) {
                canMoveBall = false;
                setTimeout(function () {
                    changeBallPosition();
                    canMoveBall = true;
                    moveBall();
                    updateBallsPosition();
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
            if (!ballShrunk) {
                smallBall1.style.display = 'block';
                ball.style.width = '50px';
                ball.style.height = '50px';
                changeBallPosition();
                ballShrunk = true;
                updateBallsPosition();
            }
            else {
                ball.style.display = 'none';
                ballHidden = true;
            }
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
        if (canMoveBall) {
            var containerRect_1 = container.getBoundingClientRect();
            balls.forEach(function (ball) {
                if (ball.element) {
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
        }
    }
    catch (error) {
        console.error(error);
    }
}
function collision3() {
    try {
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
        var iscollision3 = collision3();
        if (iscollision3) {
            smallBall1.style.display = 'none';
            ball1Exist = false;
        }
        if (ballHidden && !ball1Exist) {
            var pointsStorage = localStorage.getItem('points');
            var points = pointsStorage ? JSON.parse(pointsStorage) : [];
            if (points.length > 0) {
                points[0].level = 'level2';
            }
            localStorage.setItem('points', JSON.stringify(points));
            GameOver();
            var gameOver = document.querySelector('#container__gameOver');
            var html = "<h1>good job</h1>  <a href=\"levels.html\">next level</a>";
            gameOver.innerHTML = html;
        }
    }
    catch (error) {
        console.error(error);
    }
}
