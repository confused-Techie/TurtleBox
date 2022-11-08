const os = require("os");

function getUpTime() {
  //return os.uptime(); // returns uptime in seconds
  let seconds = os.uptime();

  let days = Math.floor(seconds / 86400);
  seconds %= 86400;
  let hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  let minutes = Math.floor(seconds / 60);
  let partialSeconds = seconds % 60;

  days = String(days).padStart(2, "0");
  hours = String(hours).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");
  partialSeconds = String(partialSeconds).padStart(2, "0");

  return `${days}:${hours}:${minutes}:${partialSeconds}`;
}

function getHostName() {
  return os.hostname();
}

function getVersion() {
  return os.version();
}

function getMemoryPercentUsed() {
  let free = os.freemem();
  let total = os.totalmem();
  // Both measured in Bytes.

  let percentUsed = Math.ceil(100 - ( (free * 100) / total));
  return percentUsed;
}

// Now lets do some setup to add a path in the backend.

setupBackend(turtle.web.backend.instance());

function setupBackend(app) {
  app.get("/systeminfo", async (req, res) => {
    res.json({ message: "Hello world" });
  });
}

module.exports = {
  getUpTime,
  getHostName,
  getVersion,
  getMemoryPercentUsed,
};
