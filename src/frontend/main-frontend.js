const express = require("express");
const app = express();

app.use((req, res, next) => {
  // Setup start to track requests.
  req.start = Date.now();
  next();
});

// here we need to declare all endpoints, and allow the functionality of loading other
// template files

module.exports = app;
