var level2 = document.querySelector('.level2');
var level3 = document.querySelector('.level3');
var pointsStorage = localStorage.getItem('points');
var points = pointsStorage ? JSON.parse(pointsStorage) : [];
function level2ToButton() {
    level2.classList.remove("notAvailable");
    level2.addEventListener('click', function () {
        window.location.href = 'next-level.html';
    });
}
function level3ToButton() {
    level3.classList.remove("notAvailable");
    level3.addEventListener('click', function () {
        window.location.href = 'next-level.html';
    });
}
whatLevel();
function whatLevel() {
    try {
        if (points.length > 0) {
            if (points[0].level === 'level2') {
                level2ToButton();
            }
            else if (points[0].level === 'level3') {
                level2ToButton();
                level3ToButton();
            }
        }
    }
    catch (error) {
        console.error(error);
    }
}
