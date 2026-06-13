const container = document.getElementById("container");
const resizeBtn = document.getElementById("resizeBtn");

let gridSize = 16;

createGrid(gridSize);

resizeBtn.addEventListener("click", () => {
  let input = prompt("Enter grid size (max 100):");

  input = Number(input);

  if (input > 0 && input <= 100) {
    gridSize = input;
    createGrid(gridSize);
  } else {
    alert("Enter a number between 1 and 100");
  }
});

function createGrid(size) {
  container.innerHTML = "";

  const squareSize = 960 / size;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    square.dataset.darkness = 0;

    square.addEventListener("mouseenter", () => {
      draw(square);
    });

    container.appendChild(square);
  }
}

function draw(square) {
  if (!square.dataset.color) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    square.dataset.color = `${r},${g},${b}`;
  }

  let darkness = Number(square.dataset.darkness);
  if (darkness < 10) darkness++;

  square.dataset.darkness = darkness;

  const opacity = darkness / 10;
  square.style.background = `rgba(${square.dataset.color}, ${opacity})`;
}
