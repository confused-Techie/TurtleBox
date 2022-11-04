const path = require("path");
const fs = require("fs");

class Plugin {
  constructor() {
    this.pluginList = {};

  }

  load() {
    try {
      const files = fs.readdirSync("./plugins");

      for await (const file of files) {
        if (fs.lstatSync(`./plugins${path.sep}${file}`).isDirectory()) {
          // this will skip over regular files in this directory,
          // like a readme or such

          if (fs.existsSync(`./plugins${path.sep}${file}${path.sep}package.json`)) {
            // If it has a valid package.json it's likely a valid plugin, so lets pass it
            this.add(`./plugins${path.sep}${file}`);
          }
        }
      }
    } catch(err) {
      console.log(err);
    }
  }

  add(pluginFolder) {
    let temp_plugin = require(`../plugins${path.sep}${file}${path.sep}package.json`);

    // Now to add it to the pluginList
    this.pluginList[temp_plugin.name] =
  }

  remove(pluginName) {

  }
}

module.exports = Plugin;
