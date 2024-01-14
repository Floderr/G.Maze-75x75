const mazeElement = document.getElementById("maze");
const mazeSize = 75;
let maze = [];

// Generate a maze using recursive backtracking
function generateMaze() {
  maze = Array.from({ length: mazeSize }, () => Array(mazeSize).fill(0));

  recursiveBacktracking(0, 0);

  // Mark the start and end points
  maze[0][0] = 2; // Starting point
  maze[mazeSize - 1][mazeSize - 1] = 3; // Ending point

  renderMaze();
}

// Recursive backtracking algorithm
function recursiveBacktracking(row, col) {
  const directions = [[0, -2], [2, 0], [0, 2], [-2, 0]];
  directions.sort(() => Math.random() - 0.5);

  for (const [dr, dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;

    if (newRow >= 0 && newRow < mazeSize && newCol >= 0 && newCol < mazeSize && maze[newRow][newCol] === 0) {
      maze[newRow][newCol] = 1; // Mark as path
      maze[row + dr / 2][col + dc / 2] = 1; // Mark as path
      recursiveBacktracking(newRow, newCol);
    }
  }
}

// Render the maze
function renderMaze() {
  mazeElement.innerHTML = "";

  for (let row = 0; row < mazeSize; row++) {
    for (let col = 0; col < mazeSize; col++) {
      const cell = document.createElement("div");
      const cellType = maze[row][col];

      if (cellType === 0) {
        cell.className = "cell wall";
      } else if (cellType === 1) {
        cell.className = "cell path";
      } else if (cellType === 2) {
        cell.className = "cell path player";
      } else if (cellType === 3) {
        cell.className = "cell path exit";
      }

      mazeElement.appendChild(cell);
    }
  }

  addEventListener("keydown", movePlayer);
}

// Move the player
function movePlayer(event) {
  const playerCell = document.querySelector(".player");
  let { row, col } = getCellCoordinates(playerCell);

  switch (event.key) {
    case "ArrowUp":
      if (row > 0 && maze[row - 1][col] !== 0) {
        row--;
      }
      break;
    case "ArrowDown":
      if (row < mazeSize - 1 && maze[row + 1][col] !== 0) {
        row++;
      }
      break;
    case "ArrowLeft":
      if (col > 0 && maze[row][col - 1] !== 0) {
        col--;
      }
      break;
    case "ArrowRight":
      if (col < mazeSize - 1 && maze[row][col + 1] !== 0) {
        col++;
      }
      break;
    default:
      return;
  }

  playerCell.classList.remove("player");
  const newPlayerCell = mazeElement.children[row * mazeSize + col];
  newPlayerCell.classList.add("player");

  if (row === mazeSize - 1 && col === mazeSize - 1) {
    alert("Congratulations! You reached the end of the maze!");
    generateMaze();
  }
}

// Get row and column of a cell
function getCellCoordinates(cell) {
  const index = Array.from(cell.parentNode.children).indexOf(cell);
  const row = Math.floor(index / mazeSize);
  const col = index % mazeSize;
  return { row, col };
}

generateMaze(); // Initial maze generation