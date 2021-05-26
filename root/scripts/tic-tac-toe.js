function playerFactory(name, mark) {
  let _name = name;
  let _mark = mark;
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
    if (playerOne.getTurn() === false && playerTwo.getTurn() === false) {
      playerOne.setTurn(true);
      return playerOne;
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
  const checkForWin = () => {
    if (gameBoard.getCoordinates()["a1"] === gameBoard.getCoordinates()["a2"] && gameBoard.getCoordinates()["a1"] === gameBoard.getCoordinates()["a3"] && gameBoard.getCoordinates()["a1"] !== "") {
      if (playerOne.getTurn() === true) {
        alert(`${playerOne.getName()} has won!`)
        gameBoard.resetBoard();
      } else {
        alert(`${playerTwo.getName()} has won!`)
        gameBoard.resetBoard();
      }
    }
  }
  return {switchTurns, checkForWin}
})();

const gameBoard = (() => {
  let _coordinates = {a1:"",a2:"",a3:"",b1:"",b2:"",b3:"",c1:"",c2:"",c3:""};
  
  const a1 = document.querySelector("#a1");
  a1.addEventListener('click', () => markCoordinate(game.switchTurns(), "a1", a1));
  const a2 = document.querySelector("#a2");
  a2.addEventListener('click', () => markCoordinate(game.switchTurns(), "a2", a2));
  const a3 = document.querySelector("#a3");
  a3.addEventListener('click', () => markCoordinate(game.switchTurns(), "a3", a3));
  const b1 = document.querySelector("#b1");
  b1.addEventListener('click', () => markCoordinate(game.switchTurns(), "b1", b1));
  const b2 = document.querySelector("#b2");
  b2.addEventListener('click', () => markCoordinate(game.switchTurns(), "b2", b2));
  const b3 = document.querySelector("#b3");
  b3.addEventListener('click', () => markCoordinate(game.switchTurns(), "b3", b3));
  const c1 = document.querySelector("#c1");
  c1.addEventListener('click', () => markCoordinate(game.switchTurns(), "c1", c1));
  const c2 = document.querySelector("#c2");
  c2.addEventListener('click', () => markCoordinate(game.switchTurns(), "c2", c2));
  const c3 = document.querySelector("#c3");
  c3.addEventListener('click', () => markCoordinate(game.switchTurns(), "c3", c3));

  const _selectors = [a1, a2, a3, b1, b2, b3, c1, c2, c3];

  const markCoordinate = (player, coordinate, selector) => {
    if (_coordinates[coordinate] === "") {
      _coordinates[coordinate] = player.getMark();
      const mark = document.createElement('p');
      mark.textContent = _coordinates[coordinate];
      selector.appendChild(mark);
      game.checkForWin();
    }
  }

  const resetBoard = () => {
    _coordinates = {a1:"",a2:"",a3:"",b1:"",b2:"",b3:"",c1:"",c2:"",c3:""};
    for (let i = 0; i < _selectors.length; i++) {
      _selectors[i].textContent = "";
    }
  }
  return {
    getCoordinates() {
      return _coordinates;
    },
    resetBoard
  };
})();







