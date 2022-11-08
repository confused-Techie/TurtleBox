
const debug = true;
const backend = {
  port: "8080"
};
const frontend = {
  port: "8081",
  tabs: [
    {
      "name": "Andy's Panel",
      "id": 1,
      "contents": {
        "cards": [
          "system-info.default"
        ]
      }
    },
    {
      "name": "Angie Stuff",
      "id": 2,
      "contents": {
        "customPage": ""
      }
    }
  ]
};
const refreshTime = 1500;

module.exports = {
  debug,
  backend,
  frontend,
  refreshTime,
};
