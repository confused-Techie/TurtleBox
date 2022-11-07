const path = require("path");
const fs = require("fs");

class Plugin {
  constructor() {
    this.pluginList = {};

  }

  load() {
    try {
      const files = fs.readdirSync("./plugins");

      for (let file of files) {
        if (fs.lstatSync(`./plugins${path.sep}${file}`).isDirectory()) {
          // this will skip over regular files in this directory,
          // like a readme or such

          if (fs.existsSync(`./plugins${path.sep}${file}${path.sep}package.json`)) {
            // If it has a valid package.json it's likely a valid plugin, so lets pass it

            // Passing the back-dir here due to how modules are required
            this.add(`../plugins${path.sep}${file}`);
          }
        }
      }
    } catch(err) {
      console.log(err);
    }
  }

  add(pluginFolder) {
    let temp_plugin = require(`${pluginFolder}${path.sep}package.json`);
    let temp_module_plugin = require(pluginFolder);
    // Now to add it to the pluginList
    this.pluginList[temp_plugin.name] = temp_module_plugin;
  }

  remove(pluginName) {
    
  }
}

module.exports = Plugin;
