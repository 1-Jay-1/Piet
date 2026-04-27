let rects = [];
let xLines = [];
let yLines = [];

function setup() {
  createCanvas(600, 600);
  initComposition();
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-container");
}

function draw() {
  background(255);

  animateGrid();
  rebuildRects();
  drawRects();
  drawLines();
}

function mousePressed() {
  initComposition();
}


function initComposition() {
  rects = [];

  let divisions = int(random(4, 6));

  xLines = [0, width];
  yLines = [0, height];

  for (let i = 0; i < divisions; i++) {
    xLines.push(random(width));
    yLines.push(random(height));
  }

  xLines.sort((a, b) => a - b);
  yLines.sort((a, b) => a - b);

  buildRects();
  assignColors();
}

function animateGrid() {
  for (let i = 1; i < xLines.length - 1; i++) {
    xLines[i] += sin(frameCount * 0.01 + i * 10) * 0.4;
  }

  for (let i = 1; i < yLines.length - 1; i++) {
    yLines[i] += cos(frameCount * 0.01 + i * 10) * 0.4;
  }

  constrainLines();
}

function constrainLines() {
  for (let i = 1; i < xLines.length - 1; i++) {
    xLines[i] = constrain(xLines[i], 80, width - 80);
  }

  for (let i = 1; i < yLines.length - 1; i++) {
    yLines[i] = constrain(yLines[i], 80, height - 80);
  }
}

function rebuildRects() {
  buildRects();
  assignColors();
}

function buildRects() {
  rects = [];

  for (let i = 0; i < xLines.length - 1; i++) {
    for (let j = 0; j < yLines.length - 1; j++) {
      rects.push({
        x: xLines[i],
        y: yLines[j],
        w: xLines[i + 1] - xLines[i],
        h: yLines[j + 1] - yLines[j],
        col: null
      });
    }
  }
}

function assignColors() {
  let palette = [
    color(220, 50, 50),   // red
    color(50, 90, 220),   // blue
    color(240, 200, 50)   // yellow
  ];

  for (let r of rects) r.col = null;

  rects.sort((a, b) => (b.w * b.h) - (a.w * a.h));

  for (let i = 0; i < 3; i++) {
    rects[i].col = palette[i];
  }
}

function drawRects() {
  noStroke();

  for (let r of rects) {
    fill(r.col ? r.col : 255);
    rect(r.x, r.y, r.w, r.h);
  }
}

function drawLines() {
  stroke(0);
  strokeWeight(8);

  for (let x of xLines) line(x, 0, x, height);
  for (let y of yLines) line(0, y, width, y);
  //we need this window resized function to make sure the canvas resizes properly when the window size changes, ensuring the background remains full-screen and responsive
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
}
