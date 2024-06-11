"use strict";
class Player {
    // id: string
    constructor(playerImg, id) {
        this.playerImg = playerImg;
        // this.id = `id-${new Date().getTime() - Math.random()}`
    }
}
class Point {
    constructor(name, level, currentLevel, id) {
        this.name = name;
        this.level = level;
        this.currentLevel = currentLevel;
        this.id = `id-${new Date().getTime() - Math.random()}`;
    }
}
const root = document.querySelector(`#root`);
const rootPlayer = document.querySelector(`#rootPlayer`);
const points = [];
logIn();
function logIn() {
    try {
        const html = ` <div class="log"> <form onsubmit="handleName(event)"><label for="worker-name">enter your Name:</label> <br>
        <input required type="text" name="name" value=""> <br> <br> <button type="submit">ok</button> </form> </div>`;
        if (!root)
            throw new Error("no root element");
        root.innerHTML = html;
    }
    catch (error) {
        console.error(error);
    }
}
function handleName(ev) {
    try {
        ev.preventDefault();
        const name = ev.target.elements.name.value;
        const newName = new Point(name, "level1", "level1");
        points.push(newName);
        localStorage.setItem("points", JSON.stringify(points));
        ev.target.reset();
        const log = document.querySelector(`.log`);
        log.classList.add("none");
        const html = ` <h2>Hi ${name},choose your player</h2>`;
        root.innerHTML = html;
    }
    catch (error) {
        console.error(error);
    }
}
const players = [];
function addHomer() {
    try {
        const selectedPlayer = new Player("../img/homer.png");
        players.push(selectedPlayer);
        savePlayerInLocalStorage(players);
        window.location.href = "view/levels.html";
    }
    catch (error) {
        console.error(error);
    }
}
function addBart() {
    try {
        const selectedPlayer = new Player("../img/bart.png");
        players.push(selectedPlayer);
        savePlayerInLocalStorage(players);
        window.location.href = "view/levels.html";
    }
    catch (error) {
        console.error(error);
    }
}
function addMaggie() {
    try {
        const selectedPlayer = new Player("../img/Maggie.png");
        players.push(selectedPlayer);
        savePlayerInLocalStorage(players);
        window.location.href = "view/levels.html";
    }
    catch (error) {
        console.error(error);
    }
}
function savePlayerInLocalStorage(players) {
    try {
        localStorage.setItem('players', JSON.stringify(players));
    }
    catch (error) {
        console.error(error);
    }
}
