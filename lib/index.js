const Watcher = require("./watcher");
const Logger = require("./logger");
const Executor = require("./executor");

module.exports = configurationObj => {
  const watcher = new Watcher(configurationObj, Executor, Logger);
  watcher.startWatching();
};
