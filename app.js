let isEmpty = false;

const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const boardReset = () => {
    let cells = document.querySelectorAll(".cell");
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => {
      cell.textContent = "";
    });

    let score = 0;
  };

  return { boardReset };
})();

const makeGameboard = (() => {})();

const Player = (name, side) => {
  return { name, side };
};

const newGame = (() => {
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  const closeModalBtn = document.querySelector(".btn-close");
  const startBtn = document.querySelector(".startGame");
  const modalSubmit = document.querySelector(".btn-submit");
  let radio = document.querySelectorAll("input[type=radio]");
  let input = document.querySelector("input[type=text]");
  let cells = document.querySelectorAll(".cell");

  const openModal = () => {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };

  startBtn.addEventListener("click", openModal);

  const closeModal = () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  };

  closeModalBtn.addEventListener("click", closeModal);
  modalSubmit.addEventListener("click", () => {
    let input = document.querySelector("#name");
    let xSide = document.querySelector("#x-side");
    let oSide = document.querySelector("#o-side");

    let playerName = input.value;
    let playerSide = xSide.checked ? xSide.value : oSide.value;

    currentPlayer = Player(playerName, playerSide);

    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        cell.textContent = currentPlayer.side;
      });
    });

    closeModal();
    Gameboard.boardReset();
  });
})();
