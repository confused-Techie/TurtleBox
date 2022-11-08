
const fs = require("fs");
const yaml = require("js-yaml");

let staticConfig, dynamicConfig, configuration;

function getStaticConfig() {
  if (!staticConfig) {
    try {
      let data = null;

      try {
        let fileContent = fs.readFileSync("./app.yaml", "utf8");
        data = yaml.load(fileContent);
      } catch(err) {
        // Failed to get static config file
        console.log(`Failed to load app.yaml static configuration: ${err}`);
        process.exit(1);
      }
      staticConfig = {
        debug: process.env.DEBUG ? process.env.DEBUG : data.DEBUG ? data.DEBUG : false,
        watch_config: process.env.WATCHCONFIG ? process.env.WATCHCONFIG : data.WATCHCONFIG ? data.WATCHCONFIG : false,
        refreshTime: process.env.REFRESHTIME ? process.env.REFRESHTIME : data.REFRESHTIME ? data.REFRESHTIME : 1500,
        localRefresh: process.env.LOCALREFRESHTIME ? process.env.LOCALREFRESHTIME : data.LOCALREFRESHTIME ? data.LOCALREFRESHTIME : 2000,
        backend_port: process.env.BACKEND_PORT ? process.env.BACKEND_PORT : data.BACKEND_PORT ? data.BACKEND_PORT :"8080",
        frontend_port: process.env.FRONTEND_PORT ? process.env.FRONTEND_PORT : data.FRONTEND_PORT ? data.FRONTEND_PORT : "8081"
      };

      return staticConfig;

    } catch(err) {
      console.log(err);
      process.exit(1);
    }
  } else {
    return staticConfig;
  }

}

function getDynamicConfig() {
  if (!dynamicConfig) {
    if (fs.existsSync("./config.json")) {
      dynamicConfig = require("../config.json");

      return dynamicConfig;
    } else {
      turtle.utils.log.errorLog("No Dynamic Configuration File Found!");
    }
  } else {
    return dynamicConfig;
  }
}

getStaticConfig();
getDynamicConfig();
concatConfig();

// These functions are inserted into timer clases in core.js

function concatConfig() {
  configuration = {};

  configuration.backend = {};
  configuration.frontend = {};
  configuration.plugins = dynamicConfig.plugins;

  configuration.debug = staticConfig.debug;
  configuration.watch_config = staticConfig.watch_config;
  configuration.refreshTime = staticConfig.refreshTime;
  configuration.localRefresh = staticConfig.localRefresh;

  if (dynamicConfig.backend) {
    configuration.backend = dynamicConfig.backend;
    configuration.backend.port = staticConfig.backend_port;
  }
  if (dynamicConfig.frontend) {
    configuration.frontend = dynamicConfig.frontend;
    configuration.frontend.port = staticConfig.frontend_port;
  }

  console.log(configuration);
  return configuration;
}

module.exports = {
  getStaticConfig,
  getDynamicConfig,
  concatConfig,
  configuration
};
