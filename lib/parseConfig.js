const fs = require("fs");

module.exports = function parseConfigFile(filePath) {
  const data = fs.readFileSync(filePath);
  let configObj = {};
  try {
    configObj = JSON.parse(data);
  } catch (e) {
    throw new Error("Failed to parse JSON configuration file: ", e);
  }
  return configObj;
};
