const main = require("./main-frontend.js");

let serve; // the main express instance

async function startup() {
  let port = turtle.config.frontend.port;
  serve = main.listen(port, () => {
    turtle.utils.log.infoLog(`TurtleBox Frontend Server Listening on port ${port}`);
  });
}

async function shutdown() {
  serve.close(() => {
    turtle.utils.log.infoLog(`TurtleBox Frontend Server Closed...`);
  });
  setImmediate(function(){serve.emit("close")});
  return;
}

function instance() {
  // used to retrieve the express instance
  return main;
}

module.exports = {
  startup,
  instance,
  shutdown
};
