const path = require("path");
const parseConfigFile = require("./parseConfig");
const defaults = require("./defaults");

/* configuration file have priority over CLI arguments */
module.exports = async function adjustConfiguration(cliInput) {
  let parsedConfig = {};
  let configurationObject = {};
  if (cliInput.configurationFile) {
    parsedConfig = await parseConfigFile(path.join(process.cwd(), cliInput.configurationFile)).catch(e => {
      throw new Error(e);
    });
  }
  configurationObject.commandToExecute = parsedConfig.exec || cliInput.commandToExecute || defaults.commandToExecute;

  configurationObject.filesToWatch =
    Array.isArray(parsedConfig.files) && parsedConfig.files.length > 0
      ? parsedConfig.files
      : Array.isArray(cliInput.filesToWatch) && cliInput.filesToWatch.length > 0
      ? cliInput.filesToWatch
      : defaults.filesToWatch;

  configurationObject.extensionsToWatch =
    Array.isArray(parsedConfig.ext) && parsedConfig.ext.length > 0
      ? parsedConfig.ext
      : Array.isArray(cliInput.extensionsToWatch) && cliInput.extensionsToWatch.length > 0
      ? cliInput.extensionsToWatch
      : defaults.extensionsToWatch;

  configurationObject.saveDebounceDelay =
    parsedConfig.saveDebounceDelay >= 0
      ? parsedConfig.saveDebounceDelay
      : cliInput.saveDebounceDelay >= 0
      ? cliInput.saveDebounceDelay
      : defaults.saveDebounceDelay;

  configurationObject.encoding = parsedConfig.encoding || cliInput.encoding || defaults.encoding;

  configurationObject.watchSubdirectories =
    typeof parsedConfig.watchSubdirectories === "boolean"
      ? parsedConfig.watchSubdirectories
      : typeof cliInput.watchSubdirectories === "boolean"
      ? cliInput.watchSubdirectories
      : defaults.watchSubdirectories;

  return configurationObject;
};
