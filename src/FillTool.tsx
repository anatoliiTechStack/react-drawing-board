export const onFillShape = (startX: number, startY: number, canvas: HTMLCanvasElement) => {
//   let onScreenCVS = document.getElementById("onScreen");
// let onScreenCTX = onScreenCVS.getContext("2d");
// //improve sharpness
// let ocWidth = onScreenCVS.width;
// let ocHeight = onScreenCVS.height;
// let sharpness = 4;
// onScreenCVS.width = ocWidth * sharpness;
// onScreenCVS.height = ocHeight * sharpness;
// onScreenCTX.scale(sharpness, sharpness);

//Create an offscreen canvas. This is where we will actually be drawing, in order to keep the image consistent and free of distortions.
let offScreenCVS = canvas;
let offScreenCTX = offScreenCVS.getContext("2d");
//Set the dimensions of the drawing canvas
// offScreenCVS.width = 32;
// offScreenCVS.height = 32;

//For undo ability, store starting coords, and pass them into actionFill
function actionFill(startX, startY, currentColor) {
  //get imageData
  let colorLayer = offScreenCTX.getImageData(
    0,
    0,
    offScreenCVS.width,
    offScreenCVS.height
  );

  let startPos = (startY * offScreenCVS.width + startX) * 4;

  //clicked color
  let startR = colorLayer.data[startPos];
  let startG = colorLayer.data[startPos + 1];
  let startB = colorLayer.data[startPos + 2];
  //exit if color is the same
  if (
    currentColor.r === startR &&
    currentColor.g === startG &&
    currentColor.b === startB
  ) {
    return;
  }
  //Start with click coords
  let pixelStack = [[startX, startY]];
  let newPos, x, y, pixelPos, reachLeft, reachRight;
  floodFill();
  let maxDOTS = 2000;
  function floodFill() {
    newPos = pixelStack.pop();
    maxDOTS -= 1;
    if (maxDOTS < 0) {
      return;
    }
    x = newPos[0];
    y = newPos[1];

    //get current pixel position
    pixelPos = (y * offScreenCVS.width + x) * 4;
    // Go up as long as the color matches and are inside the canvas
    while (y >= 0 && matchStartColor(pixelPos)) {
      y--;
      pixelPos -= offScreenCVS.width * 4;
    }
    //Don't overextend
    pixelPos += offScreenCVS.width * 4;
    y++;
    reachLeft = false;
    reachRight = false;
    // Go down as long as the color matches and in inside the canvas
    while (y < offScreenCVS.height && matchStartColor(pixelPos)) {
      colorPixel(pixelPos);

      if (x > 0) {
        if (matchStartColor(pixelPos - 4)) {
          if (!reachLeft) {
            //Add pixel to stack
            pixelStack.push([x - 1, y]);
            reachLeft = true;
          }
        } else if (reachLeft) {
          reachLeft = false;
        }
      }

      if (x < offScreenCVS.width - 1) {
        if (matchStartColor(pixelPos + 4)) {
          if (!reachRight) {
            //Add pixel to stack
            pixelStack.push([x + 1, y]);
            reachRight = true;
          }
        } else if (reachRight) {
          reachRight = false;
        }
      }
      y++;
      pixelPos += offScreenCVS.width * 4;
    }

    // offScreenCTX.putImageData(colorLayer, 0, 0);
    // source = offScreenCVS.toDataURL();
    // renderImage();

    if (pixelStack.length) {
      floodFill();
      // window.setTimeout(floodFill, 100);
    }
  }

  //render floodFill result
  offScreenCTX.putImageData(colorLayer, 0, 0);

  //helpers
  function matchStartColor(pixelPos) {
    let r = colorLayer.data[pixelPos];
    let g = colorLayer.data[pixelPos + 1];
    let b = colorLayer.data[pixelPos + 2];
    return r === startR && g === startG && b === startB;
  }

  function colorPixel(pixelPos) {
    colorLayer.data[pixelPos] = currentColor.r;
    colorLayer.data[pixelPos + 1] = currentColor.g;
    colorLayer.data[pixelPos + 2] = currentColor.b;
    colorLayer.data[pixelPos + 3] = 255;
  }
};
actionFill(startX, startY, {r: 30, g: 20, b: 32});
};


