const express = require("express");
const app = express();

app.use((req, res, next) => {
  // ssetup start to track requests.
  req.start = Date.now();
  next();
});

// Here we would intend to only declare system endpoints.

// And then afterwards we can go through and find plugin endpoints adding them here

module.exports = app;
