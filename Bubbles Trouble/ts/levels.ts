const level2 = document.querySelector('.level2') as HTMLElement;
const level3 = document.querySelector('.level3') as HTMLElement;
const pointsStorage = localStorage.getItem('points');
let thePoints = pointsStorage ? JSON.parse(pointsStorage) : [];

function level2ToButton() {
    level2.classList.remove("notAvailable")
    level2.addEventListener('click', function () {
        window.location.href = 'level2.html';
    });
}
function level3ToButton() {
    level3.classList.remove("notAvailable")
    level3.addEventListener('click', function () {
        window.location.href = 'next-level.html';
    });
}

whatLevel()
function whatLevel() {
    try {
        if (thePoints.length > 0) {
            if (thePoints[0].level === 'level2') {
                level2ToButton()
            } else if (thePoints[0].level === 'level3') {
                level2ToButton()
                level3ToButton()
            }
        }
    } catch (error) {
        console.error(error);
    }
}