
const smallBall1 = document.querySelector('#container__smallBall1') as HTMLElement;

getPlayerFromLocalStorage()
function getPlayerFromLocalStorage() {
    try {
        const playersStorage = localStorage.getItem('players');
        if (!playersStorage) return [];
        const playersArray = JSON.parse(playersStorage);
        renderPlayers(playersArray[0])
    } catch (error) {
        console.error(error);
        return [];
    }

}


function renderPlayers(player) {
    try {
        const rootPlayer = document.querySelector('#container__player') as HTMLElement;
        const html = `<img class="bart" src="${player.playerImg}"> `;
        rootPlayer.innerHTML = html;
        const life = document.querySelector('#container__life') as HTMLElement;
        const img = `<img id="image1" class="Photos" src="${player.playerImg}"> <img id="image2" class="Photos" src="${player.playerImg}"> <img id="image3" class="Photos" src="${player.playerImg}">`
        life.innerHTML = img;
    } catch (error) {
        console.error(error);
    }
}




const bart = document.querySelector(`.bart`) as HTMLElement;
const shoot = document.querySelector(`#container__shoot`) as HTMLElement;
const container = document.querySelector('#container') as HTMLElement;
document.addEventListener('keydown', (event: KeyboardEvent) => {
    event.stopPropagation();
    const bartRect = bart.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    switch (event.key) {
        case 'ArrowLeft':
            if (bartRect.left > containerRect.left) {
                bart.style.left = `${bart.offsetLeft - 25}px`;
            }
            break;
        case 'ArrowRight':
            if (bartRect.right < containerRect.right) {
                bart.style.left = `${bart.offsetLeft + 25}px`;
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
    } catch (error) {
        console.error(error);
    }
}

function handleKeyUp(event) {
    try {

        if (event.key === ' ') {
            shoot.classList.remove('show');
        }
    } catch (error) {
        console.error(error);
    }
}

function updateTargetPosition() {
    try {
        const sourceRect = bart.getBoundingClientRect();
        const targetRect = shoot.getBoundingClientRect();

        const offsetX = sourceRect.left - targetRect.left;
        const offsetY = sourceRect.top - targetRect.top;

        shoot.style.left = parseFloat(getComputedStyle(shoot).left) + offsetX + 'px';
        shoot.style.top = parseFloat(getComputedStyle(shoot).top) + offsetY + 'px';
    } catch (error) {
        console.error(error)
    }

}

setInterval(updateTargetPosition, 100);

const ball = document.querySelector('#container__ball') as HTMLElement;
const life = document.querySelector('#container__life') as HTMLElement;
const images = life.querySelectorAll('.Photos');
let collisionCount = 0;
let gameEnded = false;

let ballX = 0;
let ballY = 0;
let ballSpeedX = 5;
let ballSpeedY = 5;
let canMoveBall = true;


function moveBall() {
    try {
        if (canMoveBall) {

            const containerRect = container.getBoundingClientRect();
            const ballRect = ball.getBoundingClientRect();


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
    } catch (error) {
        console.error(error);
    }
}

moveBall();

function collision() {
    try {
        const playerLocation = bart.getBoundingClientRect();
        const ballLocation = ball.getBoundingClientRect();

        if (
            playerLocation.right > ballLocation.left &&
            playerLocation.left < ballLocation.right &&
            playerLocation.bottom > ballLocation.top &&
            playerLocation.top < ballLocation.bottom
        ) {
            return true;
        } else {
            return false
        }
    } catch (error) {
        console.error(error);
    }
}

function collisions() {
    try {
        const playerLocation = bart.getBoundingClientRect();
        const ballLocation = smallBall1.getBoundingClientRect();

        if (
            playerLocation.right > ballLocation.left &&
            playerLocation.left < ballLocation.right &&
            playerLocation.bottom > ballLocation.top &&
            playerLocation.top < ballLocation.bottom
        ) {

            return true;
        } else {
            return false
        }
    } catch (error) {
        console.error(error);
    }
}

function GameOver() {
    try {
        life.classList.add("none")
        bart.classList.add("none")
        shoot.classList.add("none")
        ball.classList.add("none")
        smallBall1.classList.add("none")
    } catch (error) {
        console.error(error);
    }
}

function changeBallPosition() {
    try {

        const containerRect = container.getBoundingClientRect();
        const ballRect = ball.getBoundingClientRect();

        ballX = Math.random() * (containerRect.width - ballRect.width);
        ballY = Math.random() * (containerRect.height - ballRect.height);

        ball.style.left = ballX + 'px';
        ball.style.top = ballY + 'px';

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

        const iscollision = collision()
        const collisionsmallBal = collisions();
        if (iscollision || collisionsmallBal) {
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
                    updateBallsPosition()
                }, 1000);
            } else if (collisionCount === 3) {
                gameEnded = true;
                GameOver()
                const gameOver = document.querySelector('#container__gameOver') as HTMLElement;
                const html = ` <h1>game over</h1>   
                <a href="levels.html">start over</a>`
                gameOver.innerHTML = html;
                // <i class="fa-solid fa-rotate-left" > </i>

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


setInterval(ballAndShootCollision, 10);
let ballShrunk = false;
let ballHidden = false;

function collision2() {
    try {
        const ropeLocation = shoot.getBoundingClientRect();
        const ballLocation = ball.getBoundingClientRect();

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
    } catch (error) {
        console.error(error);
    }
}

function ballAndShootCollision() {
    try {
        const iscollision = collision2()

        if (iscollision) {

            if (!ballShrunk) {
                smallBall1.style.display = 'block';
                ball.style.width = '50px';
                ball.style.height = '50px';
                changeBallPosition()
                ballShrunk = true;
                updateBallsPosition()
            } else {
                ball.style.display = 'none';
                ballHidden = true;
            }
        }
    } catch (error) {
        console.error(error)
    }
}

interface Ball {
    element: HTMLElement | null;
    smallBallX: number;
    smallBallY: number;
    smallBallSpeedX: number;
    smallBallSpeedY: number;
}
const balls = [
    { element: document.getElementById('ball'), smallBallX: 0, smallBallY: 0, smallBallSpeedX: 3.5, smallBallSpeedY: 3.5 },
    { element: document.getElementById('container__smallBall1'), smallBallX: 0, smallBallY: 0, smallBallSpeedX: 3.5, smallBallSpeedY: 3.5 }
];

function updateBallsPosition() {
    try {
        if (canMoveBall) {

            const containerRect = container.getBoundingClientRect();
            balls.forEach(ball => {
                if (ball.element) {
                    const ballRect = ball.element.getBoundingClientRect(); // גודל ומיקום הכדור

                    ball.smallBallX += ball.smallBallSpeedX;
                    ball.smallBallY += ball.smallBallSpeedY;

                    // בדיקת התנגשויות עם גבולות המיכל
                    if (ball.smallBallX + ballRect.width > containerRect.width || ball.smallBallX < 0) {
                        ball.smallBallSpeedX = -ball.smallBallSpeedX; // שינוי כיוון התנועה בציר ה-x
                    }
                    if (ball.smallBallY + ballRect.height > containerRect.height || ball.smallBallY < 0) {
                        ball.smallBallSpeedY = -ball.smallBallSpeedY; // שינוי כיוון התנועה בציר ה-y
                    }

                    // יישום המיקום החדש
                    ball.element.style.left = `${ball.smallBallX}px`;
                    ball.element.style.top = `${ball.smallBallY}px`;
                }
            });

            // קריאה חוזרת לפונקציה ליצירת אנימציה חלקה
            requestAnimationFrame(updateBallsPosition);
        }

    } catch (error) {
        console.error(error)
    }
}


function collision3() {
    try {
        const ropeLocation = shoot.getBoundingClientRect();
        const smallBall1Location = smallBall1.getBoundingClientRect();

        if (
            ropeLocation.right > smallBall1Location.left &&
            ropeLocation.left < smallBall1Location.right &&
            ropeLocation.bottom > smallBall1Location.top &&
            ropeLocation.top < smallBall1Location.bottom
        ) {
            return true;
        } else {
            return false
        }
    } catch (error) {
        console.error(error);
    }
}


setInterval(shootBalls, 10);
let ball1Exist = true;
let ball2Exist = true;

function shootBalls() {
    try {
        const iscollision3 = collision3()
        if (iscollision3) {
            smallBall1.style.display = 'none';
            ball1Exist = false;
        }

        if (ballHidden && !ball1Exist) {

            const pointsStorage = localStorage.getItem('points');
            let points = pointsStorage ? JSON.parse(pointsStorage) : [];
            if (points.length > 0) {
                points[0].level = 'level2';
            }
            localStorage.setItem('points', JSON.stringify(points));

            GameOver()
            const gameOver = document.querySelector('#container__gameOver') as HTMLElement;
            const html = `<h1>good job</h1>  <a href="levels.html">next level</a>`

            gameOver.innerHTML = html;
        }

    } catch (error) {
        console.error(error);
    }
}


