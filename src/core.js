// Core Service for TutleBox, is initially responsible for starting up submodules, and other aspects.

console.log("TurtleBox Core Starting up...");

// We should likely do the initial setup of the global API first.
const config = require("./config.js");
const utils = require("./utils/main.js");
const Exterminate = require("./exterminate.js");
const Plugin = require("./plugin.js");
const frontend = require("./frontend/server.js");
const backend = require("./backend/server.js");

(async () => {

  let dalek = new Exterminate();
  let plugin = new Plugin();

  turtle = {};

  turtle.config = config;
  turtle.utils = utils;
  turtle.dalek = dalek;
  turtle.plugin = Plugin;
  turtle.web = {
    frontend: frontend,
    backend: backend
  };

  global.turtle = turtle;

  turtle.utils.log.debugLog("Global API Attached to Context...");
  // Now startup the two API Servers

  turtle.web.backend.startup();
  // then add the closeable instance to exterminate
  turtle.dalek.add(turtle.web.backend.shutdown);

  turtle.web.frontend.startup();
  turtle.dalek.add(turtle.web.frontend.shutdown);

  await plugin.load();

  // Finish setting up utilities
  turtle.utils.finish();

})();

process.on("SIGTERM", async () => {
  await turtle.dalek.now("SIGTERM");
});

process.on("SIGINT", async () => {
  await turtle.dalek.now("SIGINT");
});
