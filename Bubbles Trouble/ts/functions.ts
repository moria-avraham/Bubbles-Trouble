export function getPlayerFromLocalStorage() {
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
export function renderPlayers(selectedPlayer: any) {
    try {
        const rootPlayer = document.querySelector('#container__player') as HTMLElement;
        const html = `<img class="selectedPlayer bart" src="${selectedPlayer.playerImg}"> `;
        rootPlayer.innerHTML = html;
        const life = document.querySelector('#container__life') as HTMLElement;
        const img = `<img id="image1" class="Photos" src="${selectedPlayer.playerImg}"> <img id="image2" class="Photos" src="${selectedPlayer.playerImg}"> <img id="image3" class="Photos" src="${selectedPlayer.playerImg}">`
        life.innerHTML = img;
    } catch (error) {
        console.error(error);
    }
}
const ball = document.querySelector('#container__ball') as HTMLElement;
const life = document.querySelector('#container__life') as HTMLElement;
const container = document.querySelector('#container') as HTMLElement;
let ballX = 0;
let ballY = 0;
let ballSpeedX = 5;
let ballSpeedY = 5;
let canMoveBall = true;


export function moveBall() {
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
export function m() {
    console.log("first");
}
