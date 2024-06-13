import { GameEnd } from './level1.js';
const ball3 = document.querySelector('#container__ball3');
const gameOver = document.querySelector('#container__gameOver');
const life = document.querySelector('#container__life');
const images = life.querySelectorAll('.Photos');
const shoot = document.querySelector(`#container__shoot`);
const player = document.querySelector('#container__player');
const smallBall3 = document.querySelector('#container__smallBall3');
const container = document.querySelector('#container');
let level3 = false;
const pointsStorage = localStorage.getItem('points');
let points = pointsStorage ? JSON.parse(pointsStorage) : [];
if (points.length > 0) {
    if (points[0].currentLevel === 'level3') {
        level3 = true;
    }
}
let ballX = 600;
let ballY = 0;
let ballSpeedX = 5;
let ballSpeedY = 5;
let canMoveBall = true;
let isSmallBall1Exists = true;
function moveBall() {
    try {
        if (level3) {
            if (canMoveBall) {
                const containerRect = container.getBoundingClientRect();
                const ballRect = ball3.getBoundingClientRect();
                ballX += ballSpeedX;
                ballY += ballSpeedY;
                if (ballX + ballRect.width > containerRect.width || ballX < 0) {
                    ballSpeedX *= -1;
                }
                if (ballY + ballRect.height > containerRect.height || ballY < 0) {
                    ballSpeedY *= -1;
                }
                ball3.style.left = ballX + 'px';
                ball3.style.top = ballY + 'px';
                requestAnimationFrame(moveBall);
            }
        }
    }
    catch (error) {
        console.error(error);
    }
}
moveBall();
function checkPlayerBallCollision() {
    try {
        if (level3) {
            const playerLocation = player.getBoundingClientRect();
            const ballLocation = ball3.getBoundingClientRect();
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
    }
    catch (error) {
        console.error(error);
    }
}
function changeBallPosition() {
    try {
        const containerRect = container.getBoundingClientRect();
        const ballRect = ball3.getBoundingClientRect();
        ballX = Math.random() * (containerRect.width - ballRect.width);
        ballY = Math.random() * (containerRect.height - ballRect.height);
        ball3.style.left = ballX + 'px';
        ball3.style.top = ballY + 'px';
    }
    catch (error) {
        console.error(error);
    }
}
let collisionCount = 0;
let gameEnded = false;
function ballAndPlayerCollision() {
    try {
        if (level3) {
            if (collisionCount >= 3) {
                gameEnded = true;
                return;
            }
            const iscollision = checkPlayerBallCollision();
            if (iscollision) {
                const imageToRemove = images[collisionCount];
                if (imageToRemove) {
                    if (imageToRemove.parentNode === life) {
                        life.removeChild(imageToRemove);
                    }
                    else {
                        console.error('The node to be removed is not a child of the expected parent node.');
                    }
                }
                collisionCount++;
                if (collisionCount === 1 || collisionCount === 2) {
                    canMoveBall = false;
                    setTimeout(() => {
                        changeBallPosition();
                        canMoveBall = true;
                        moveBall();
                    }, 1000);
                }
                else if (collisionCount === 3) {
                    gameEnded = true;
                    GameEnd();
                    const html = ` <h1>Game Over</h1>   
                <a href="levels.html">start over</a>`;
                    gameOver.innerHTML = html;
                }
            }
        }
    }
    catch (error) {
        console.error(error);
    }
}
setInterval(() => {
    if (canMoveBall) {
        ballAndPlayerCollision();
    }
}, 10);
setInterval(ballAndShootCollision, 10);
let ballShrunk = false;
let ballHidden = false;
function checkShootBallCollision() {
    try {
        if (level3) {
            const ropeLocation = shoot.getBoundingClientRect();
            const ballLocation = ball3.getBoundingClientRect();
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
    }
    catch (error) {
        console.error(error);
    }
}
function ballAndShootCollision() {
    try {
        const iscollision = checkShootBallCollision();
        if (iscollision) {
            if (!ballShrunk) {
                smallBall3.style.display = 'block';
                ball3.style.width = '50px';
                ball3.style.height = '50px';
                ballShrunk = true;
                changeBallPosition();
                updateBallsPosition();
            }
            else {
                ball3.style.display = 'none';
                ballHidden = true;
            }
        }
    }
    catch (error) {
        console.error(error);
    }
}
const balls = [
    { element: document.getElementById('ball'), smallBallX: 0, smallBallY: 0, smallBallSpeedX: 3.5, smallBallSpeedY: 3.5 },
    { element: document.getElementById('container__smallBall3'), smallBallX: 0, smallBallY: 0, smallBallSpeedX: 3.5, smallBallSpeedY: 3.5 }
];
function updateBallsPosition() {
    try {
        if (canMoveBall) {
            const containerRect = container.getBoundingClientRect();
            balls.forEach(ball => {
                if (ball.element) {
                    const ballRect = ball.element.getBoundingClientRect();
                    ball.smallBallX += ball.smallBallSpeedX;
                    ball.smallBallY += ball.smallBallSpeedY;
                    if (ball.smallBallX + ballRect.width > containerRect.width || ball.smallBallX < 0) {
                        ball.smallBallSpeedX = -ball.smallBallSpeedX;
                    }
                    if (ball.smallBallY + ballRect.height > containerRect.height || ball.smallBallY < 0) {
                        ball.smallBallSpeedY = -ball.smallBallSpeedY;
                    }
                    ball.element.style.left = `${ball.smallBallX}px`;
                    ball.element.style.top = `${ball.smallBallY}px`;
                }
            });
            requestAnimationFrame(updateBallsPosition);
        }
    }
    catch (error) {
        console.error(error);
    }
}
function checkShootSmallBallCollision() {
    try {
        if (level3) {
            const ropeLocation = shoot.getBoundingClientRect();
            const smallBall1Location = smallBall3.getBoundingClientRect();
            if (ropeLocation.right > smallBall1Location.left &&
                ropeLocation.left < smallBall1Location.right &&
                ropeLocation.bottom > smallBall1Location.top &&
                ropeLocation.top < smallBall1Location.bottom) {
                smallBall3.style.display = 'none';
                isSmallBall1Exists = false;
            }
        }
    }
    catch (error) {
        console.error(error);
    }
}
setInterval(checkShootSmallBallCollision, 10);
export function endLevel3() {
    try {
        if (ballHidden && !isSmallBall1Exists) {
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
setInterval(endLevel3, 10);
