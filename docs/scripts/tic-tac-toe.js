

const playerOne = playerFactory("Player one", "X");
const playerTwo = aiFactory("Player two", "O");

const game = (() => {
  let _firstTurn = true;
  const getFirstTurn = () => {
    return _firstTurn;
  }
  const setFirstTurn = (bool) => {
    _firstTurn = bool;
  }
  const switchTurns = () => {
    const players = [playerOne, playerTwo];
    if (playerOne.getTurn() === false && playerTwo.getTurn() === false) {
      let randomPlayer = players[Math.floor(Math.random() * players.length)];
      randomPlayer.setTurn(true); 
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
  return {
    switchTurns,
    checkForWin,
    getTurn,
    getFirstTurn,
    setFirstTurn,
  }
})();

const gameBoard = (() => {
  let _coordinates = {a1:"", a2:"", a3:"", b1:"", b2:"", b3:"", c1:"", c2:"", c3:""};
  game.switchTurns();
  aiMarkCoordinate(playerTwo);
  
  const a1 = document.querySelector("#a1");
  a1.addEventListener('click', () => {
    markCoordinate(game.getTurn(), "a1", a1);
    aiMarkCoordinate(playerTwo);
  });
  const a2 = document.querySelector("#a2");
  a2.addEventListener('click', () => {
    markCoordinate(game.getTurn(), "a2", a2);
    aiMarkCoordinate(playerTwo);
  });
  const a3 = document.querySelector("#a3");
  a3.addEventListener('click', () => {
    markCoordinate(game.getTurn(), "a3", a3);
    aiMarkCoordinate(playerTwo);
  });
  const b1 = document.querySelector("#b1");
  b1.addEventListener('click', () => {
    markCoordinate(game.getTurn(), "b1", b1);
    aiMarkCoordinate(playerTwo);
  });
  const b2 = document.querySelector("#b2");
  b2.addEventListener('click', () => {
    markCoordinate(game.getTurn(), "b2", b2);
    aiMarkCoordinate(playerTwo);
  });
  const b3 = document.querySelector("#b3");
  b3.addEventListener('click', () => {
    markCoordinate(game.getTurn(), "b3", b3);
    aiMarkCoordinate(playerTwo);
  });
  const c1 = document.querySelector("#c1");
  c1.addEventListener('click', () => {
    markCoordinate(game.getTurn(), "c1", c1);
    aiMarkCoordinate(playerTwo);
  });
  const c2 = document.querySelector("#c2");
  c2.addEventListener('click', () => {
    markCoordinate(game.getTurn(), "c2", c2);
    aiMarkCoordinate(playerTwo);
  });
  const c3 = document.querySelector("#c3");
  c3.addEventListener('click', () => {
    markCoordinate(game.getTurn(), "c3", c3);
    aiMarkCoordinate(playerTwo);
  });

  const _selectors = [a1, a2, a3, b1, b2, b3, c1, c2, c3];

  const markCoordinate = (player, coordinate, selector) => {
    if (_coordinates[coordinate] === "") {
      game.setFirstTurn(false);
      _coordinates[coordinate] = player.getMark();
      const mark = document.createElement('p');
      mark.textContent = _coordinates[coordinate];
      selector.appendChild(mark);
      game.checkForWin();
      game.switchTurns();
      messageBoard.logTurn();
    }
  }

  function aiMarkCoordinate(player) {
      if (game.getTurn().getIsHuman() === false) {
        const emptyCoords = player.getEmptyCoords(_coordinates);
        const randomCoord = player.selectRandomCoord(emptyCoords);
        _coordinates[randomCoord] = player.getMark();
        const mark = document.createElement("p");
        mark.textContent = _coordinates[randomCoord];
        this[randomCoord].appendChild(mark);
        if (game.getFirstTurn() === false) {
          game.checkForWin();
          messageBoard.logTurn();
        }
        game.setFirstTurn(false);
        game.switchTurns();
    } else {
      return;
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
    resetBoard,
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
      messageBoard.textContent = (`${playerOne.getName()} has won!`);
      if (confirm("Player one has won! Play again?")) {
        gameBoard.resetBoard();
      }
    } else {
      if (confirm("Player two has won! Play again?")) {
        gameBoard.resetBoard();
      }
    }
  };
  const logTie = () => {
    alert("Draw");
    gameBoard.resetBoard();
  };
  const logTurn = () => {
    messagePanel.textContent = `${game.getTurn().getName()}'s turn [${game.getTurn().getMark()}]`;
  }
  logTurn();
  return {logWin, logTie, logTurn}
})();

function playerFactory(name, mark) {
  const _name = name;
  const _mark = mark;
  let _isTurn = false;
  const _isHuman = true;
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
    },
    getIsHuman() {
      return _isHuman;
    }
  }
}

function aiFactory(name, mark) {
  const _name = name;
  const _mark = mark;
  let _isTurn = false;
  const _isHuman = false;

  function getEmptyCoords(gameBoardCoords) {
    const emptyCoords = [];
    for (const prop in gameBoardCoords) {
      if (gameBoardCoords[prop] === "") {
        emptyCoords.push(prop);
        console.log(emptyCoords);
      }
    }
    return emptyCoords;
  };
  
  function selectRandomCoord(emptyCoords) {
    let randomCoord = emptyCoords[Math.floor(Math.random() * emptyCoords.length)];
    return randomCoord;
  };

  function markCoord(randomCoord, selector, coordinates) {
    const mark = document.createElement('p');
    mark.textContent = coordinates[randomCoord];
    selector.appendChild(mark);
    game.checkForWin();
    game.switchTurns();
    messageBoard.logTurn();
  }

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
    },
    getIsHuman() {
      return _isHuman;
    },
    getEmptyCoords,
    selectRandomCoord,
    markCoord,
  }
}







