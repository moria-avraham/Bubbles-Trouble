class Player {
    // id: string
    constructor(public playerImg: string, id?: string | null) {
        // this.id = `id-${new Date().getTime() - Math.random()}`
    }
}
class Point {
    id: string
    constructor(public name: string, id?: string | null) {
        this.id = `id-${new Date().getTime() - Math.random()}`
    }
}
const root = document.querySelector(`#root`) as HTMLElement;
const rootPlayer = document.querySelector(`#rootPlayer`) as HTMLElement;

const points: Point[] = []

logIn()
function logIn() {
    try {

        const html = ` <div class="log"> <form onsubmit="handleName(event)"><label for="worker-name">enter your Name:</label> <br>
        <input required type="text" name="name" value=""> <br> <br> <button type="submit">ok</button> </form> </div>`;
        if (!root) throw new Error("no root element");

        root.innerHTML = html;
    } catch (error) {
        console.error(error);
    }
}



function handleName(ev: any) {
    try {
        ev.preventDefault();
        const name = ev.target.elements.name.value;

        const newName = new Point(name);
        points.push(newName);


        localStorage.setItem("points", JSON.stringify(points))
        ev.target.reset();
        const log = document.querySelector(`.log`) as HTMLElement;
        log.classList.add("none")
        const html = ` <h2>Hi ${name},choose your player</h2>`
        root.innerHTML = html;

    } catch (error) {
        console.error(error)
    }
}
const players: Player[] = []


function addHomer() {
    try {
        const selectedPlayer = new Player("../img/homer.png");
        players.push(selectedPlayer);
        savePlayerInLocalStorage(players)
        window.location.href = "view/levels.html";
    } catch (error) {
        console.error(error)
    }
}

function addBart() {
    try {
        const selectedPlayer = new Player("../img/bart.png");
        players.push(selectedPlayer);
        savePlayerInLocalStorage(players)
        window.location.href = "view/levels.html";

    } catch (error) {
        console.error(error)
    }
}

function addMaggie() {
    try {

        const selectedPlayer = new Player("../img/Maggie.png");
        players.push(selectedPlayer);
        savePlayerInLocalStorage(players)
        window.location.href = "view/levels.html";

    } catch (error) {
        console.error(error)
    }
}
function savePlayerInLocalStorage(players: Player[]) {
    try {
        localStorage.setItem('players', JSON.stringify(players));

    } catch (error) {
        console.error(error)
    }
}
