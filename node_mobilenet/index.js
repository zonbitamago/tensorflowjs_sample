const mobilenet = require("@tensorflow-models/mobilenet");
global.fetch = require("node-fetch");
const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const readline = require("readline");

const getCanvasImage = async url => {
  // const img = await loadImage("./img/cat1.jpeg");
  const img = await loadImage(url);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  return canvas;
};

const start = async () => {
  console.log("model loading...");
  const model = await mobilenet.load();
  console.log("model load end !");

  const stream = fs.createReadStream("./imageURL.txt", "utf8");
  const reader = readline.createInterface({ input: stream });
  reader.on("line", async data => {
    console.log("canvas loading...");
    const img = await getCanvasImage(data);
    console.log("canvas loadend !");

    console.log("clasify start...");
    const preds = await model.classify(img);
    console.log(data);
    console.log(preds);
    console.log("clasify end !");
  });
};

start();
