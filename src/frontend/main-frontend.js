const express = require("express");
const app = express();
const path = require("path");

app.set("views", "./src/frontend/views");
app.set("view engine", "ejs");

app.use((req, res, next) => {
  // Setup start to track requests.
  req.start = Date.now();
  next();
});

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/daisyui", express.static(path.join(__dirname, "../../node_modules/daisyui/dist")));

app.use("/tailwind", express.static(path.join(__dirname, "../../node_modules/@tailwindcss/typography")));

app.use("/bootstrap", express.static(path.join(__dirname, "../../node_modules/bootstrap/dist")));

//app.use("daisyui.css", express.static("../../node_modules/daisyui/dist/full.css"));

app.get("/", async (req, res) => {
  res.render("home", { page: { title: "HomePage" } });
});

app.get("/settings", async (req, res) => {

});

app.get("/page/:tabID", async (req, res) => {
  let tabID = req.params.tabID;

  if (tabID == "" || tabID === undefined) {
    // TODO: Better error
    res.status(500);
  }

  turtle.config.frontend.tabs.forEach((tab) => {
    if (tab.id == tabID) {
      // we have found the proper time, now time to pass the modified arrays of views.
      let modView = [];

      tab.contents.cards.forEach((card) => {
        let details = card.split(".");
        // Now we should have details[0] = plugin name ; details[1] = view name

        let pluginDetails = turtle.plugin.pluginList[details[0]];

        if (pluginDetails == undefined) {
          // Add a prebuilt view saying it doesn't exist. Passing the details we can. Otherwise lets ignore
        } else {
          if (pluginDetails.views.includes(details[1])) {
            // The view exists in this plugin
            // Now for the view to be included, we have to do some funky stuff.
            // The includes needs to be relative to the file including, which is in frontend/views so...
            modView.push(`../../${pluginDetails.workingDir}/views/${details[1]}`);
          } else {
            // again say that it doesn't exist.
          }
        }
      });
      // Once done, lets render the view, with our custom data
      res.render('page', { page: { title: tab.name }, views: modView });
    } else {
      res.status(500);
    }
  });

});

// here we need to declare all endpoints, and allow the functionality of loading other
// template files

module.exports = app;
