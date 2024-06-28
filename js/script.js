const divContainer = document.querySelector(".container");
const sizeButton = document.querySelector(".size");
const styleSheet = document.createElement("style");
const reset = document.querySelector(".reset");
const slider = document.querySelector(".slider");
const sliderValue = document.querySelector(".slider-value");

function runSlider() {
  slider.classList.add("active");
}

function defineSketchSize() {
  divContainer.innerHTML = "";
  styleSheet.innerHTML = "";

  let value = slider.value;
  createSketch(+value, +value);
}

function resetSketch() {
  for (let i = 0; i < divContainer.children.length; i++) {
    divContainer.children[i].classList.remove("hovered");
  }
}

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

  styleSheet.appendChild(document.createTextNode(createColumnsEveryNElement));
}

function makeGrid(rows, columns) {
  makeRows(rows, columns);
  makeColumns(columns);
}

function makeGridElementsSize(rows) {
  let elementSize = 500 / rows;

  let style = `
  .container > div {
    width: ${elementSize}px;
    height: ${elementSize}px;
  }
  `;

  styleSheet.appendChild(document.createTextNode(style));
}

function addClassWhenHovered() {
  for (let i = 0; i < divContainer.children.length; i++) {
    divContainer.children[i].addEventListener("mouseover", (e) => {
      e.target.classList.add("hovered");
    });
  }
}

function changeHoveredColor(color) {
  let style = `
  .hovered {
    background-color: ${color} !important;
  }
  `;
  styleSheet.appendChild(document.createTextNode(style));
}

function draw(color) {
  changeHoveredColor(color);
  addClassWhenHovered();
}

function createSketch(rows, columns) {
  makeGrid(rows, columns);
  makeGridElementsSize(rows);
  draw("purple");
}

createSketch(16, 16);
document.head.appendChild(styleSheet);
sizeButton.addEventListener("click", runSlider);
reset.addEventListener("click", resetSketch);
slider.addEventListener("mousedown", () => sliderValue.classList.add("active"));
slider.oninput = () => {
  resetSketch();
  sliderValue.textContent = `${slider.value}x${slider.value}`;
};
slider.addEventListener("click", defineSketchSize);
divContainer.addEventListener("mouseover", () => {
  sliderValue.classList.remove("active");
  slider.classList.remove("active");
})
