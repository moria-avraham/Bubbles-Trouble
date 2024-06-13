import { GameEnd } from './level1.js';
const gameOver = document.querySelector('#container__gameOver') as HTMLElement;
const life = document.querySelector('#container__life') as HTMLElement;
const images = life.querySelectorAll('.Photos');
const shoot = document.querySelector(`#container__shoot`) as HTMLElement;
const ball2 = document.querySelector('#container__ball2') as HTMLElement;
const container = document.querySelector('#container') as HTMLElement;
let level2 = false;
const pointsStorage = localStorage.getItem('points');
let points = pointsStorage ? JSON.parse(pointsStorage) : [];
if (points.length > 0) {
    if (points[0].currentLevel === 'level2') {
        level2 = true;
    }
}


let ballX = 600;
let ballY = 0;
let ballSpeedX = 5;
let ballSpeedY = 5;
let canMoveBall = true;
let ballExist = true;
let endTheGame = false;

moveBall()
function moveBall() {
    try {
        if (level2) {
            if (canMoveBall) {

                const containerRect = container.getBoundingClientRect();
                const ballRect = ball2.getBoundingClientRect();


                ballX += ballSpeedX;
                ballY += ballSpeedY;


                if (ballX + ballRect.width > containerRect.width || ballX < 0) {
                    ballSpeedX *= -1;
                }
                if (ballY + ballRect.height > containerRect.height || ballY < 0) {
                    ballSpeedY *= -1;
                }

                ball2.style.left = ballX + 'px';
                ball2.style.top = ballY + 'px';
                requestAnimationFrame(moveBall);
            }
        }
    } catch (error) {
        console.error(error);
    }
}
function checkPlayerBallCollision() {
    try {
        if (level2) {
            const playerImage = document.querySelector('.bart') as HTMLElement;
            const playerLocation = playerImage.getBoundingClientRect();
            const ballLocation = ball2.getBoundingClientRect();
            if (
                playerLocation.right > ballLocation.left &&
                playerLocation.left < ballLocation.right &&
                playerLocation.bottom > ballLocation.top &&
                playerLocation.top < ballLocation.bottom
            ) {
                return true;
            } else {
                return false;
            }
        }
    } catch (error) {
        console.error(error);
    }
}

let collisionCount = 0;
let gameEnded = false;
function changeBallPosition() {
    try {
        const containerRect = container.getBoundingClientRect();
        const ballRect = ball2.getBoundingClientRect();

        ballX = Math.random() * (containerRect.width - ballRect.width);
        ballY = Math.random() * (containerRect.height - ballRect.height);

        ball2.style.left = ballX + 'px';
        ball2.style.top = ballY + 'px';

    } catch (error) {
        console.error(error);
    }
}
function ballAndPlayerCollision() {
    try {
        if (collisionCount >= 3) {
            gameEnded = true;
            return;
        }
        const iscollision = checkPlayerBallCollision()
        if (iscollision) {
            const imageToRemove = images[collisionCount];
            if (imageToRemove) {
                life.removeChild(imageToRemove);
            }
            collisionCount++;
            if (collisionCount === 1 || collisionCount === 2) {
                canMoveBall = false;
                setTimeout(() => {
                    changeBallPosition()
                    canMoveBall = true;
                    moveBall();
                }, 1000);
            } else if (collisionCount === 3) {
                gameEnded = true;
                GameEnd()
                const html = ` <h1>Game Over</h1>   
                <a href="levels.html">start over</a>`
                gameOver.innerHTML = html;
            }
        }
    } catch (error) {
        console.error(error);
    }
}

setInterval(() => {
    if (canMoveBall) {
        ballAndPlayerCollision();
    }
}, 10);
export function checkShootBall2Collision() {
    try {
        if (level2) {
            const ropeLocation = shoot.getBoundingClientRect();
            const ballLocation = ball2.getBoundingClientRect();

            if (
                ropeLocation.right > ballLocation.left &&
                ropeLocation.left < ballLocation.right &&
                ropeLocation.bottom > ballLocation.top &&
                ropeLocation.top < ballLocation.bottom
            ) {
                return true;
            } else {
                return false;
            }
        }
    } catch (error) {
        console.error(error);
    }
}

export function ball2AndShootCollision() {
    try {
        const iscollision = checkShootBall2Collision()
        if (iscollision) {
            ball2.style.display = 'none';
            return true
        } else {
            return false
        }
    } catch (error) {
        console.error(error)
    }
}
setInterval(ball2AndShootCollision, 10);

