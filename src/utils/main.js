// Collection of all utility functions throughout the application

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

module.exports = util;
