let music = new Audio("music.mp3");
let gameover = new Audio("gameover.mp3");
let turn = new Audio("ting.mp3");
let win = new Audio(
  "./brass-fanfare-with-timpani-and-winchimes-reverberated-146260.mp3"
);

// Set loop for continuous background music
music.loop = true;

// Attempt to play music on page load
window.addEventListener("DOMContentLoaded", () => {
  music.play().catch(() => {
    console.log("Autoplay blocked. Waiting for user interaction.");
  });
});

// Play music on first user interaction (click/touch)
document.addEventListener(
  "click",
  () => {
    music.play();
  },
  { once: true }
); // Ensures this runs only once

let isgame = false;
let turnn = "X";

const changeTurn = () => {
  turnn = turnn === "X" ? "0" : "X";
  return turnn;
};

const checkwin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText = `${
        boxtext[e[0]].innerText
      } Won! 🎉`;
      isgame = true;
      document.querySelector(".imgbox img").style.width = "156px";
      music.pause();
      win.play();
    }
  });
};

// Game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "" && !isgame) {
      boxtext.innerText = turnn;
      turn.play();
      checkwin();
      if (!isgame) {
        turnn = changeTurn();
        document.querySelector(".info").innerText = "Turn for " + turnn;
      }
    }
  });
});

// Reset button
document.getElementById("reset").addEventListener("click", () => {
  document.querySelectorAll(".boxtext").forEach((e) => (e.innerText = ""));
  isgame = false;
  turnn = "X";
  document.querySelector(".info").innerText = "Turn for " + turnn;
  document.querySelector(".imgbox img").style.width = "0px";
  win.pause();
  win.currentTime = 0;
  music.play();
});
