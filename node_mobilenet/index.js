const mobilenet = require("@tensorflow-models/mobilenet");
global.fetch = require("node-fetch");
const { createCanvas, loadImage } = require("canvas");

const getCanvasImage = async () => {
  const img = await loadImage("./img/cat1.jpeg");
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  return canvas;
};

const start = async () => {
  console.log("model loading...");
  const model = await mobilenet.load();
  console.log("model load end !");

  console.log("canvas loading...");
  const img = await getCanvasImage();
  console.log("canvas loadend !");

  console.log("clasify start...");
  //   model.classify(img).then(preds => {
  //     console.log(preds);
  //   });
  const preds = await model.classify(img);
  console.log(preds);
  console.log("clasify end !");

  console.log("hello mobilenet!!");
};

start();
