"use strict";
const level2 = document.querySelector('.level2');
const level3 = document.querySelector('.level3');
const pointsStorage = localStorage.getItem('points');
let thePoints = pointsStorage ? JSON.parse(pointsStorage) : [];
function level2ToButton() {
    level2.classList.remove("notAvailable");
    level2.addEventListener('click', function () {
        try {
            let points = JSON.parse(localStorage.getItem('points') || '[]');
            if (points.length > 0) {
                points[0].currentLevel = 'level2';
                localStorage.setItem('points', JSON.stringify(points));
            }
            window.location.href = 'level2.html';
        }
        catch (error) {
            console.error("Error updating points for level 2:", error);
        }
    });
}
function level3ToButton() {
    level3.classList.remove("notAvailable");
    level3.addEventListener('click', function () {
        try {
            let points = JSON.parse(localStorage.getItem('points') || '[]');
            if (points.length > 0) {
                points[0].currentLevel = 'level3';
                localStorage.setItem('points', JSON.stringify(points));
            }
            window.location.href = 'level3.html';
        }
        catch (error) {
            console.error("Error updating points for level 3:", error);
        }
    });
}
function whatLevel() {
    try {
        if (thePoints.length > 0) {
            if (thePoints[0].level === 'level2') {
                level2ToButton();
            }
            else if (thePoints[0].level === 'level3') {
                level2ToButton();
                level3ToButton();
            }
        }
    }
    catch (error) {
        console.error("Error determining current level:", error);
    }
}
whatLevel();
