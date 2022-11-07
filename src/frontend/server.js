const main = require("./main-frontend.js");

let serve; // the main express instance
let extCards = [];
// extCards existed to be an exported array attached to the global API.
// Which once global can be read by the frontend, in order to append it where needed.

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
