const path = require("path");
const parseConfigFile = require("./parseConfig");
/* configuration file have priority over CLI arguments */
module.exports = function adjustConfiguration(exec, filesToWatch, debounce, encoding, watchSubdirectories, configFile) {
  let configurationObject = { exec, filesToWatch, debounce, encoding, watchSubdirectories, configFile };
  let parsedConfig = {};
  if (configFile) {
    parsedConfig = parseConfigFile(path.join(process.cwd(), configFile));
    configurationObject.exec = parsedConfig.exec || exec;
    configurationObject.filesToWatch = parsedConfig.files || filesToWatch;
    configurationObject.debounce = parsedConfig.debounce || debounce;
    configurationObject.encoding = parsedConfig.encoding || encoding;
    configurationObject.watchSubdirectories = parsedConfig.watchSubdirectories || watchSubdirectories;
  }

  return configurationObject;
};
