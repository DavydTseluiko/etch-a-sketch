const divContainer = document.querySelector(".container");

function makeRows(rows, columns) {
  let amountOfPixels = rows * columns + Math.round((rows + columns) / 2);

  for (let i = 0; i < amountOfPixels; i++) {
    const div = document.createElement("div");
    divContainer.appendChild(div);
  }
}

function makeColumns(columns) {
  let createColumnsEveryNElement = `
  .container > div:nth-child(${columns + 1}n) {
    width: 100%;
    height: auto;
  }
  `;

  let styleSheet = document.createElement("style");
  styleSheet.textContent = createColumnsEveryNElement;
  document.head.appendChild(styleSheet);
}

function makeGrid(rows, columns) {
  makeRows(rows, columns);
  makeColumns(columns);
}

makeGrid(16, 16);
