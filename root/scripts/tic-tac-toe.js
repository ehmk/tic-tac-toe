function playerFactory(name, mark) {
  const _name = name;
  const _mark = mark;
  let _isTurn = false;
  return {
    getName() {
      return _name;
    },
    getMark() {
      return _mark;
    },
    getTurn() {
      return _isTurn;
    },
    setTurn(bool) {
      _isTurn = bool;
    }
  }
}

const playerOne = playerFactory("Player one", "X");
const playerTwo = playerFactory("Player two", "O");

const game = (() => {
  let firstTurn = true;
  const switchTurns = () => {
    const players = [playerOne, playerTwo];
    if (playerOne.getTurn() === false && playerTwo.getTurn() === false) {
      let randomPlayer = players[Math.floor(Math.random() * players.length)];
      randomPlayer.setTurn(true); // Gives a random player first turn
      return randomPlayer;
    } else if (playerOne.getTurn() === true) {
      playerOne.setTurn(false);
      playerTwo.setTurn(true);
      return playerTwo;
    } else if (playerTwo.getTurn() === true) {
      playerTwo.setTurn(false);
      playerOne.setTurn(true);
      return playerOne;
    }
  };
  const getTurn = () => {
    if (playerOne.getTurn() === true) {
      return playerOne;
    } else if (playerTwo.getTurn() === true) {
      return playerTwo;
    }
  }
  const checkForWin = () => {
    if (gameBoard.getCoordinates()["a1"] === gameBoard.getCoordinates()["a2"] && gameBoard.getCoordinates()["a1"] === gameBoard.getCoordinates()["a3"] && gameBoard.getCoordinates()["a1"] !== "") {
      messageBoard.logWin();
    } else if (gameBoard.getCoordinates()["b1"] === gameBoard.getCoordinates()["b2"] && gameBoard.getCoordinates()["b1"] === gameBoard.getCoordinates()["b3"] && gameBoard.getCoordinates()["b1"] !== "") {
      messageBoard.logWin();
    } else if (gameBoard.getCoordinates()["c1"] === gameBoard.getCoordinates()["c2"] && gameBoard.getCoordinates()["c1"] === gameBoard.getCoordinates()["c3"] && gameBoard.getCoordinates()["c1"] !== "") {
      messageBoard.logWin();
    } else if (gameBoard.getCoordinates()["a1"] === gameBoard.getCoordinates()["b1"] && gameBoard.getCoordinates()["a1"] === gameBoard.getCoordinates()["c1"] && gameBoard.getCoordinates()["a1"] !== "") {
      messageBoard.logWin();
    } else if (gameBoard.getCoordinates()["a2"] === gameBoard.getCoordinates()["b2"] && gameBoard.getCoordinates()["a2"] === gameBoard.getCoordinates()["c2"] && gameBoard.getCoordinates()["a2"] !== "") {
      messageBoard.logWin();
    } else if (gameBoard.getCoordinates()["a3"] === gameBoard.getCoordinates()["b3"] && gameBoard.getCoordinates()["a3"] === gameBoard.getCoordinates()["c3"] && gameBoard.getCoordinates()["a3"] !== "") {
      messageBoard.logWin();
    } else if (gameBoard.getCoordinates()["a1"] === gameBoard.getCoordinates()["b2"] && gameBoard.getCoordinates()["a1"] === gameBoard.getCoordinates()["c3"] && gameBoard.getCoordinates()["a1"] !== "") {
      messageBoard.logWin();
    } else if (gameBoard.getCoordinates()["a3"] === gameBoard.getCoordinates()["b2"] && gameBoard.getCoordinates()["a3"] === gameBoard.getCoordinates()["c1"] && gameBoard.getCoordinates()["a3"] !== "") {
      messageBoard.logWin();
    } else if (gameBoard.getCoordinates()["a1"] !== "" && gameBoard.getCoordinates()["a2"] !== "" && gameBoard.getCoordinates()["a3"] !== "" && gameBoard.getCoordinates()["b1"] !== "" && gameBoard.getCoordinates()["b2"] !== "" && gameBoard.getCoordinates()["b3"] !== "" && gameBoard.getCoordinates()["c1"] !== "" && gameBoard.getCoordinates()["c2"] !== "" && gameBoard.getCoordinates()["c3"] !== "") {
      messageBoard.logTie();
    }
  }
  return {switchTurns, checkForWin, getTurn}
})();

const gameBoard = (() => {
  let _coordinates = {a1:"", a2:"", a3:"", b1:"", b2:"", b3:"", c1:"", c2:"", c3:""};
  game.switchTurns();
  
  const a1 = document.querySelector("#a1");
  a1.addEventListener('click', () => markCoordinate(game.getTurn(), "a1", a1));
  const a2 = document.querySelector("#a2");
  a2.addEventListener('click', () => markCoordinate(game.getTurn(), "a2", a2));
  const a3 = document.querySelector("#a3");
  a3.addEventListener('click', () => markCoordinate(game.getTurn(), "a3", a3));
  const b1 = document.querySelector("#b1");
  b1.addEventListener('click', () => markCoordinate(game.getTurn(), "b1", b1));
  const b2 = document.querySelector("#b2");
  b2.addEventListener('click', () => markCoordinate(game.getTurn(), "b2", b2));
  const b3 = document.querySelector("#b3");
  b3.addEventListener('click', () => markCoordinate(game.getTurn(), "b3", b3));
  const c1 = document.querySelector("#c1");
  c1.addEventListener('click', () => markCoordinate(game.getTurn(), "c1", c1));
  const c2 = document.querySelector("#c2");
  c2.addEventListener('click', () => markCoordinate(game.getTurn(), "c2", c2));
  const c3 = document.querySelector("#c3");
  c3.addEventListener('click', () => markCoordinate(game.getTurn(), "c3", c3));

  const _selectors = [a1, a2, a3, b1, b2, b3, c1, c2, c3];

  const markCoordinate = (player, coordinate, selector) => {
    if (_coordinates[coordinate] === "") {
      _coordinates[coordinate] = player.getMark();
      const mark = document.createElement('p');
      mark.textContent = _coordinates[coordinate];
      selector.appendChild(mark);
      game.checkForWin();
      game.switchTurns();
      messageBoard.logTurn();
    }
  }

  const resetBoard = () => {
    _coordinates = {a1:"",a2:"",a3:"",b1:"",b2:"",b3:"",c1:"",c2:"",c3:""};
    for (let i = 0; i < _selectors.length; i++) {
      _selectors[i].textContent = "";
    }
    playerOne.setTurn(false);
    playerTwo.setTurn(false);
    game.switchTurns();
    messageBoard.logTurn();
  }
  return {
    getCoordinates() {
      return _coordinates;
    },
    resetBoard
  };
})();

const messageBoard = (() => {
  const messagePanel = document.querySelector("#message-panel");
  const resetButton = document.querySelector("#reset-game");
  resetButton.addEventListener("click", () => {
    messagePanel.textContent = (``)
    gameBoard.resetBoard()
  });
  const logWin = () => {
    if (playerOne.getTurn() === true) {
      alert(`${playerOne.getName()} has won!`);
      gameBoard.resetBoard();
    } else {
      alert(`${playerTwo.getName()} has won!`);
      gameBoard.resetBoard();
    }
  };
  const logTie = () => {
    messageBoard.textContent = ("Draw");
    gameBoard.resetBoard();
  };
  const logTurn = () => {
    messagePanel.textContent = `${game.getTurn().getName()}'s turn [${game.getTurn().getMark()}]`;
  }
  logTurn();
  return {logWin, logTie, logTurn}
})();







