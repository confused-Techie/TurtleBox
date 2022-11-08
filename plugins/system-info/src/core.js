const os = require("os");

function getUpTime() {
  return os.uptime(); // returns uptime in seconds
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

module.exports = {
  getUpTime,
  getHostName,
  getVersion,
  getMemoryPercentUsed,
};
