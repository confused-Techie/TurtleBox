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
    this.pluginList[temp_plugin.name] = {
      instance: temp_module_plugin,
      workingDir: pluginFolder,
      views: this.collectViews(pluginFolder),
      pack: temp_plugin
    };
  }

  collectViews(pluginFolder) {
    // ExistsSync needs the top level relative path, meanwhile add() was handed the local relative path.
    // So we have to change .. to .
    if (fs.existsSync(`${pluginFolder.replace("..", ".")}${path.sep}views`)) {
      const views = fs.readdirSync(`${pluginFolder.replace("..", ".")}${path.sep}views`);

      let viewArray = [];

      for (let view of views) {
        // Now check if it's a template file
        let fileExt = view.split(".").pop();

        if (fileExt == "ejs") {
          viewArray.push(view.split(".")[0]); // We just want to append the name of the plugin view.
        } else {
          // this would be the place to add other supported templates.
          continue;
        }
      }

      return viewArray;

    } else {
      return [];
    }
  }

  carry(plugin) {
    // Allows a shorthand reference for any plugin to execute functions from their application,
    // avoiding the long call structure.

    // Without this calls look like `turtle.plugin.pluginList["system-info"].instance.getHostName()`
    // With this `turtle.plugin.carry("system-info").getHostName()`

    return this.pluginList[plugin].instance;
  }

  remove(pluginName) {

  }
}

module.exports = Plugin;
