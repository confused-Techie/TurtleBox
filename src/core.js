// Core Service for TutleBox, is initially responsible for starting up submodules, and other aspects.

console.log("TurtleBox Core Starting up...");

// We should likely do the initial setup of the global API first.
const config = require("./config.js");
const utils = require("./utils/main.js");
const Exterminate = require("./exterminate.js");
//const frontend = require("./frontend/server.js");
const backend = require("./backend/server.js");

(async () => {

  let dalek = new Exterminate();

  turtle = {};

  turtle.config = config;
  turtle.utils = utils;
  turtle.collector = {};
  turtle.dalek = dalek;

  global.turtle = turtle;

  turtle.utils.log.debugLog("Success?");
  // Now startup the two API Servers

  backend.startup();
  // then add the closeable instance to exterminate
  dalek.add(backend.shutdown);

  //frontend.startup();

})();

process.on("SIGTERM", async () => {
  await turtle.dalek.now("SIGTERM");
});

process.on("SIGINT", async () => {
  await turtle.dalek.now("SIGINT");
});
