const playerFactory = (name, mark) => {
  return {name, mark}
}

const gameBoard = (() => {
  let coordinates = {a1:"",a2:"",a3:"",b1:"",b2:"",b3:"",c1:"",c2:"",c3:""};
  const a1 = document.querySelector("#a1");
  a1.addEventListener('click', () => markCoordinate(playerOne, "a1", a1));
  const a2 = document.querySelector("#a2");
  a2.addEventListener('click', () => markCoordinate(playerOne, "a2", a2));
  const a3 = document.querySelector("#a3");
  a3.addEventListener('click', () => markCoordinate(playerOne, "a3", a3));
  const b1 = document.querySelector("#b1");
  b1.addEventListener('click', () => markCoordinate(playerOne, "b1", b1));
  const b2 = document.querySelector("#b2");
  b2.addEventListener('click', () => markCoordinate(playerOne, "b2", b2));
  const b3 = document.querySelector("#b3");
  b3.addEventListener('click', () => markCoordinate(playerOne, "b3", b3));
  const c1 = document.querySelector("#c1");
  c1.addEventListener('click', () => markCoordinate(playerOne, "c1", c1));
  const c2 = document.querySelector("#c2");
  c2.addEventListener('click', () => markCoordinate(playerOne, "c2", c2));
  const c3 = document.querySelector("#c3");
  c3.addEventListener('click', () => markCoordinate(playerOne, "c3", c3));

  function markCoordinate(player, coordinate, selector) {
    coordinates[coordinate] = player.mark;
    const mark = document.createElement('p');
    mark.textContent = coordinates[coordinate];
    selector.appendChild(mark);
  }
  return {coordinates, markCoordinate};
})();

const displayController = ((gameBoard) => {
  const populateBoard = () => {
    for (const property in gameBoard.coordinates) {
      console.log(`${property}: ${gameBoard.coordinates[property]}`);
    }
  };
  return {populateBoard}
})(gameBoard);

const gameLoop = (() => {
  displayController.populateBoard(gameBoard);
  alternatePlayers = function() {

  }
})();

const playerOne = playerFactory("Player one", "X");
const playerTwo = playerFactory("Player two", "O")