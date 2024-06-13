
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
function renderPlayers(selectedPlayer: any) {
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
const player = document.querySelector(`.selectedPlayer`) as HTMLElement;
const shoot = document.querySelector(`#container__shoot`) as HTMLElement;
const container = document.querySelector('#container') as HTMLElement;
document.addEventListener('keydown', (event: KeyboardEvent) => {
    event.stopPropagation();
    const playerRect = player.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    switch (event.key) {
        case 'ArrowLeft':
            if (playerRect.left > containerRect.left) {
                player.style.left = `${player.offsetLeft - 25}px`;
            }
            break;
        case 'ArrowRight':
            if (playerRect.right < containerRect.right) {
                player.style.left = `${player.offsetLeft + 25}px`;
            }
            break;
    }
});

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

function handleKeyDown(event: KeyboardEvent) {
    try {
        if (event.key === ' ') {
            shoot.classList.add('show');
        }
    } catch (error) {
        console.error(error);
    }
}

function handleKeyUp(event: KeyboardEvent) {
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
        const sourceRect = player.getBoundingClientRect();
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