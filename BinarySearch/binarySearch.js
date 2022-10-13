const $ = document.querySelector.bind(document);

const canvasNode = $(".canvas");
let ctx = canvasNode.getContext("2d");

function BinarySearch(width, height, rectX, rectY, element) {
  this.width = width;
  this.height = height;
  this.rectX = rectX;
  this.rectY = rectY;
  this.element = element;
}

BinarySearch.prototype.draw = function () {
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.rect(this.rectX, this.rectY, this.rectWidth, this.rectHeight);
  ctx.textAlign = "center";
  ctx.stroke();
  ctx.fillText(
    this.element,
    this.rectX + this.width / 2,
    this.rectY + this.height / 2
  );
};

const app = (() => {
  const smallNode = $(".small");
  const largeNode = $(".large");

  let arrayCanvas = [];
  const smallArray = [];
  const largeArray = [];

  const handleEvent = () => {
    const amountInfoLargeArray = 500;
    const amountInfoSmallArray = 10;
    largeNode.addEventListener(
      "click",
      pushElementToArray.bind(null, event, {
        array: largeArray,
        amount: amountInfoLargeArray,
      })
    );
    smallNode.addEventListener(
      "click",
      pushElementToArray.bind(null, event, {
        array: smallArray,
        amount: amountInfoSmallArray,
      })
    );
  };

  const pushElementToArray = (optionNull, value, event) => {
    const { array, amount } = value;
    if (array.length === 0) {
      for (let index = 0; index < amount; index++) {
        array.push(index);
      }
    }

    convertTheArrayToImageData({ array });
  };

  const clearCanvasDraw = () => {
    ctx.clearRect(0, 0, canvasNode.width, canvasNode.height);
    return [];
  };

  const convertTheArrayToImageData = (options) => {
    const { array } = options;
    arrayCanvas = clearCanvasDraw();

    let rectHeight = 50;
    let rectWidth = 50;
    let rectX = 30;
    let rectY = 30;
    
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      arrayCanvas.push(
        new BinarySearch(rectWidth, rectHeight, rectX, rectY, element)
      );
      rectX += 50;
    }

    display(arrayCanvas);
  };

  const display = (arrayCanvas) => {
    for (const element of arrayCanvas) {
      element.draw();
    }
  };
  handleEvent();
})();
