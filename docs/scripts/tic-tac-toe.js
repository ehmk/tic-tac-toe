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
  let _lastTurn;
  const getLastTurn = () => {
    return _lastTurn;
  }
  const setLastTurn = (player) => {
    _lastTurn = player;
  }
  const chooseFirstPlayer = () => {
    const players = [playerOne, playerTwo];
    if (playerOne.getTurn() === false && playerTwo.getTurn() === false) {
      let randomPlayer = players[Math.floor(Math.random() * players.length)];
      randomPlayer.setTurn(true); 
      console.log(game.getTurn().getName());
      return randomPlayer;
    }
  }
  const switchTurns = () => {
    const players = [playerOne, playerTwo];
    if (playerOne.getTurn() === true) {
      playerOne.setTurn(false);
      playerTwo.setTurn(true);
      console.log(game.getTurn().getName());
      return playerTwo;
    } else if (playerTwo.getTurn() === true) {
      playerTwo.setTurn(false);
      playerOne.setTurn(true);
      console.log(game.getTurn().getName());
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
    getLastTurn,
    setLastTurn,
    chooseFirstPlayer,
    switchTurns,
    checkForWin,
    getTurn,
    getFirstTurn,
    setFirstTurn,
  }
})();

const gameBoard = (() => {
  let _coordinates = {a1:"", a2:"", a3:"", b1:"", b2:"", b3:"", c1:"", c2:"", c3:""};
  game.chooseFirstPlayer();

  const a1 = document.querySelector("#a1");
  a1.addEventListener('click', () => {
    markCoordinate(playerOne, "a1", a1);
  });
  const a2 = document.querySelector("#a2");
  a2.addEventListener('click', () => {
    markCoordinate(playerOne, "a2", a2);
  });
  const a3 = document.querySelector("#a3");
  a3.addEventListener('click', () => {
    markCoordinate(playerOne, "a3", a3);
  });
  const b1 = document.querySelector("#b1");
  b1.addEventListener('click', () => {
    markCoordinate(playerOne, "b1", b1);
  });
  const b2 = document.querySelector("#b2");
  b2.addEventListener('click', () => {
    markCoordinate(playerOne, "b2", b2);
  });
  const b3 = document.querySelector("#b3");
  b3.addEventListener('click', () => {
    markCoordinate(playerOne, "b3", b3);
  });
  const c1 = document.querySelector("#c1");
  c1.addEventListener('click', () => {
    markCoordinate(playerOne, "c1", c1);
  });
  const c2 = document.querySelector("#c2");
  c2.addEventListener('click', () => {
    markCoordinate(playerOne, "c2", c2);
  });
  const c3 = document.querySelector("#c3");
  c3.addEventListener('click', () => {
    markCoordinate(playerOne, "c3", c3);
  });

  const _selectors = [a1, a2, a3, b1, b2, b3, c1, c2, c3];

  const markCoordinate = (player, coordinate, selector) => {
    if (game.getTurn() === playerTwo) {
      game.switchTurns();
    }
    if (_coordinates[coordinate] === "") {
      _coordinates[coordinate] = player.getMark();
      const mark = document.createElement('p');
      mark.textContent = _coordinates[coordinate];
      selector.appendChild(mark);
      if (game.getFirstTurn() === false) {
        game.checkForWin();
      }
      game.setFirstTurn(false);
      game.switchTurns();
      game.setLastTurn(playerOne);
      if (game.getFirstTurn() === false && game.getTurn() === playerTwo) {
        aiMarkCoordinate(playerTwo);
        game.checkForWin();
      }
    }
  }

  const aiMarkCoordinate = (player) => {
    const emptyCoords = player.getEmptyCoords(_coordinates);
    const randomCoord = player.selectRandomCoord(emptyCoords);
    _coordinates[randomCoord] = player.getMark();
    const mark = document.createElement("p");
    mark.textContent = _coordinates[randomCoord];
    this[randomCoord].appendChild(mark);
    if (game.getFirstTurn() === false) {
      game.checkForWin();
    }
    game.switchTurns();
    game.setFirstTurn(false);
  }

  if (game.getTurn() === playerTwo) {
    aiMarkCoordinate(playerTwo);
  }

  const aiGoFirst = () => {
    const emptyCoords = playerTwo.getEmptyCoords(_coordinates);
    const randomCoord = playerTwo.selectRandomCoord(emptyCoords);
    _coordinates[randomCoord] = playerTwo.getMark();
    const mark = document.createElement("p");
    mark.textContent = _coordinates[randomCoord];
    this[randomCoord].appendChild(mark);
    game.setLastTurn(playerTwo);
  }

  const resetBoard = () => {
    _coordinates = {a1:"",a2:"",a3:"",b1:"",b2:"",b3:"",c1:"",c2:"",c3:""};
    game.setFirstTurn(true);
    for (let i = 0; i < _selectors.length; i++) {
      _selectors[i].textContent = "";
    }
    playerOne.setTurn(false);
    playerTwo.setTurn(false);
    game.chooseFirstPlayer();
    if (game.getTurn() === playerTwo) {
      aiGoFirst();
    }
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
    messagePanel.textContent = (`Welcome`);
    gameBoard.resetBoard();
  });
  const logWin = () => {
    if (playerOne.getTurn() === true) {
      messageBoard.textContent = (`${playerOne.getName()} has won!`);
      if (confirm("Player one has won! Play again?")) {
        gameBoard.resetBoard();
      }
    } else if (playerTwo.getTurn() === true) {
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
    _mark.textContent = coordinates[randomCoord];
    selector.appendChild(mark);
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







