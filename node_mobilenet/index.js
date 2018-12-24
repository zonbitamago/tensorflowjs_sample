const mobilenet = require("@tensorflow-models/mobilenet");
global.fetch = require("node-fetch");

start = async () => {
  console.log(mobilenet);

  const model = await mobilenet.load();

  console.log("hello mobilenet!!");
};

start();
