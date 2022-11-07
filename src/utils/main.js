// Collection of all utility functions throughout the application
const { EventEmitter } = require("node:events");

let util = {};

// --- Logging Utils

util.log = {
  debugLog: (value) => {
    if (turtle.config.debug) {
      console.log(`DEBUG:: ${value}`);
    }
  },
  infoLog: (value) => {
    console.log(`INFO:: ${value}`);
  }

};

// A timing utility baked right in.

// The most important timer being the refreshTime, which is the user defined
// time to allow plugins and other functions to recheck their data or refresh api caches and such
util.timer = new EventEmitter();
// The timers themselves are setup after initial setup so they have access to the global api

util.finish = () => {
  // Since when utils is first started up the global API is not yet global, we will hold off completing some tasks until
  // it is, and core will call this function.

  const refreshTimeout = setInterval(() => {
    util.timer.emit("refresh");
  }, turtle.config.refreshTime);

  // Then we also have to make sure to add any timers to the dalek config

  const haltTimers = function() {
    console.log("Clearing Utility Timers...");
    clearInterval(refreshTimeout);
  };

  turtle.dalek.add(haltTimers);

};


module.exports = util;
