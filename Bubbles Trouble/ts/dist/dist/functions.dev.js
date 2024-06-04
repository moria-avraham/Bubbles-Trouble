"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moveBall = moveBall;
exports.m = m;
exports.__esModule = true;
exports.m = exports.moveBall = exports.renderPlayers = exports.getPlayerFromLocalStorage = void 0;

function getPlayerFromLocalStorage() {
  try {
    var playersStorage = localStorage.getItem('players');
    if (!playersStorage) return [];
    var playersArray = JSON.parse(playersStorage);
    renderPlayers(playersArray[0]);
  } catch (error) {
    console.error(error);
    return [];
  }
}

exports.getPlayerFromLocalStorage = getPlayerFromLocalStorage;

function renderPlayers(selectedPlayer) {
  try {
    var rootPlayer = document.querySelector('#container__player');
    var html = "<img class=\"selectedPlayer bart\" src=\"" + selectedPlayer.playerImg + "\"> ";
    rootPlayer.innerHTML = html;
    var life_1 = document.querySelector('#container__life');
    var img = "<img id=\"image1\" class=\"Photos\" src=\"" + selectedPlayer.playerImg + "\"> <img id=\"image2\" class=\"Photos\" src=\"" + selectedPlayer.playerImg + "\"> <img id=\"image3\" class=\"Photos\" src=\"" + selectedPlayer.playerImg + "\">";
    life_1.innerHTML = img;
  } catch (error) {
    console.error(error);
  }
}

var ball = document.querySelector('#container__ball');
var life = document.querySelector('#container__life');
var container = document.querySelector('#container');
var ballX = 0;
var ballY = 0;
var ballSpeedX = 5;
var ballSpeedY = 5;
var canMoveBall = true;

function moveBall() {
  try {
    if (canMoveBall) {
      var containerRect = container.getBoundingClientRect();
      var ballRect = ball.getBoundingClientRect();
      ballX += ballSpeedX;
      ballY += ballSpeedY; // Check for collision with container walls

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

function m() {
  console.log("first");
}