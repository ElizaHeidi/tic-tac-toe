let hasPlayed = false;

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

  const getBoard = () => {
    return board;
  };

  const getMark = (index) => {
    return board[index];
  };

  const setMark = (index, side) => {
    if (index > board.length) return;
    board[index] = side;
  };

  return { board, boardReset, getBoard, getMark, setMark };
})();

const Player = (name, side) => {
  return { name, side };
};

const currentPlayer = {
  player: null,
  next() {
    this.player = this.player === playerOne ? playerTwo : playerOne;
  },
};

let playerOne, playerTwo;

const switchPlayers = () => {
  if (hasPlayed) {
    currentPlayer.next();
  }
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

    playerOne = Player(playerName, playerSide);
    playerTwo = Player(playerName, playerSide === "X" ? "O" : "X");

    // TODO: Display currentPlayer.name and currentPlayer.side above 'New Game'

    currentPlayer.player = playerOne;

    closeModal();
    Gameboard.boardReset();
  });

  cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      if (cell.textContent != "") {
        return;
      }
      const cellIndex = parseInt(e.target.dataset.index);
      console.log(cellIndex);
      Gameboard.setMark(cellIndex, currentPlayer.player.side);
      console.log(Gameboard.getBoard());
      cell.textContent = currentPlayer.player.side;
      hasPlayed = true;

      const playedPlayer = currentPlayer.player;
      const winner = checkWinner(playedPlayer);
      if (winner) {
        console.log(`${winner.name} (${winner.side}) is the winner!`);
      } else {
        switchPlayers();
      }
    });
  });
  return {};
})();

const checkWinner = (playedPlayer) => {
  const winningAxes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const mark = playedPlayer.side;

  for (let i = 0; i < winningAxes.length; i++) {
    const [a, b, c] = winningAxes[i];
    if (
      Gameboard.getBoard()[a] === mark &&
      Gameboard.getBoard()[b] === mark &&
      Gameboard.getBoard()[c] === mark
    ) {
      console.log("winner!");
      return playedPlayer;
    }
  }

  return null;
};
