const mobilenet = require("@tensorflow-models/mobilenet");
global.fetch = require("node-fetch");
const { createCanvas, Image } = require("canvas");

start = async () => {
  console.log(mobilenet);

  const canvas = createCanvas(100, 100);
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
  };
  img.src = "./img/cat1.jpeg";

  console.log("model loading...");
  const model = await mobilenet.load();
  console.log("model load end !");

  model.classify(img).then(preds => {
    console.log(preds);
  });

  console.log("hello mobilenet!!");
};

start();
