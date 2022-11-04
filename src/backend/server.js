const main = require("./main-backend.js");

let serve; // the main express instance

async function startup() {
  let port = turtle.config.backend.port;
  serve = main.listen(port, () => {
    turtle.utils.log.infoLog(`TurtleBox Backend Server Listening on port ${port}`);
  });
}

async function shutdown() {
  serve.close(() => {
    turtle.utils.log.infoLog(`TurtleBox Backend Server Closed...`);
  });
  setImmediate(function(){serve.emit("close")});
  return;
}

function instance() {
  // used to retreive the express instance, to allow extension later on,
  // if needed
  return main;
}

module.exports = {
  startup,
  instance,
  shutdown
};
