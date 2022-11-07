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

//app.use("daisyui.css", express.static("../../node_modules/daisyui/dist/full.css"));

app.get("/", async (req, res) => {
  res.render("home", { page: { title: "HomePage" } });
});

app.get("/css/daisyui.css", (req, res) => {
  let rootPath = path.join(__dirname, "../../node_modules/daisyui/dist/full.css");
  res.sendFile(rootPath);
});

// here we need to declare all endpoints, and allow the functionality of loading other
// template files

module.exports = app;
